import type { ProjectDetail } from "@/lib/types";
import { isMermaidGraph } from "@/lib/parseMermaid";

/** Extract Mermaid graph source from project fields */
export function getProjectMermaid(project: ProjectDetail): string | null {
  const explicit = project.architectureMermaid?.trim();
  if (explicit) return explicit;

  const overview = project.architectureOverview?.trim();
  if (overview && isMermaidGraph(overview)) return overview;

  return null;
}

export function getProjectAccent(project: ProjectDetail): string {
  return project.accentColor ?? "#1a7a5e";
}
