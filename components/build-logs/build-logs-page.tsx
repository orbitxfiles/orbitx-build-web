"use client";

import { motion } from "framer-motion";
import { EmphasisTitle } from "@/components/typography/emphasis-title";
import { BUILD_LOGS } from "@/lib/build-logs-data";

const ACCENT = "#1a7a5e";
const ease = [0.16, 1, 0.3, 1] as const;

export function BuildLogsPage() {
  return (
    <div style={{ background: "#e4f2ec" }}>
      <section style={{ padding: "80px 0 56px" }}>
        <div className="mx-auto max-w-[1100px] px-8">
          <span
            className="inline-block rounded-[20px] px-3 py-1 text-[11px] font-semibold tracking-[0.10em]"
            style={{
              background: "rgba(26,122,94,0.09)",
              color: ACCENT,
              border: "1px solid rgba(26,122,94,0.20)",
            }}
          >
            BUILD IN PUBLIC
          </span>
          <EmphasisTitle
            title="Build Logs."
            className="mt-5 block font-bold text-[#0a3450]"
            leadClassName="text-[#0a3450]"
            emphasisClassName="text-[#1a4d6e]"
            style={{
              fontSize: "clamp(2.8rem, 5vw, 4rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          />
          <p className="mt-5 max-w-[480px] text-base leading-[1.7] text-[#4a6b82]">
            Week-by-week engineering decisions, shipped features, and lessons from
            the lab.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-[1100px] px-8">
          <div className="relative pl-6 sm:pl-0">
            <div
              className="absolute bottom-0 left-[11px] top-0 w-px sm:left-[103px]"
              style={{ background: "rgba(13,67,102,0.12)" }}
              aria-hidden
            />
            <ul className="space-y-10">
              {BUILD_LOGS.map((entry, i) => (
                <motion.li
                  key={entry.id}
                  className="relative flex flex-col gap-4 sm:flex-row sm:gap-6"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, ease, delay: i * 0.06 }}
                >
                  <div className="flex shrink-0 items-start gap-4 sm:w-[104px] sm:flex-col sm:items-end sm:gap-1 sm:pr-2 sm:text-right">
                    <div className="hidden sm:block">
                      <p className="text-xs font-medium text-[#4a6b82]">
                        {entry.date}
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.08em] text-[#4a6b82]/70">
                        {entry.weekLabel}
                      </p>
                    </div>
                    <span
                      className="relative z-[1] mt-1 h-2.5 w-2.5 shrink-0 rounded-full border-2 sm:absolute sm:left-[99px] sm:mt-1.5"
                      style={{
                        borderColor: ACCENT,
                        background: entry.isLatest ? ACCENT : "white",
                        boxShadow: entry.isLatest
                          ? "0 0 0 4px rgba(26,122,94,0.15)"
                          : undefined,
                      }}
                      aria-hidden
                    />
                    <p className="text-xs font-medium text-[#4a6b82] sm:hidden">
                      {entry.date} · {entry.weekLabel}
                    </p>
                  </div>

                  <div className="min-w-0 flex-1 rounded-[10px] border border-[rgba(13,67,102,0.09)] bg-white p-[18px_20px] shadow-[0_1px_3px_rgba(13,67,102,0.07)]">
                    <span
                      className="inline-block rounded-[20px] px-2.5 py-0.5 text-[10px] font-semibold"
                      style={{
                        background: "rgba(26,122,94,0.10)",
                        color: ACCENT,
                      }}
                    >
                      {entry.project}
                    </span>
                    <h3 className="mt-1.5 text-[0.95rem] font-semibold text-[#0a3450]">
                      {entry.title}
                    </h3>
                    <p className="mt-2 text-[0.875rem] leading-[1.65] text-[#4a6b82]">
                      {entry.body}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] text-[#4a6b82]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
