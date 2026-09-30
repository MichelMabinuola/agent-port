import { pageAddress, type ResumeSection as ResumeSectionData } from "@/lib/resume";

function SectionShell({
  id,
  index,
  title,
  summary,
  children,
}: {
  id: string;
  index: number;
  title: string;
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-16 border-t border-line py-14 first:border-t-0 first:pt-4 lg:scroll-mt-0 lg:first:pt-0"
    >
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        {pageAddress(index)} · page {index}
      </p>
      <h2
        id={`${id}-heading`}
        className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl"
      >
        {title}
      </h2>
      <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted">{summary}</p>
      <div className="mt-10">{children}</div>
    </section>
  );
}

/** Two-column row: a mono label on the left, content on the right. Stacks on narrow screens. */
function Row({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 border-t border-line py-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
      <div className="font-mono text-sm text-muted">{label}</div>
      <div>{children}</div>
    </div>
  );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-prose space-y-4 leading-relaxed">
      {paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  );
}

export default function ResumeSection({
  section,
  index,
}: {
  section: ResumeSectionData;
  index: number;
}) {
  const shell = { id: section.id, index, title: section.title, summary: section.summary };

  switch (section.kind) {
    case "about":
      return (
        <SectionShell {...shell}>
          <Prose paragraphs={section.paragraphs} />
        </SectionShell>
      );

    case "experience":
      return (
        <SectionShell {...shell}>
          <div className="border-b border-line">
            {section.items.map((item, i) => (
              <Row
                key={i}
                label={
                  <>
                    <p>{item.period}</p>
                    <p className="mt-1 text-xs">{item.location}</p>
                  </>
                }
              >
                <h3 className="text-lg font-semibold leading-snug">{item.role}</h3>
                <p className="text-accent">{item.org}</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed marker:text-muted">
                  {item.highlights.map((highlight, j) => (
                    <li key={j}>{highlight}</li>
                  ))}
                </ul>
              </Row>
            ))}
          </div>
        </SectionShell>
      );

    case "projects":
      return (
        <SectionShell {...shell}>
          <div className="border-b border-line">
            {section.items.map((item, i) => (
              <Row key={i} label={item.stack.join(" / ")}>
                <h3 className="text-lg font-semibold">
                  {item.link ? (
                    <a
                      href={item.link}
                      className="underline decoration-line underline-offset-4 hover:text-accent hover:decoration-accent"
                    >
                      {item.name} ↗
                    </a>
                  ) : (
                    item.name
                  )}
                </h3>
                <p className="mt-1 max-w-prose leading-relaxed text-muted">{item.description}</p>
              </Row>
            ))}
          </div>
        </SectionShell>
      );

    case "skills":
      return (
        <SectionShell {...shell}>
          <dl className="border-b border-line">
            {section.items.map((group) => (
              <div
                key={group.category}
                className="grid gap-2 border-t border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-8"
              >
                <dt className="font-mono text-sm text-muted">{group.category}</dt>
                <dd className="leading-relaxed">{group.skills.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </SectionShell>
      );

    case "contact":
      return (
        <SectionShell {...shell}>
          <Prose paragraphs={section.paragraphs} />
          <ul className="mt-10 border-b border-line">
            {section.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group grid gap-1 border-t border-line py-5 sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-8"
                >
                  <span className="font-mono text-sm text-muted">{link.label}</span>
                  <span className="text-xl font-medium break-all group-hover:text-accent sm:text-2xl">
                    {link.value}
                  </span>
                  <span
                    aria-hidden="true"
                    className="hidden text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent motion-reduce:transition-none sm:block"
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </SectionShell>
      );
  }
}
