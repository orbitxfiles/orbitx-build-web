"use client";

import { useMemo } from "react";
import type { Article, Category } from "@/lib/types";
import { resolveTopicKey, topicMatchesFilter } from "@/lib/learn-topics";
import { AcademyArticleCard } from "@/components/learn/academy-article-card";

export function LearnArticlesSection({
  articles,
  categories,
  activeTopic,
}: {
  articles: Article[];
  categories: Category[];
  activeTopic: string;
}) {
  const catMap = useMemo(
    () => new Map(categories.map((c) => [c.id, c])),
    [categories]
  );

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const cat = a.category_id ? catMap.get(a.category_id) : undefined;
      const key = resolveTopicKey(cat?.name, cat?.slug);
      return topicMatchesFilter(key, activeTopic);
    });
  }, [articles, catMap, activeTopic]);

  return (
    <section style={{ background: "#e8f1f5", padding: "80px 0" }}>
      <div className="mx-auto max-w-[1100px] px-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#4a6b82]">
          READ
        </p>
        <h2
          className="mt-2 font-semibold text-[#0a3450]"
          style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: 1.2 }}
        >
          Engineering articles
        </h2>
        <p className="mt-2 max-w-[560px] text-base leading-relaxed text-[#4a6b82]">
          Concepts, failures, and implementations — documented as we build.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article, i) => {
            const cat = article.category_id
              ? catMap.get(article.category_id)
              : undefined;
            return (
              <AcademyArticleCard
                key={article.id}
                article={article}
                categoryName={cat?.name}
                categorySlug={cat?.slug}
                index={i}
              />
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-[#4a6b82]">No articles in this topic yet.</p>
        )}
      </div>
    </section>
  );
}
