import type { ResumeMeta } from "@/lib/resume";

export default function Header({ meta }: { meta: ResumeMeta }) {
  return (
    <header className="pt-12 pb-8 lg:pt-0">
      <h1 className="text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-5xl">
        {meta.name}
      </h1>
      <p className="mt-4 text-lg font-medium">{meta.title}</p>
      <p className="mt-1 text-muted">{meta.tagline}</p>
      <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted">
        {meta.location}
      </p>
    </header>
  );
}
