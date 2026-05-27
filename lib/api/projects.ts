import { apiFetch } from "./client";
import type { PaginatedProjects, ProjectDetail } from "@/lib/types";

type ApiLessonLearned = { title: string; body: string };
type ApiCoreFeature = { title: string; description?: string | null };
type ApiRoadmapItem = { milestone: string; status: "done" | "in_progress" | "planned"; date?: string | null };

type ApiProject = {
  id: number;
  title: string;
  slug: string;
  tagline: string;
  problem_statement: string;
  architecture_overview: string;
  architecture_mermaid: string | null;
  lessons_learned: ApiLessonLearned[] | null;
  tech_stack: string[] | null;
  core_features: ApiCoreFeature[] | null;
  roadmap: ApiRoadmapItem[] | null;
  thumbnail: string | null;
  banner_image: string | null;
  walkthrough_url: string | null;
  walkthrough_duration: string | null;
  github_url: string | null;
  demo_url: string | null;
  build_logs_url: string | null;
  accent_color: string;
  icon_label: string | null;
  status: ProjectDetail["status"];
  is_featured: boolean;
  visibility: ProjectDetail["visibility"];
  theme_id: number | null;
  featured_article_ids: number[] | null;
  created_at: string;
  updated_at: string;
};

type ApiPaginatedProjects = {
  items: ApiProject[];
  total: number;
  page: number;
  page_size: number;
};

function mapProjectFromApi(p: ApiProject): ProjectDetail {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    tagline: p.tagline,
    problemStatement: p.problem_statement,
    architectureOverview: p.architecture_overview,
    architectureMermaid: p.architecture_mermaid,
    lessonsLearned: p.lessons_learned ?? [],
    techStack: p.tech_stack ?? [],
    coreFeatures: p.core_features ?? [],
    roadmap: p.roadmap ?? [],
    githubUrl: p.github_url,
    demoUrl: p.demo_url,
    thumbnail: p.thumbnail,
    bannerImage: p.banner_image,
    walkthroughUrl: p.walkthrough_url,
    walkthroughDuration: p.walkthrough_duration,
    buildLogsUrl: p.build_logs_url,
    status: p.status,
    isFeatured: p.is_featured,
    visibility: p.visibility,
    accentColor: p.accent_color,
    iconLabel: p.icon_label,
    featuredArticleIds: p.featured_article_ids ?? [],
    themeId: p.theme_id,
    createdAt: p.created_at,
    updatedAt: p.updated_at,
  };
}

export async function getProjects(params?: {
  page?: number;
  pageSize?: number;
  status?: ProjectDetail["status"];
  isFeatured?: boolean;
  featured?: boolean;
  visibility?: ProjectDetail["visibility"];
  themeId?: number;
}): Promise<PaginatedProjects> {
  const q = new URLSearchParams();
  if (params?.page) q.set("page", String(params.page));
  if (params?.pageSize) q.set("page_size", String(params.pageSize));
  if (params?.status) q.set("status", params.status);
  if (params?.isFeatured !== undefined) q.set("is_featured", String(params.isFeatured));
  else if (params?.featured !== undefined) q.set("featured", String(params.featured));
  if (params?.visibility) q.set("visibility", params.visibility);
  if (params?.themeId !== undefined) q.set("theme_id", String(params.themeId));

  const qs = q.toString();
  const apiData = await apiFetch<ApiPaginatedProjects>(`/projects${qs ? `?${qs}` : ""}`);
  return {
    items: apiData.items.map(mapProjectFromApi),
    total: apiData.total,
    page: apiData.page,
    page_size: apiData.page_size,
  };
}

export async function getProject(slug: string): Promise<ProjectDetail> {
  const p = await apiFetch<ApiProject>(`/projects/${slug}`);
  return mapProjectFromApi(p);
}
