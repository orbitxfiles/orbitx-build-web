import { notFound } from "next/navigation";
import { apiFetch } from "@/lib/api/client";
import type { Article, PaginatedArticles } from "@/lib/types";
import { updateArticleAction } from "@/lib/admin/actions";

export const metadata = { title: "Admin - Edit Article" };

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const articleId = Number(id);
  const res = await apiFetch<PaginatedArticles>(
    "/articles?page=1&page_size=200&published_only=false",
    { cache: "no-store" }
  ).catch(() => ({ items: [] as Article[], total: 0, page: 1, page_size: 200 }));
  const article = res.items.find((a) => a.id === articleId);
  if (!article) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-[#111]">Edit article</h1>
      <form action={updateArticleAction} className="mt-8 space-y-4 rounded-xl border border-[#e5e7eb] bg-white p-6">
        <input type="hidden" name="id" value={String(article.id)} />
        <Field label="Title" name="title" defaultValue={article.title} required />
        <Field label="Slug" name="slug" defaultValue={article.slug} required />
        <Field label="Excerpt" name="excerpt" defaultValue={article.excerpt ?? ""} />
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#666]">Visibility</span>
          <select name="visibility" defaultValue={article.visibility} className="h-11 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#111]">
            <option value="draft">draft</option>
            <option value="private">private</option>
            <option value="public">public</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-[#d2e6f3]">
          <input type="checkbox" name="published" defaultChecked={article.published} />
          Published
        </label>
        <button className="rounded-lg bg-[#111] px-4 py-2 text-sm font-semibold text-white hover:bg-[#222]">
          Save article
        </button>
      </form>
    </div>
  );
}

function Field({ label, name, defaultValue, required = false }: { label: string; name: string; defaultValue?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#666]">{label}</span>
      <input name={name} defaultValue={defaultValue} required={required} className="h-11 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#111] outline-none focus:border-[#6da6c9]" />
    </label>
  );
}

