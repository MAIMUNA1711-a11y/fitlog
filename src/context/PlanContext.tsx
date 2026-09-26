"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { toast } from "react-toastify";
import { Workout } from "@/lib/types";

export interface PlanItem extends Workout {
  done: boolean;
}

interface PlanContextValue {
  plan: PlanItem[];
  saved: Workout[];
  planCount: number;
  savedCount: number;
  isReady: boolean;
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: string | number) => void;
  removeFromSaved: (id: string | number) => void;
  markDone: (id: string | number) => void;
  isInPlan: (id: string | number) => boolean;
  isInSaved: (id: string | number) => boolean;
}

const PLAN_CAP = 5;
const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(PLAN_KEY);
      const storedSaved = localStorage.getItem(SAVED_KEY);
      if (storedPlan) setPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
    } catch {
      // ignore malformed storage
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady) return;
    localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, isReady]);

  useEffect(() => {
    if (!isReady) return;
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, isReady]);

  const isInPlan = (id: string | number) =>
    plan.some((item) => String(item.id) === String(id));

  const isInSaved = (id: string | number) =>
    saved.some((item) => String(item.id) === String(id));

  const addToPlan = (workout: Workout) => {
    if (isInPlan(workout.id)) {
      toast.info(`${workout.name} is already in today's plan`);
      return;
    }
    if (plan.length >= PLAN_CAP) {
      toast.error("Today's plan is full (5 lifts max)");
      return;
    }
    setPlan((prev) => [...prev, { ...workout, done: false }]);
    toast.success("Added to today's plan");
  };

  const addToSaved = (workout: Workout) => {
    if (isInSaved(workout.id)) {
      toast.info(`${workout.name} is already saved`);
      return;
    }
    setSaved((prev) => [...prev, workout]);
    toast.success("Saved for later");
  };

  const removeFromPlan = (id: string | number) => {
    setPlan((prev) => prev.filter((item) => String(item.id) !== String(id)));
    toast.info("Removed from today's plan");
  };

  const removeFromSaved = (id: string | number) => {
    setSaved((prev) => prev.filter((item) => String(item.id) !== String(id)));
    toast.info("Removed from saved");
  };

  const markDone = (id: string | number) => {
    setPlan((prev) =>
      prev.map((item) =>
        String(item.id) === String(id) ? { ...item, done: !item.done } : item,
      ),
    );
    toast.success("Marked as done");
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        planCount: plan.length,
        savedCount: saved.length,
        isReady,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markDone,
        isInPlan,
        isInSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
}