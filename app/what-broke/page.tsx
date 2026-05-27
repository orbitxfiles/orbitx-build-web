import { getArticles } from "@/lib/api/articles";
import { getCategories } from "@/lib/api/categories";
import { WhatBrokeHero } from "@/components/what-broke/what-broke-hero";
import { WhatBrokeArticleCard } from "@/components/what-broke/what-broke-article-card";

export const metadata = {
  title: "What Broke",
  description: "Honest engineering post-mortems — failure, root cause, fix, and lesson.",
};

export default async function WhatBrokePage() {
  const categories = await getCategories().catch(() => []);
  const brokeCategory = categories.find(
    (c) => c.slug === "what-broke" || c.name.toLowerCase().includes("broke")
  );

  const articlesRes = await getArticles({
    page: 1,
    pageSize: 50,
    category_id: brokeCategory?.id,
  }).catch(() => ({ items: [], total: 0, page: 1, page_size: 50 }));

  const items = articlesRes.items.length
    ? articlesRes.items
    : (
        await getArticles({ page: 1, pageSize: 50 }).catch(() => ({
          items: [],
        }))
      ).items.filter((a) =>
        /broke|failure|post-?mortem/i.test(
          `${a.title} ${a.excerpt ?? ""} ${a.seo_keywords ?? ""}`
        )
      );

  return (
    <div style={{ background: "#f5e8e8" }}>
      <WhatBrokeHero />
      <section className="pb-24 pt-4">
        <div className="mx-auto max-w-[1100px] px-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#4a6b82]">
            Case studies
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#0a3450]">
            Post-mortem archive
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((a, i) => (
              <WhatBrokeArticleCard key={a.id} article={a} index={i} />
            ))}
          </div>
          {items.length === 0 && (
            <p className="mt-12 rounded-xl border border-[rgba(13,67,102,0.09)] bg-white p-10 text-center text-[#4a6b82]">
              No post-mortems published yet. Check back as we document failures in
              the open.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
