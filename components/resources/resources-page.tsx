"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  LayoutGrid,
  Terminal,
  ArrowRight,
} from "lucide-react";
import type { Resource } from "@/lib/types";
import { EmphasisTitle } from "@/components/typography/emphasis-title";
import { RESOURCE_CATEGORIES } from "@/lib/resources-data";

const ACCENT = "#2d5fa0";

const CATEGORY_ICONS = {
  "prompt-kits": FileText,
  "system-diagrams": LayoutGrid,
  "mcp-starters": Terminal,
} as const;

const ease = [0.16, 1, 0.3, 1] as const;

export function ResourcesPage({ resources }: { resources: Resource[] }) {
  const featured = resources[0];

  return (
    <div style={{ background: "#e8eef5" }}>
      <section style={{ padding: "80px 0 64px" }}>
        <div className="mx-auto max-w-[1100px] px-8">
          <span
            className="inline-block rounded-[20px] px-3 py-1 text-[11px] font-semibold tracking-[0.10em]"
            style={{
              background: "rgba(45,95,160,0.09)",
              color: ACCENT,
              border: "1px solid rgba(45,95,160,0.20)",
            }}
          >
            ENGINEERING RESOURCES
          </span>
          <EmphasisTitle
            title="The Builder's Toolkit."
            className="mt-5 block font-bold text-[#0a3450]"
            leadClassName="text-[#0a3450]"
            emphasisClassName="text-[#1a4d6e]"
            style={{
              fontSize: "clamp(2.4rem, 4.5vw, 3.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          />
          <p className="mt-5 max-w-[520px] text-base leading-[1.7] text-[#4a6b82]">
            Architecture templates, prompt kits, and MCP starters — everything we
            use, available to you.
          </p>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto max-w-[1100px] px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {RESOURCE_CATEGORIES.map((cat, i) => {
              const Icon = CATEGORY_ICONS[cat.id];
              return (
              <motion.a
                key={cat.id}
                href={`/resources/${cat.id}`}
                className="group block rounded-xl border border-[rgba(13,67,102,0.09)] bg-white p-6 shadow-[0_1px_3px_rgba(13,67,102,0.07),0_4px_16px_rgba(13,67,102,0.06)] transition-all duration-[240ms] hover:-translate-y-[3px] hover:shadow-[0_8px_32px_rgba(13,67,102,0.13)]"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease, delay: i * 0.08 }}
              >
                <Icon className="h-6 w-6" style={{ color: ACCENT }} />
                <h3 className="mt-4 text-base font-semibold text-[#0a3450]">
                  {cat.title}
                </h3>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#4a6b82]">
                  {cat.countLabel}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#4a6b82]">
                  {cat.description}
                </p>
                <span
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium transition-colors group-hover:gap-2"
                  style={{ color: ACCENT }}
                >
                  Browse <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </motion.a>
            );
            })}
          </div>

          {featured && (
            <motion.div
              className="mt-10 flex flex-col gap-8 overflow-hidden rounded-[14px] border border-[rgba(13,67,102,0.09)] border-l-4 bg-white p-8 md:flex-row md:items-center md:p-9"
              style={{ borderLeftColor: ACCENT }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
            >
              <div className="flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#4a6b82]">
                  Featured
                </p>
                <h3 className="mt-2 text-xl font-semibold text-[#0a3450]">
                  {featured.title}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#4a6b82]">
                  {featured.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-[20px] bg-[rgba(45,95,160,0.08)] px-3 py-0.5 text-[11px] font-medium text-[#2d5fa0]">
                    {featured.type}
                  </span>
                </div>
                <Link
                  href={featured.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold"
                  style={{ color: ACCENT }}
                >
                  Download <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div
                className="flex h-28 w-full shrink-0 items-center justify-center rounded-xl md:h-32 md:w-40"
                style={{ background: "rgba(45,95,160,0.06)" }}
              >
                <LayoutGrid className="h-12 w-12 opacity-40" style={{ color: ACCENT }} />
              </div>
            </motion.div>
          )}

          {resources.length > 1 && (
            <div className="mt-12">
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#4a6b82]">
                All resources
              </p>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {resources.slice(1).map((r) => (
                  <div
                    key={r.id}
                    className="rounded-xl border border-[rgba(13,67,102,0.09)] bg-white p-6"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#4a6b82]">
                      {r.type}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-[#0a3450]">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#4a6b82]">{r.description}</p>
                    <Link
                      href={r.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-sm font-medium"
                      style={{ color: ACCENT }}
                    >
                      Download →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
