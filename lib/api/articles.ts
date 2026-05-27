import { apiFetch } from "./client";
import type { ArticleDetail, PaginatedArticles } from "@/lib/types";

export async function getArticles(params?: {
  page?: number;
  pageSize?: number;
  featured?: boolean;
  category_id?: number;
  search?: string;
}): Promise<PaginatedArticles> {
  const q = new URLSearchParams();
  if (params?.page) q.set("page", String(params.page));
  if (params?.pageSize) q.set("page_size", String(params.pageSize));
  if (params?.featured) q.set("featured", "true");
  if (params?.category_id) q.set("category_id", String(params.category_id));
  if (params?.search) q.set("search", params.search);
  const qs = q.toString();
  return apiFetch<PaginatedArticles>(`/articles${qs ? `?${qs}` : ""}`);
}

export async function getArticle(slug: string): Promise<ArticleDetail> {
  return apiFetch<ArticleDetail>(`/articles/${slug}`);
}
