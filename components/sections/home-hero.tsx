"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const ease = [0.16, 1, 0.3, 1] as const;

const PILLARS = [
  { label: "Projects", value: "Open builds" },
  { label: "Academy", value: "Deep tutorials" },
  { label: "Post-mortems", value: "Honest failures" },
];

export function HomeHero() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-hands.png"
          alt=""
          fill
          priority
          className="object-cover object-[65%_center]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              105deg,
              rgba(255, 255, 255, 0.96) 0%,
              rgba(255, 255, 255, 0.9) 26%,
              rgba(232, 241, 245, 0.6) 46%,
              rgba(232, 241, 245, 0.15) 66%,
              transparent 100%
            )`,
          }}
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-24"
          style={{
            background:
              "linear-gradient(to top, #e8f1f5 0%, transparent 100%)",
          }}
          aria-hidden
        />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-[1200px] flex-col justify-center px-8 py-20 lg:py-24">
        <div className="w-full max-w-[560px]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0, ease }}
          >
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em]"
              style={{
                borderColor: "rgba(13, 67, 102, 0.14)",
                background: "rgba(255, 255, 255, 0.78)",
                color: "#4a6b82",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "#1a7a5e" }}
                aria-hidden
              />
              AI engineering lab · India
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease }}
            className="mt-6 font-bold text-[#0a3450]"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 3.75rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
            }}
          >
            Building reliable
            <br />
            AI systems{" "}
            <em
              className="font-normal not-italic"
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              publicly.
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease }}
            className="mt-5 max-w-[460px] text-[1.05rem] leading-[1.7] text-[#3d5a72]"
          >
            Architecture, code, failures, and tutorials from a team that ships in
            the open — less hype, more systems that work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0a3450] px-6 py-2.5 text-[0.9rem] font-semibold text-white shadow-[0_4px_14px_rgba(10,52,80,0.22)] transition-all duration-200 hover:bg-[#0d4366] hover:shadow-[0_6px_20px_rgba(10,52,80,0.28)]"
            >
              Explore Projects
              <span aria-hidden>↗</span>
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center justify-center rounded-lg border border-[rgba(13,67,102,0.22)] bg-[rgba(255,255,255,0.7)] px-6 py-2.5 text-[0.9rem] font-semibold text-[#0d4366] backdrop-blur-sm transition-all duration-200 hover:border-[rgba(13,67,102,0.38)] hover:bg-white"
            >
              Read Docs
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease }}
          className="mt-16 flex flex-wrap gap-8 border-t border-[rgba(13,67,102,0.1)] pt-8"
        >
          {PILLARS.map((p) => (
            <div key={p.label}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6a8fa8]">
                {p.label}
              </p>
              <p className="mt-1 text-[14px] font-medium text-[#0a3450]">
                {p.value}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
