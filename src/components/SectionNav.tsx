import { pageAddress, type ResumeSection } from "@/lib/resume";

/** The page table: one entry per section, doubling as the site navigation. */
export default function SectionNav({ sections }: { sections: ResumeSection[] }) {
  return (
    <nav
      aria-label="Sections"
      className="sticky top-0 z-10 -mx-5 border-b border-line bg-background/90 px-5 backdrop-blur sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:backdrop-blur-none"
    >
      <p className="hidden font-mono text-xs uppercase tracking-widest text-muted lg:block">
        Page table
      </p>
      <ol className="flex gap-5 overflow-x-auto py-3 lg:mt-3 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-line lg:py-0">
        {sections.map((section, i) => (
          <li key={section.id} className="shrink-0 lg:border-b lg:border-line">
            <a
              href={`#${section.id}`}
              className="group flex items-baseline gap-3 text-sm font-medium lg:py-2.5 lg:text-base"
            >
              <span className="hidden font-mono text-xs text-muted group-hover:text-accent lg:inline">
                {pageAddress(i)}
              </span>
              <span className="group-hover:text-accent">{section.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
