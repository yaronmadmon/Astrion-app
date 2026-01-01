import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col justify-center px-6 py-16">
      <div className="text-sm font-semibold tracking-widest text-slate-500">
        ASTRION
      </div>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-50">
        Voice-to-Software Factory
      </h1>
      <p className="mt-4 text-base text-slate-300">
        Speak an idea. Astrion turns it into a config-driven Micro‑SaaS preview using strict, deterministic “bricks”.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <Link
          href="/builder"
          className="inline-flex items-center justify-center rounded-xl bg-sky-400 px-5 py-2.5 text-sm font-semibold text-slate-950"
        >
          Open Builder
        </Link>
        <Link
          href="/apps"
          className="inline-flex items-center justify-center rounded-xl border border-slate-800 bg-slate-950/40 px-5 py-2.5 text-sm font-semibold text-slate-100"
        >
          View Apps API
        </Link>
      </div>
    </main>
  );
}
