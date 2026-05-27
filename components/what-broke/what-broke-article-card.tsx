"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import type { Article } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export function WhatBrokeArticleCard({
  article,
  index = 0,
}: {
  article: Article;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.38, ease, delay: index * 0.07 }}
    >
      <Link href={`/learn/${article.slug}`} className="group block h-full">
        <Card className="relative flex h-full flex-col overflow-hidden rounded-[12px]">
          <span className="absolute right-3.5 top-3.5 z-10 text-[13px] text-[#8b3a3a] opacity-0 transition-all duration-[180ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100">
            ↗
          </span>
          <div className="relative h-[160px] overflow-hidden bg-[#f5e8e8]">
            <div className="flex h-full items-center justify-center transition-transform duration-[400ms] ease-out group-hover:scale-[1.04]">
              <svg viewBox="0 0 200 80" className="w-[70%]" aria-hidden>
                <rect x={10} y={28} width={50} height={24} rx={12} fill="rgba(139,58,58,0.12)" stroke="rgba(139,58,58,0.30)" />
                <line x1={62} y1={40} x2={78} y2={40} stroke="rgba(139,58,58,0.35)" strokeDasharray="4 3" />
                <line x1={82} y1={32} x2={94} y2={48} stroke="rgba(139,58,58,0.55)" />
                <line x1={82} y1={48} x2={94} y2={32} stroke="rgba(139,58,58,0.55)" />
                <rect x={98} y={28} width={50} height={24} rx={12} fill="white" stroke="rgba(139,58,58,0.25)" />
                <line x1={150} y1={40} x2={166} y2={40} stroke="rgba(139,58,58,0.25)" />
                <rect x={170} y={28} width={24} height={24} rx={12} fill="rgba(139,58,58,0.12)" stroke="rgba(139,58,58,0.30)" />
              </svg>
            </div>
            <span
              className="absolute right-2.5 top-2.5 rounded-[20px] px-2 py-0.5 text-[10px] font-semibold tracking-[0.08em]"
              style={{
                background: "rgba(139,58,58,0.12)",
                color: "#8b3a3a",
              }}
            >
              WHAT BROKE
            </span>
          </div>
          <div className="flex flex-1 flex-col p-[18px_20px_20px]">
            <div className="flex items-center gap-2 text-[11px] text-[#4a6b82]">
              <Clock className="h-3 w-3" />
              {article.reading_time ?? 6} min read
            </div>
            <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-snug text-[#0a3450]">
              {article.title}
            </h3>
            <p className="mt-1.5 line-clamp-2 text-[0.875rem] leading-relaxed text-[#4a6b82]">
              {article.excerpt}
            </p>
            <div className="mt-auto flex items-center justify-between pt-3.5 text-[11px] text-[#4a6b82]">
              <span>OrbitX</span>
              <span>{formatDate(article.created_at)}</span>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
