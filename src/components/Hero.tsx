import Image from "next/image";
import { FaArrowDown } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-10 px-5 py-16 md:flex-row md:py-24">
      <div className="w-full space-y-6 md:w-1/2">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
          Workout Library
        </p>
        <h1 className="font-display text-4xl font-bold uppercase leading-tight text-white sm:text-5xl">
          Train With Intent.
          <br />
          Log Every Set.
        </h1>
        <p className="max-w-md text-white/60">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <a href="#library" className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:opacity-90">
          Browse Workouts <FaArrowDown />
        </a>
      </div>

      <div className="flex w-full justify-center md:w-1/2">
        <Image
          src="/banner.png"
          alt="Muscle anatomy illustration on a gym machine"
          width={334}
          height={334}
          priority
          className="w-64 max-w-full sm:w-80"
        />
      </div>
    </section>
  );
}