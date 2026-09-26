import Link from "next/link";
import Image from "next/image";
import { FaClock, FaFire, FaStar } from "react-icons/fa";
import { Workout } from "@/lib/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141414] transition hover:border-accent/60"
    >
      <div className="relative h-40 w-full bg-[#1c1c1c]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          unoptimized
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-2">
          {workout.category.map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white/80"
            >
              {cat}
            </span>
          ))}
        </div>

        <h3 className="font-display text-lg font-bold uppercase leading-tight text-white">
          {workout.name}
        </h3>
        <p className="text-sm text-white/50">{workout.equipment}</p>

        <div className="mt-auto flex items-center gap-4 pt-2 text-xs font-semibold text-white/70">
          <span className="flex items-center gap-1">
            <FaClock className="text-accent" /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <FaFire className="text-accent" /> {workout.calories} kcal
          </span>
          <span className="flex items-center gap-1">
            <FaStar className="text-accent" /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}