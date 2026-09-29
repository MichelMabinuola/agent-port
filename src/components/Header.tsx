import type { ResumeMeta } from "@/lib/resume";

export default function Header({ meta }: { meta: ResumeMeta }) {
  return (
    <header className="mb-8 border-b border-[var(--border)] pb-6">
      <h1 className="text-2xl font-semibold sm:text-3xl">{meta.name}</h1>
      <p className="text-[var(--muted-foreground)]">{meta.title}</p>
      <p className="mt-1 text-sm text-[var(--muted-foreground)]">
        {meta.location} · {meta.tagline}
      </p>
    </header>
  );
}
