import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/15 py-16 text-center">
      <h3 className="font-display text-xl font-bold uppercase text-white">Nothing Here Yet</h3>
      <p className="max-w-sm text-sm text-white/50">Browse the library and add a lift to get today moving.</p>
      <Link href="/" className="mt-2 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:opacity-90">
        Go To Workouts
      </Link>
    </div>
  );
}