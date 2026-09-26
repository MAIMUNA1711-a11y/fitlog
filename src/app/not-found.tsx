import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-4 px-5 text-center">
      <p className="font-display text-6xl font-bold text-accent">404</p>
      <h1 className="font-display text-2xl font-bold uppercase text-white">Page Not Found</h1>
      <p className="text-white/60">The page you&apos;re looking for doesn&apos;t exist or was moved.</p>
      <Link href="/" className="mt-2 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:opacity-90">
        Back To Home
      </Link>
    </div>
  );
}