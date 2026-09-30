import Header from "@/components/Header";
import ResumeSection from "@/components/ResumeSection";
import SectionNav from "@/components/SectionNav";
import { resumeMeta, resumeSections } from "@/lib/resume";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:grid lg:grid-cols-[17rem_1fr] lg:gap-20">
      {/* Mobile: header scrolls away, nav sticks. Desktop: both pinned in a sidebar. */}
      <div className="max-lg:contents lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:gap-12 lg:py-16">
        <Header meta={resumeMeta} />
        <SectionNav sections={resumeSections} />
      </div>
      <main className="pb-24 lg:py-16">
        {resumeSections.map((section, i) => (
          <ResumeSection key={section.id} section={section} index={i} />
        ))}
      </main>
    </div>
  );
}
