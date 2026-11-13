import {
  Binary,
  Bot,
  Boxes,
  Cpu,
  Download,
  Fingerprint,
  FolderArchive,
  Images,
  NotebookPen,
  ScanLine,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Project } from "../data/projects";

const icons: Record<string, LucideIcon> = {
  spectre: ShieldCheck,
  planora: NotebookPen,
  "ex-employee": Users,
  helix: Download,
  opaline: Boxes,
  "packer-antidebug-auditor": Binary,
  "palette-auth": Fingerprint,
  "android-utils": FolderArchive,
  multiai: Bot,
  "bypasstpm-secureboot": Cpu,
  "midjourney-scraper": Images,
  pixelguard: ScanLine,
};

/** The coloured app-icon square that stands in for a project everywhere. */
export default function ProjectTile({
  project,
  size = 56,
  className = "",
}: {
  project: Project;
  size?: number;
  className?: string;
}) {
  const Icon = icons[project.slug] ?? Cpu;
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center text-[#0b0b0c] ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.24,
        background: project.color,
        boxShadow: `0 10px 40px -8px ${project.color}99`,
      }}
      aria-hidden="true"
    >
      <Icon size={size * 0.5} strokeWidth={1.75} />
    </span>
  );
}
