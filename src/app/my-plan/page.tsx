"use client";

import { useMemo, useState } from "react";
import MetricCard from "@/components/MetricCard";
import PlanItemCard from "@/components/PlanItemCard";
import EmptyState from "@/components/EmptyState";
import SortDropdown from "@/components/SortDropdown";
import { usePlan } from "@/context/PlanContext";
import { SortKey } from "@/lib/types";

type Tab = "plan" | "saved";

export default function MyPlanPage() {
  const { plan, saved, isReady } = usePlan();
  const [tab, setTab] = useState<Tab>("plan");
  const [sortKey, setSortKey] = useState<SortKey>("duration");

  const totalMinutes = plan.reduce((sum, item) => sum + item.duration, 0);
  const totalCalories = plan.reduce((sum, item) => sum + item.calories, 0);

  const activeList = tab === "plan" ? plan : saved;

  const sortedList = useMemo(() => {
    const copy = [...activeList];
    if (sortKey === "duration") copy.sort((a, b) => a.duration - b.duration);
    if (sortKey === "calories") copy.sort((a, b) => b.calories - a.calories);
    if (sortKey === "rating") copy.sort((a, b) => b.rating - a.rating);
    return copy;
  }, [activeList, sortKey]);

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">My Plan</h1>
      <p className="mt-2 text-white/60">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <MetricCard label="Exercises" value={plan.length} />
        <MetricCard label="Minutes" value={totalMinutes} />
        <MetricCard label="Calories" value={totalCalories} />
      </div>

      <div className="mt-10 flex flex-col gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between sm:border-b-0">
        <div className="flex gap-2 border-b border-white/10 sm:border-b-0">
          <button onClick={() => setTab("plan")} className={`px-4 py-3 text-sm font-bold uppercase tracking-wide ${tab === "plan" ? "border-b-2 border-accent text-accent" : "text-white/50 hover:text-white"}`}>
            Today&apos;s Plan
          </button>
          <button onClick={() => setTab("saved")} className={`px-4 py-3 text-sm font-bold uppercase tracking-wide ${tab === "saved" ? "border-b-2 border-accent text-accent" : "text-white/50 hover:text-white"}`}>
            Saved
          </button>
        </div>

        <SortDropdown value={sortKey} onChange={setSortKey} />
      </div>

      <div className="mt-6 space-y-4">
        {!isReady ? (
          <p className="py-16 text-center text-sm font-semibold uppercase tracking-wide text-white/50">Loading workouts…</p>
        ) : sortedList.length === 0 ? (
          <EmptyState />
        ) : (
          sortedList.map((item) => <PlanItemCard key={item.id} workout={item} variant={tab} />)
        )}
      </div>
    </div>
  );
}