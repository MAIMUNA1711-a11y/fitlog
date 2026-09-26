import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b0b0b]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-5 py-6 text-sm text-white/60 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={22} height={22} />
          <span className="font-display font-bold tracking-wide text-white">
            FITLOG
          </span>
        </div>
        <p className="text-center">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}