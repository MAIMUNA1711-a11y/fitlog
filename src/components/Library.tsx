"use client";

import { useMemo, useState } from "react";
import { Workout, SortKey } from "@/lib/types";
import SortDropdown from "./SortDropdown";
import WorkoutCard from "./WorkoutCard";

export default function Library({ workouts }: { workouts: Workout[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("duration");

  const sorted = useMemo(() => {
    const copy = [...workouts];
    if (sortKey === "duration") copy.sort((a, b) => a.duration - b.duration);
    if (sortKey === "calories") copy.sort((a, b) => b.calories - a.calories);
    if (sortKey === "rating") copy.sort((a, b) => b.rating - a.rating);
    return copy;
  }, [workouts, sortKey]);

  return (
    <section id="library" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
            The Library
          </h2>
          <p className="mt-2 text-white/60">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
        <SortDropdown value={sortKey} onChange={setSortKey} />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
}