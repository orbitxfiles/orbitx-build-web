"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import type { ResourceCategory } from "@/lib/resources-data";
import { EmphasisTitle } from "@/components/typography/emphasis-title";

const ease = [0.16, 1, 0.3, 1] as const;

export function ResourceCategoryView({ category }: { category: ResourceCategory }) {
  const accent = category.accent;

  return (
    <div style={{ background: "#e8eef5" }}>
      <section style={{ padding: "64px 0 48px" }}>
        <div className="mx-auto max-w-[1100px] px-8">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-[13px] text-[#4a6b82] transition-colors hover:text-[#0d4366]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Resources
          </Link>

          <span
            className="mt-6 inline-block rounded-[20px] px-3 py-1 text-[11px] font-semibold tracking-[0.10em]"
            style={{
              background: `${accent}14`,
              color: accent,
              border: `1px solid ${accent}33`,
            }}
          >
            {category.countLabel.toUpperCase()}
          </span>

          <EmphasisTitle
            title={category.title}
            className="mt-4 block font-bold text-[#0a3450]"
            leadClassName="text-[#0a3450]"
            emphasisClassName="text-[#1a4d6e]"
            style={{
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
            }}
          />

          <p className="mt-4 max-w-[560px] text-base leading-[1.7] text-[#4a6b82]">
            {category.description}
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-[1100px] px-8">
          <div className="grid gap-5 md:grid-cols-2">
            {category.items.map((item, i) => (
              <motion.article
                key={item.slug}
                className="group rounded-xl border border-[rgba(13,67,102,0.09)] bg-white p-6 shadow-[0_1px_3px_rgba(13,67,102,0.07)] transition-all duration-[240ms] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(13,67,102,0.10)]"
                style={{ borderLeftWidth: 3, borderLeftColor: accent }}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: i * 0.05 }}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="rounded-[20px] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]"
                    style={{
                      background: `${accent}12`,
                      color: accent,
                    }}
                  >
                    {item.type}
                  </span>
                  <a
                    href={item.filePath}
                    download
                    className="inline-flex items-center gap-1 rounded-md border border-[rgba(13,67,102,0.12)] px-2.5 py-1 text-[11px] font-medium text-[#4a6b82] transition-colors hover:border-[rgba(13,67,102,0.22)] hover:text-[#0d4366]"
                  >
                    <Download className="h-3 w-3" />
                    Download
                  </a>
                </div>
                <h2 className="mt-3 text-[1.05rem] font-semibold text-[#0a3450]">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#4a6b82]">
                  {item.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-[#4a6b82]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={item.filePath}
                  target="_blank"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2"
                  style={{ color: accent }}
                >
                  Preview <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
