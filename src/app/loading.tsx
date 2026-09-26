export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-white/70">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/15 border-t-accent" />
      <p className="text-sm font-semibold uppercase tracking-wide">
        Loading workouts…
      </p>
    </div>
  );
}