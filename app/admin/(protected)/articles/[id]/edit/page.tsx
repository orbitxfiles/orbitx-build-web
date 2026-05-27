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
      <h1 className="text-2xl font-semibold text-white">Edit article</h1>
      <form action={updateArticleAction} className="mt-8 space-y-4 rounded-xl border border-white/15 bg-[#18364c]/70 p-6">
        <input type="hidden" name="id" value={String(article.id)} />
        <Field label="Title" name="title" defaultValue={article.title} required />
        <Field label="Slug" name="slug" defaultValue={article.slug} required />
        <Field label="Excerpt" name="excerpt" defaultValue={article.excerpt ?? ""} />
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#9ac0d7]">Visibility</span>
          <select name="visibility" defaultValue={article.visibility} className="h-11 w-full rounded-lg border border-white/15 bg-[#0e2535] px-3 text-sm text-white">
            <option value="draft">draft</option>
            <option value="private">private</option>
            <option value="public">public</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-[#d2e6f3]">
          <input type="checkbox" name="published" defaultChecked={article.published} />
          Published
        </label>
        <button className="rounded-lg bg-[#1a7a5e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1f8e6e]">
          Save article
        </button>
      </form>
    </div>
  );
}

function Field({ label, name, defaultValue, required = false }: { label: string; name: string; defaultValue?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#9ac0d7]">{label}</span>
      <input name={name} defaultValue={defaultValue} required={required} className="h-11 w-full rounded-lg border border-white/15 bg-[#0e2535] px-3 text-sm text-white outline-none focus:border-[#6da6c9]" />
    </label>
  );
}

