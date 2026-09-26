"use client";

import Link from "next/link";
import Image from "next/image";
import { FaCheck, FaClock, FaFire, FaStar, FaTimes } from "react-icons/fa";
import { Workout } from "@/lib/types";
import { usePlan, PlanItem } from "@/context/PlanContext";

interface Props {
  workout: Workout | PlanItem;
  variant: "plan" | "saved";
}

export default function PlanItemCard({ workout, variant }: Props) {
  const { removeFromPlan, removeFromSaved, markDone } = usePlan();
  const done = variant === "plan" && (workout as PlanItem).done;

  return (
    <div className={`flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center ${done ? "border-accent/50 bg-accent/5" : "border-white/10 bg-[#141414]"}`}>
      <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-xl bg-[#1c1c1c] sm:w-24">
        <Image src={workout.image} alt={workout.name} fill className="object-cover" unoptimized />
      </div>

      <div className="flex-1">
        <h3 className={`font-display text-lg font-bold uppercase ${done ? "text-white/50 line-through" : "text-white"}`}>
          {workout.name}
        </h3>
        <p className="text-sm text-white/50">{workout.equipment}</p>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-white/70">
          <span className="flex items-center gap-1"><FaClock className="text-accent" /> {workout.duration} min</span>
          <span className="flex items-center gap-1"><FaFire className="text-accent" /> {workout.calories} kcal</span>
          <span className="flex items-center gap-1"><FaStar className="text-accent" /> {workout.rating}</span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Link href={`/workout/${workout.id}`} className="rounded-lg border border-white/20 px-3 py-2 text-xs font-bold uppercase tracking-wide text-white hover:border-accent hover:text-accent">
          View Details
        </Link>

        {variant === "plan" && (
          <button onClick={() => markDone(workout.id)} aria-label="Mark as done" className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm ${done ? "border-accent bg-accent text-black" : "border-white/20 text-white hover:border-accent hover:text-accent"}`}>
            <FaCheck />
          </button>
        )}

        <button onClick={() => (variant === "plan" ? removeFromPlan(workout.id) : removeFromSaved(workout.id))} aria-label="Remove" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 text-sm text-white hover:border-red-400 hover:text-red-400">
          <FaTimes />
        </button>
      </div>
    </div>
  );
}