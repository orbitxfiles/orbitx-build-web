import { Suspense } from "react";
import { getArticles } from "@/lib/api/articles";
import { getCategories } from "@/lib/api/categories";
import { LearnHero } from "@/components/learn/learn-hero";
import { TopicFilter } from "@/components/learn/topic-filter";
import { LearnArticlesSection } from "@/components/learn/learn-articles-section";
import { BuildersToolkit } from "@/components/learn/builders-toolkit";
import { FILTER_TOPICS } from "@/lib/learn-topics";

export const metadata = {
  title: "Academy",
  description:
    "Deep-dive engineering tutorials, architecture diagrams, and implementation guides for building reliable AI systems.",
};

function TopicFilterFallback() {
  return <div className="h-[52px]" style={{ background: "#f0f5f8" }} />;
}

export default async function LearnPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic: topicParam } = await searchParams;
  const activeTopic =
    topicParam && FILTER_TOPICS.some((t) => t.id === topicParam)
      ? topicParam
      : "all";

  const [categories, articlesRes] = await Promise.all([
    getCategories().catch(() => []),
    getArticles({ page: 1, pageSize: 50 }).catch(() => ({
      items: [],
      total: 0,
      page: 1,
      page_size: 50,
    })),
  ]);

  const topicCount = Math.max(categories.length, FILTER_TOPICS.length - 1);

  return (
    <div className="bg-[#e8f1f5]">
      <LearnHero
        articleCount={articlesRes.total || articlesRes.items.length}
        topicCount={topicCount}
      />
      <Suspense fallback={<TopicFilterFallback />}>
        <TopicFilter activeTopic={activeTopic} />
      </Suspense>
      <LearnArticlesSection
        articles={articlesRes.items}
        categories={categories}
        activeTopic={activeTopic}
      />
      <BuildersToolkit />
    </div>
  );
}
