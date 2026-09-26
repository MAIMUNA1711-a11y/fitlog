export default function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-white/10 bg-[#141414] py-6">
      <span className="font-display text-3xl font-bold text-accent">{value}</span>
      <span className="text-xs font-semibold uppercase tracking-wide text-white/50">{label}</span>
    </div>
  );
}