"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import type { Article } from "@/lib/types";
import { Card } from "@/components/ui/Card";

const ease = [0.16, 1, 0.3, 1] as const;

function ReadTime({ article }: { article: Article }) {
  const minutes = article.reading_time ?? 8;
  return (
    <div className="flex items-center gap-[10px] text-[11px] font-medium" style={{ color: "#4a6b82" }}>
      <Clock className="h-3.5 w-3.5" />
      <span>{minutes} min read</span>
    </div>
  );
}

function clampTwoLinesProps() {
  return {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  } as const;
}

function ArticleCardLargeInner({ article }: { article: Article }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = article.cover_image?.startsWith("http") && !imgFailed;

  return (
    <Link href={`/learn/${article.slug}`} className="block h-full">
      <Card className="flex h-full flex-col">
        <div
          className="relative h-[180px] overflow-hidden"
          style={{
            backgroundColor: "#ede8f5",
            backgroundImage:
              "radial-gradient(rgba(107,79,160,0.12) 1.5px, transparent 1.5px)",
            backgroundSize: "18px 18px",
          }}
        >
          <div className="h-full w-full transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]">
            {showImage ? (
              <Image
                src={article.cover_image!}
                alt=""
                fill
                className="object-cover opacity-[0.92]"
                sizes="60vw"
                onError={() => setImgFailed(true)}
              />
            ) : null}
          </div>
        </div>

        <div className="px-[24px] py-[20px]">
          <ReadTime article={article} />
          <h3
            className="mt-[8px] font-semibold leading-snug"
            style={{ fontSize: "1.05rem", color: "#0a3450" }}
          >
            {article.title}
          </h3>
          <p
            className="mt-[6px] text-[0.875rem] leading-[1.6]"
            style={{ color: "#4a6b82", ...clampTwoLinesProps() }}
          >
            {article.excerpt}
          </p>
        </div>
      </Card>
    </Link>
  );
}

function ArticleCardCompactInner({ article }: { article: Article }) {
  return (
    <Link href={`/learn/${article.slug}`} className="block h-full">
      <Card className="flex h-full flex-col">
        <div className="px-[24px] py-[20px]">
          <ReadTime article={article} />
          <h3
            className="mt-[8px] font-semibold leading-snug"
            style={{ fontSize: "1.05rem", color: "#0a3450" }}
          >
            {article.title}
          </h3>
          <p
            className="mt-[6px] text-[0.875rem] leading-[1.6]"
            style={{ color: "#4a6b82", ...clampTwoLinesProps() }}
          >
            {article.excerpt}
          </p>
        </div>
      </Card>
    </Link>
  );
}

// Compatibility export (used by the search page)
export function ArticleCard({
  article,
  // Kept for backward compatibility with existing pages.
  // The new homepage design doesn't render category labels in the cards.
  categoryName,
}: {
  article: Article;
  categoryName?: string;
}) {
  void categoryName;
  return <ArticleCardLargeInner article={article} />;
}

export function FeaturedArticlesLayout({
  articles,
}: {
  articles: Article[];
}) {
  if (articles.length === 0) return null;

  if (articles.length === 1) {
    return (
      <div className="max-w-[600px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease }}
        >
          <ArticleCardLargeInner article={articles[0]} />
        </motion.div>
      </div>
    );
  }

  const [primary, ...rest] = articles;

  return (
    <div className="grid gap-6 lg:grid-cols-[58%_42%]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease, delay: 0 }}
      >
        <ArticleCardLargeInner article={primary} />
      </motion.div>
      <div className="flex flex-col gap-6">
        {rest.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease, delay: (i + 1) * 0.07 }}
          >
            <ArticleCardCompactInner article={a} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
