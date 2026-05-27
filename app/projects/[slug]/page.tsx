import { notFound } from "next/navigation";
import { getProject } from "@/lib/api/projects";
import { ProjectDetailView } from "@/components/project/project-detail-view";
import { ProjectThemeShell } from "@/components/project/project-theme-shell";
import { getProjectAccent } from "@/lib/project-mermaid";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const project = await getProject(slug);
    return {
      title: project.title,
      description: project.tagline ?? undefined,
    };
  } catch {
    return { title: "Project" };
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  try {
    const project = await getProject(slug);
    return (
      <ProjectThemeShell accent={getProjectAccent(project)}>
        <ProjectDetailView project={project} />
      </ProjectThemeShell>
    );
  } catch {
    notFound();
  }
}
