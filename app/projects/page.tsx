import { getProjects } from "@/lib/api/projects";
import { ProjectCard } from "@/components/cards/project-card";
import { PageSection } from "@/components/sections/page-section";

export const metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const data = await getProjects().catch(() => ({
    items: [],
    total: 0,
    page: 1,
    page_size: 20,
  }));

  return (
    <PageSection
      label="Engineering lab"
      title="Projects"
      description="Real systems built in public — architecture, stacks, demos, and lessons."
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </PageSection>
  );
}
