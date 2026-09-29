import type { ResumeSection as ResumeSectionData } from "@/lib/resume";

function SectionShell({
  id,
  icon,
  title,
  summary,
  children,
}: {
  id: string;
  icon: string;
  title: string;
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8"
    >
      <header className="mb-4 flex items-start gap-3">
        <span aria-hidden="true" className="text-2xl leading-none">
          {icon}
        </span>
        <div>
          <h2 id={`${id}-heading`} className="text-xl font-semibold">
            {title}
          </h2>
          <p className="text-sm text-[var(--muted-foreground)]">{summary}</p>
        </div>
      </header>
      {children}
    </section>
  );
}

export default function ResumeSection({ section }: { section: ResumeSectionData }) {
  switch (section.kind) {
    case "about":
      return (
        <SectionShell
          id={section.id}
          icon={section.icon}
          title={section.title}
          summary={section.summary}
        >
          <div className="space-y-3 text-sm leading-relaxed sm:text-base">
            {section.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </SectionShell>
      );

    case "experience":
      return (
        <SectionShell
          id={section.id}
          icon={section.icon}
          title={section.title}
          summary={section.summary}
        >
          <ul className="space-y-6">
            {section.items.map((item, i) => (
              <li key={i}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <h3 className="font-medium">
                    {item.role} <span className="text-[var(--muted-foreground)]">· {item.org}</span>
                  </h3>
                  <span className="text-xs text-[var(--muted-foreground)]">{item.period}</span>
                </div>
                <p className="text-xs text-[var(--muted-foreground)]">{item.location}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                  {item.highlights.map((highlight, j) => (
                    <li key={j}>{highlight}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </SectionShell>
      );

    case "projects":
      return (
        <SectionShell
          id={section.id}
          icon={section.icon}
          title={section.title}
          summary={section.summary}
        >
          <ul className="grid gap-4 sm:grid-cols-2">
            {section.items.map((item, i) => (
              <li
                key={i}
                className="rounded-md border border-[var(--border)] p-4"
              >
                <h3 className="font-medium">
                  {item.link ? (
                    <a href={item.link} className="underline underline-offset-2">
                      {item.name}
                    </a>
                  ) : (
                    item.name
                  )}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  {item.description}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {item.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded border border-[var(--border)] px-1.5 py-0.5 text-xs text-[var(--muted-foreground)]"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </SectionShell>
      );

    case "skills":
      return (
        <SectionShell
          id={section.id}
          icon={section.icon}
          title={section.title}
          summary={section.summary}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {section.items.map((group) => (
              <div key={group.category}>
                <h3 className="text-sm font-medium text-[var(--muted-foreground)]">
                  {group.category}
                </h3>
                <ul className="mt-1.5 flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded border border-[var(--border)] px-1.5 py-0.5 text-xs"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SectionShell>
      );

    case "contact":
      return (
        <SectionShell
          id={section.id}
          icon={section.icon}
          title={section.title}
          summary={section.summary}
        >
          <div className="space-y-3 text-sm leading-relaxed sm:text-base">
            {section.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-4 flex flex-col gap-1.5 text-sm sm:flex-row sm:flex-wrap sm:gap-4">
            {section.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="underline underline-offset-2"
                >
                  {link.label}: {link.value}
                </a>
              </li>
            ))}
          </ul>
        </SectionShell>
      );
  }
}
