"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import type { Article } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { resolveTopicKey, TOPIC_STYLES, type TopicKey } from "@/lib/learn-topics";
import { TopicThumbnail } from "@/components/learn/topic-thumbnail";
import { formatDate } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export function AcademyArticleCard({
  article,
  categoryName,
  categorySlug,
  index = 0,
}: {
  article: Article;
  categoryName?: string;
  categorySlug?: string;
  index?: number;
}) {
  const topicKey: TopicKey = resolveTopicKey(categoryName, categorySlug);
  const style = TOPIC_STYLES[topicKey];
  const tagLabel = categoryName?.toUpperCase() ?? style.label.toUpperCase();
  const readMin = article.reading_time ?? 8;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.38, ease, delay: index * 0.07 }}
    >
      <Link href={`/learn/${article.slug}`} className="group block h-full">
        <Card className="relative flex h-full flex-col overflow-hidden rounded-[12px]">
          <span
            className="absolute right-3.5 top-3.5 z-10 text-[13px] opacity-0 transition-all duration-[180ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
            style={{ color: "#6b4fa0" }}
            aria-hidden
          >
            ↗
          </span>

          <div
            className="relative flex h-[160px] items-center justify-center overflow-hidden"
            style={{ background: style.bg }}
          >
            <div className="transition-transform duration-[400ms] ease-out group-hover:scale-[1.04]">
              <TopicThumbnail topic={topicKey} />
            </div>
            <span
              className="absolute right-3 top-3 rounded-[20px] px-2 py-0.5 text-[10px] font-semibold tracking-[0.08em]"
              style={{
                background: `${style.accent}1f`,
                color: style.accent,
              }}
            >
              {tagLabel}
            </span>
          </div>

          <div className="flex flex-1 flex-col px-5 pb-5 pt-[18px]">
            <div className="flex items-center gap-2 text-[11px] font-medium text-[#4a6b82]">
              <Clock className="h-3.5 w-3.5" />
              <span>{readMin} min read</span>
            </div>
            <h3 className="mt-2 text-base font-semibold leading-snug text-[#0a3450]">
              {article.title}
            </h3>
            {article.excerpt && (
              <p
                className="mt-1.5 text-[0.875rem] leading-[1.6] text-[#4a6b82]"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {article.excerpt}
              </p>
            )}
            <div className="mt-3.5 flex items-center justify-between text-[11px] text-[#4a6b82]">
              <span>{article.author_id ? "OrbitX" : "OrbitX"}</span>
              <span>{formatDate(article.created_at)}</span>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
