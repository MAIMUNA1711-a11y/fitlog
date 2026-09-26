export interface Workout {
  id: string | number;
  name: string;
  category: string[];
  equipment: string;
  image: string;
  duration: number; // minutes
  calories: number;
  rating: number;
  difficulty: string;
  sets: number;
  reps: string;
  description: string;
  instructions: string[];
}

export type SortKey = "duration" | "calories" | "rating";