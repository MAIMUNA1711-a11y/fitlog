import { Workout } from "./types";
import { FALLBACK_WORKOUTS } from "./fallback-data";

const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

// The live API's field names may vary, so we normalize whatever comes back.
function normalize(raw: any, index: number): Workout {
  const category =
    raw.category ?? raw.categories ?? raw.tags ?? raw.muscle ?? raw.muscleGroups ?? [];

  return {
    id: raw.id ?? raw._id ?? index + 1,
    name: raw.name ?? raw.title ?? "UNTITLED WORKOUT",
    category: Array.isArray(category) ? category : [category].filter(Boolean),
    equipment: raw.equipment ?? raw.gear ?? "Bodyweight",
    image: raw.image ?? raw.img ?? raw.thumbnail ?? raw.photo ?? "/banner.png",
    duration: Number(raw.duration ?? raw.time ?? raw.durationMinutes ?? 20),
    calories: Number(raw.calories ?? raw.caloriesBurned ?? raw.kcal ?? 150),
    rating: Number(raw.rating ?? raw.rate ?? 4.5),
    difficulty: raw.difficulty ?? raw.level ?? "Beginner",
    sets: Number(raw.sets ?? 3),
    reps: String(raw.reps ?? "10"),
    description: raw.description ?? raw.desc ?? raw.subtitle ?? "",
    instructions: raw.instructions ?? raw.steps ?? raw.howTo ?? [],
  };
}

export async function getWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch(API_BASE, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Request failed with ${res.status}`);
    const data = await res.json();
    const list = Array.isArray(data) ? data : data.data ?? data.workouts ?? [];
    if (!Array.isArray(list) || list.length === 0) throw new Error("Empty response");
    return list.map(normalize);
  } catch (err) {
    console.error("FitLog API failed, using fallback data:", err);
    return FALLBACK_WORKOUTS;
  }
}

export async function getWorkoutById(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(`${API_BASE}/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Request failed with ${res.status}`);
    const data = await res.json();
    const raw = data.data ?? data.workout ?? data;
    if (!raw || (!raw.name && !raw.title)) throw new Error("Empty response");
    return normalize(raw, 0);
  } catch (err) {
    console.error("FitLog API (single) failed, using fallback data:", err);
    const all = await getWorkouts();
    return all.find((w) => String(w.id) === String(id)) ?? null;
  }
}