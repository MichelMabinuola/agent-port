import Header from "@/components/Header";
import ResumeSection from "@/components/ResumeSection";
import { resumeMeta, resumeSections } from "@/lib/resume";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <Header meta={resumeMeta} />
      <div className="space-y-6">
        {resumeSections.map((section) => (
          <ResumeSection key={section.id} section={section} />
        ))}
      </div>
    </main>
  );
}
