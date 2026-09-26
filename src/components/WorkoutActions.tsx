"use client";

import { FaBookmark, FaPlus } from "react-icons/fa";
import { Workout } from "@/lib/types";
import { usePlan } from "@/context/PlanContext";

export default function WorkoutActions({ workout }: { workout: Workout }) {
  const { addToPlan, addToSaved } = usePlan();

  return (
    <div className="flex flex-wrap gap-4">
      <button onClick={() => addToPlan(workout)} className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:opacity-90">
        <FaPlus /> Add to Today&apos;s Plan
      </button>
      <button onClick={() => addToSaved(workout)} className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:border-accent hover:text-accent">
        <FaBookmark /> Save For Later
      </button>
    </div>
  );
}