import resumeData from "@/content/resume.json";

export interface ResumeMeta {
  name: string;
  title: string;
  location: string;
  tagline: string;
}

interface BaseSection {
  id: string;
  title: string;
  icon: string;
  summary: string;
}

export interface AboutSection extends BaseSection {
  kind: "about";
  paragraphs: string[];
}

export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface ExperienceSection extends BaseSection {
  kind: "experience";
  items: ExperienceItem[];
}

export interface ProjectItem {
  name: string;
  description: string;
  stack: string[];
  link: string | null;
}

export interface ProjectsSection extends BaseSection {
  kind: "projects";
  items: ProjectItem[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface SkillsSection extends BaseSection {
  kind: "skills";
  items: SkillGroup[];
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
}

export interface ContactSection extends BaseSection {
  kind: "contact";
  paragraphs: string[];
  links: ContactLink[];
}

export type ResumeSection =
  | AboutSection
  | ExperienceSection
  | ProjectsSection
  | SkillsSection
  | ContactSection;

export interface ResumeData {
  meta: ResumeMeta;
  sections: ResumeSection[];
}

const data = resumeData as ResumeData;

export const resumeMeta: ResumeMeta = data.meta;
export const resumeSections: ResumeSection[] = data.sections;

/** Each section is one 4 KiB page, so section i lives at virtual address i * 0x1000. */
export function pageAddress(index: number): string {
  return `0x${(index * 0x1000).toString(16).padStart(4, "0")}`;
}

export function getSection(id: string): ResumeSection | undefined {
  return resumeSections.find((section) => section.id === id);
}
