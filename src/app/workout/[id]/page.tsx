import Image from "next/image";
import { notFound } from "next/navigation";
import { getWorkoutById } from "@/lib/api";
import WorkoutActions from "@/components/WorkoutActions";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function WorkoutDetailPage({ params }: Props) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) notFound();

  const specs: [string, string | number][] = [
    ["EQUIPMENT", workout.equipment],
    ["DIFFICULTY", workout.difficulty],
    ["SETS", workout.sets],
    ["REPS", workout.reps],
    ["DURATION", `${workout.duration} min`],
    ["CALORIES", `${workout.calories} kcal`],
    ["RATING", workout.rating],
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-[#141414] p-6">
          <Image
            src={workout.image}
            alt={workout.name}
            width={334}
            height={334}
            className="w-full max-w-sm object-contain"
            unoptimized
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
              {workout.name}
            </h1>
            <p className="mt-3 text-white/60">{workout.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {workout.category.map((cat) => (
              <span key={cat} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white/80">
                {cat}
              </span>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            {specs.map(([label, value], i) => (
              <div key={label} className={`flex items-center justify-between px-5 py-3 text-sm ${i % 2 === 0 ? "bg-[#141414]" : "bg-[#101010]"}`}>
                <span className="font-semibold uppercase tracking-wide text-white/50">{label}</span>
                <span className="font-bold text-white">{value}</span>
              </div>
            ))}
          </div>

          <div>
            <h2 className="mb-3 font-display text-xl font-bold uppercase text-white">Instructions</h2>
            <ol className="space-y-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/70">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <WorkoutActions workout={workout} />
        </div>
      </div>
    </div>
  );
}