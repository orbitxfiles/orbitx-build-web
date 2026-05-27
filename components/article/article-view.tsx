"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { List } from "lucide-react";
import type { Article, ArticleDetail, ArticleSection, Project } from "@/lib/types";
import { ArticleProse } from "@/components/article/article-prose";
import {
  extractHeadingsFromMarkdown,
  extractHeadingsFromSections,
  type TocItem,
} from "@/lib/article-headings";
import { LEARN_ACCENT } from "@/lib/learn-topics";
import { formatDate } from "@/lib/utils";
import { EmphasisTitle } from "@/components/typography/emphasis-title";
import { BlockRenderer } from "@/components/blocks/block-renderer";

function ArticleSectionsBody({ sections }: { sections: ArticleSection[] }) {
  return (
    <div className="prose-orbitx">
      <BlockRenderer sections={sections} />
    </div>
  );
}

function CompactRelatedCard({
  article,
  categoryName,
}: {
  article: Article;
  categoryName?: string;
}) {
  return (
    <Link
      href={`/learn/${article.slug}`}
      className="group block rounded-[10px] border border-[rgba(13,67,102,0.09)] bg-white p-[16px_18px] transition-all duration-[240ms] ease-out hover:-translate-y-0.5 hover:border-[rgba(13,67,102,0.18)] hover:shadow-[0_6px_20px_rgba(13,67,102,0.09)]"
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6b4fa0]">
        {categoryName?.toUpperCase() ?? "ARTICLE"}
      </span>
      <p
        className="mt-2 text-[0.875rem] font-semibold leading-snug text-[#0a3450]"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {article.title}
      </p>
      <p className="mt-2 text-[11px] text-[#4a6b82]">
        {article.reading_time ?? 8} min read
      </p>
    </Link>
  );
}

function SidebarCard({
  accentColor,
  header,
  children,
}: {
  accentColor: string;
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      className="overflow-hidden rounded-xl border border-[rgba(13,67,102,0.09)] bg-white"
      style={{ borderLeftWidth: 3, borderLeftColor: accentColor }}
    >
      <div className="border-b border-[rgba(13,67,102,0.07)] px-[18px] py-3.5">
        {header}
      </div>
      {children}
    </div>
  );
}

export function ArticleView({
  article,
  categoryName,
  relatedProject,
  categoryMap,
}: {
  article: ArticleDetail;
  categoryName?: string;
  relatedProject?: Project | null;
  categoryMap?: Map<number, string>;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [tocOpen, setTocOpen] = useState(false);
  const [shared, setShared] = useState(false);

  const authorName = article.author?.name ?? "OrbitX";
  const authorInitial = authorName.charAt(0).toUpperCase();

  const tocItems: TocItem[] = useMemo(() => {
    if (article.content_markdown) {
      return extractHeadingsFromMarkdown(article.content_markdown);
    }
    if (article.sections.length > 0) {
      return extractHeadingsFromSections(article.sections);
    }
    return [];
  }, [article.content_markdown, article.sections]);

  const tags = useMemo(() => {
    const list = [categoryName].filter(Boolean) as string[];
    if (article.seo_keywords) {
      list.push(
        ...article.seo_keywords.split(",").map((k) => k.trim()).filter(Boolean)
      );
    }
    return [...new Set(list.length ? list : ["Engineering"])];
  }, [categoryName, article.seo_keywords]);

  const updateProgress = useCallback(() => {
    const el = contentRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const viewport = window.innerHeight;
    const total = el.offsetHeight - viewport * 0.2;
    if (total <= 0) return;
    const scrolled = Math.min(
      Math.max(-rect.top + viewport * 0.15, 0),
      total
    );
    setProgress(Math.min(100, (scrolled / total) * 100));
  }, []);

  useEffect(() => {
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, [updateProgress]);

  useEffect(() => {
    if (tocItems.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    for (const item of tocItems) {
      const node = document.getElementById(item.id);
      if (node) observer.observe(node);
    }
    return () => observer.disconnect();
  }, [tocItems]);

  async function shareArticle() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 1500);
    } catch {
      /* ignore */
    }
  }

  function scrollToHeading(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  }

  const sidebarToc =
    tocItems.length > 0 ? (
      <SidebarCard
        accentColor={LEARN_ACCENT}
        header={
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#4a6b82]">
            <List className="h-3 w-3 text-[#6b4fa0]" aria-hidden />
            In this article
          </p>
        }
      >
        <ul className="py-2.5">
          {tocItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollToHeading(item.id)}
                className="block w-full border-l-2 py-1.5 text-left transition-all duration-150"
                style={{
                  paddingLeft: item.level === 3 ? 28 : 14,
                  paddingRight: 18,
                  fontSize: item.level === 3 ? 12 : 12.5,
                  color: activeId === item.id ? "#0d4366" : item.level === 3 ? "#5a7a92" : "#4a6b82",
                  borderLeftColor: activeId === item.id ? LEARN_ACCENT : "transparent",
                  fontWeight: activeId === item.id ? 500 : 400,
                  background: activeId === item.id ? "rgba(107,79,160,0.04)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (activeId !== item.id) {
                    e.currentTarget.style.background = "rgba(13,67,102,0.03)";
                    e.currentTarget.style.color = "#0d4366";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeId !== item.id) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color =
                      item.level === 3 ? "#5a7a92" : "#4a6b82";
                  }
                }}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </SidebarCard>
    ) : null;

  const metaRows: { label: string; value: React.ReactNode }[] = [
    { label: "Author", value: authorName },
    { label: "Published", value: formatDate(article.created_at) },
    { label: "Read time", value: `${article.reading_time ?? 8} min` },
  ];

  if (relatedProject?.slug) {
    metaRows.push({
      label: "Project",
      value: (
        <Link
          href={`/projects/${relatedProject.slug}`}
          className="font-medium text-[#1a7a5e] hover:underline"
        >
          {relatedProject.title} →
        </Link>
      ),
    });
  }

  const sidebarMeta = (
    <SidebarCard
      accentColor="rgba(13,67,102,0.20)"
      header={
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#4a6b82]">
          About this article
        </p>
      }
    >
      <dl>
        {metaRows.map((row, i) => (
          <div
            key={row.label}
            className="px-[18px] py-2"
            style={
              i < metaRows.length - 1
                ? { borderBottom: "1px solid rgba(13,67,102,0.07)" }
                : undefined
            }
          >
            <dt className="text-[10px] uppercase tracking-[0.1em] text-[#4a6b82]">
              {row.label}
            </dt>
            <dd className="mt-0.5 text-[13px] font-medium text-[#0d4366]">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </SidebarCard>
  );

  return (
    <>
      <div
        className="fixed left-0 right-0 top-0 z-[999] h-0.5"
        aria-hidden
      >
        <div
          className="h-full transition-[width] duration-[60ms] linear"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #6b4fa0, #9b6fd4)",
          }}
        />
      </div>

      <div className="border-b border-[rgba(13,67,102,0.10)] bg-[#e8f1f5]">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-8 py-3">
          <Link
            href="/learn"
            className="text-[13px] text-[#4a6b82] transition-colors hover:text-[#0d4366]"
          >
            ← Back to Academy
          </Link>
          <button
            type="button"
            onClick={shareArticle}
            className="rounded-md border border-[rgba(13,67,102,0.18)] px-3.5 py-1 text-[12px] text-[#4a6b82] transition-colors hover:border-[rgba(13,67,102,0.35)]"
          >
            {shared ? "Link copied" : "Share"}
          </button>
        </div>
      </div>

      <article className="bg-[#e8f1f5] pb-24">
        <div className="mx-auto max-w-[1100px] px-8">
          <header className="mx-auto max-w-[720px] pt-16">
            <div className="flex flex-wrap items-center gap-2.5 text-[12px] text-[#4a6b82]">
              <span
                className="rounded-[20px] px-3 py-1 text-[11px] font-semibold tracking-[0.10em]"
                style={{
                  background: "rgba(107,79,160,0.10)",
                  color: "#6b4fa0",
                  border: "1px solid rgba(107,79,160,0.22)",
                }}
              >
                {categoryName?.toUpperCase() ?? "ENGINEERING"}
              </span>
              <span
                className="inline-block h-3 w-px"
                style={{ background: "rgba(13,67,102,0.20)" }}
                aria-hidden
              />
              <span>{article.reading_time ?? 8} min read</span>
              <span aria-hidden>·</span>
              <span>{formatDate(article.created_at)}</span>
            </div>

            <EmphasisTitle
              title={article.title}
              className="mt-5 font-bold text-[#0a3450]"
              leadClassName="text-[#0a3450]"
              emphasisClassName="text-[#1a4d6e]"
              style={{
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.025em",
                maxWidth: 680,
              }}
            />

            {article.excerpt && (
              <p
                className="mt-5 max-w-[600px] border-l-[3px] pl-[18px] text-[1.15rem] italic leading-[1.75] text-[#3d5a72]"
                style={{ borderColor: "rgba(107,79,160,0.40)" }}
              >
                {article.excerpt}
              </p>
            )}

            <div className="mt-6 flex items-center gap-3">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg, #0a3450, #6b4fa0)",
                }}
              >
                {authorInitial}
              </span>
              <span className="text-[13px] font-medium text-[#0d4366]">
                {authorName}
              </span>
              <span className="text-[#4a6b82]" aria-hidden>
                ·
              </span>
              <span className="text-[13px] text-[#4a6b82]">
                OrbitX Engineering Lab
              </span>
            </div>

            <div
              className="my-10 h-px"
              style={{
                background:
                  "linear-gradient(90deg, rgba(107,79,160,0.30) 0%, rgba(13,67,102,0.10) 40%, transparent 100%)",
              }}
              aria-hidden
            />
          </header>

          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
            <div className="min-w-0">
              <div ref={contentRef} className="max-w-[640px]">
                {article.content_markdown ? (
                  <ArticleProse content={article.content_markdown} />
                ) : article.sections.length > 0 ? (
                  <ArticleSectionsBody sections={article.sections} />
                ) : null}
              </div>

              <footer className="mt-16 max-w-[640px] border-t border-[rgba(13,67,102,0.09)] pt-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#4a6b82]">
                  Topics covered
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="cursor-default rounded-[20px] border border-[rgba(107,79,160,0.18)] bg-[rgba(107,79,160,0.08)] px-3.5 py-1 text-[12px] font-medium text-[#5a3d8a] transition-colors hover:border-[rgba(107,79,160,0.30)] hover:bg-[rgba(107,79,160,0.14)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {article.related_articles.length > 0 && (
                  <div className="mt-10">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#4a6b82]">
                      Continue reading
                    </p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {article.related_articles.slice(0, 2).map((rel) => (
                        <CompactRelatedCard
                          key={rel.id}
                          article={rel}
                          categoryName={
                            rel.category_id
                              ? categoryMap?.get(rel.category_id)
                              : undefined
                          }
                        />
                      ))}
                    </div>
                  </div>
                )}
              </footer>

              <div className="mt-10 lg:hidden">
                <button
                  type="button"
                  onClick={() => setTocOpen((o) => !o)}
                  className="flex w-full items-center justify-between rounded-xl border border-[rgba(13,67,102,0.09)] border-l-[3px] border-l-[#6b4fa0] bg-white px-5 py-4 text-left text-sm font-medium text-[#0a3450]"
                >
                  Table of Contents
                  <span className="text-[#4a6b82]">{tocOpen ? "▲" : "▼"}</span>
                </button>
                {tocOpen && <div className="mt-3">{sidebarToc}</div>}
                <div className="mt-4">{sidebarMeta}</div>
              </div>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-[88px] flex flex-col gap-4">
                {sidebarToc}
                {sidebarMeta}
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
