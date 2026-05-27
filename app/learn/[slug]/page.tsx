import { notFound } from "next/navigation";
import { getArticle } from "@/lib/api/articles";
import { getCategories } from "@/lib/api/categories";
import { getProjects } from "@/lib/api/projects";
import { ArticleView } from "@/components/article/article-view";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const article = await getArticle(slug);
    return {
      title: article.seo_title ?? article.title,
      description: article.seo_description ?? article.excerpt ?? undefined,
    };
  } catch {
    return { title: "Article" };
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  let article;
  try {
    article = await getArticle(slug);
  } catch {
    notFound();
  }

  const [categories, projectsRes] = await Promise.all([
    getCategories().catch(() => []),
    getProjects({ page: 1, pageSize: 100 }).catch(() => ({
      items: [],
      total: 0,
      page: 1,
      page_size: 100,
    })),
  ]);

  const catMap = new Map(categories.map((c) => [c.id, c.name]));
  const categoryName = article.category_id
    ? catMap.get(article.category_id)
    : undefined;

  const relatedProject = article.project_id
    ? projectsRes.items.find((p) => p.id === article.project_id) ?? null
    : null;

  return (
    <ArticleView
      article={article}
      categoryName={categoryName}
      relatedProject={relatedProject}
      categoryMap={catMap}
    />
  );
}
