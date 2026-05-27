import { getProjects } from "@/lib/api/projects";
import { getArticles } from "@/lib/api/articles";
import { getCategories } from "@/lib/api/categories";
import { HomeHero } from "@/components/sections/home-hero";
import { ProjectCard } from "@/components/cards/project-card";
import { CategoryGrid } from "@/components/cards/category-card";
import { FeaturedArticlesLayout } from "@/components/cards/article-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import Link from "next/link";
import { HomeSection } from "@/components/sections/home-section";

export default async function HomePage() {
  const [projectsRes, articlesRes, categories] = await Promise.all([
    getProjects({ featured: true }).catch(() => ({ items: [], total: 0, page: 1, page_size: 20 })),
    getArticles({ featured: true }).catch(() => ({ items: [], total: 0, page: 1, page_size: 20 })),
    getCategories().catch(() => []),
  ]);

  const featuredProjects = projectsRes.items.slice(0, 3);
  const hasFeaturedProjects = featuredProjects.length > 0;

  return (
    <>
      <HomeHero />

      <HomeSection variant="even" label="Featured" title="Projects">
        {hasFeaturedProjects ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-[#4a6b82]">No featured projects yet.</p>
        )}

        {projectsRes.items.length > 0 && (
          <div className="mt-[24px]">
            <Link
              href="/projects"
              className="text-[0.875rem] font-medium text-[#4a6b82] hover:text-[#0d4366] hover:underline"
            >
              View all projects
            </Link>
          </div>
        )}
      </HomeSection>

      <HomeSection
        variant="odd"
        label="Explore"
        title="What we document"
        description="Concepts, failures, frameworks, and build logs — each with its own visual identity."
      >
        <CategoryGrid categories={categories} />
      </HomeSection>

      <HomeSection variant="even" label="Read" title="Featured articles">
        <FeaturedArticlesLayout articles={articlesRes.items} />
        {articlesRes.items.length === 0 && (
          <p className="text-[#4a6b82]">No featured articles yet.</p>
        )}
      </HomeSection>

      <CtaBanner />
    </>
  );
}
