"use client";

import { motion } from "framer-motion";
import { Check, Cpu, FileText, Globe } from "lucide-react";
const ease = [0.16, 1, 0.3, 1] as const;

const MISSION = [
  {
    icon: Cpu,
    color: "#1a7a5e",
    title: "What we build",
    body: "Agentic systems, RAG pipelines, and voice interfaces — documented end-to-end with architecture and code.",
  },
  {
    icon: FileText,
    color: "#6b4fa0",
    title: "How we work",
    body: "Every decision gets a write-up. Failures become post-mortems. Nothing ships without a diagram.",
  },
  {
    icon: Globe,
    color: "#2d5fa0",
    title: "Why public",
    body: "The best way to learn AI engineering is to watch someone build for real — not a polished demo reel.",
  },
];

const VALUES = [
  "Engineering over hype",
  "Documentation as a first-class output",
  "Open source by default",
  "Indian AI ecosystem",
];

const STATS = [
  { value: "2", label: "Projects" },
  { value: "9+", label: "Articles" },
  { value: "100%", label: "Built in public" },
  { value: "Open", label: "By default" },
];

export function AboutPageContent() {
  return (
    <div className="bg-[#e8f1f5]">
      <section className="px-8 text-center" style={{ padding: "96px 0 80px" }}>
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4a6b82]">
            THE LAB
          </p>
          <h1
            className="mx-auto mt-4 max-w-[640px] font-bold text-[#0a3450]"
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
            }}
          >
            A public AI engineering lab.{" "}
            <em
              className="font-normal not-italic text-[#1a4d6e]"
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
              }}
            >
              Building in the open.
            </em>
          </h1>
          <p className="mx-auto mt-5 max-w-[500px] text-base leading-[1.7] text-[#4a6b82]">
            OrbitX documents real AI systems — the architecture, the failures, and
            the lessons. No hype. Just builds.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto grid max-w-[1100px] gap-6 px-8 md:grid-cols-3">
          {MISSION.map((item, i) => (
            <motion.div
              key={item.title}
              className="rounded-xl border border-[rgba(13,67,102,0.09)] bg-white p-7"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease, delay: i * 0.08 }}
            >
              <item.icon className="h-8 w-8" style={{ color: item.color }} />
              <h3 className="mt-4 text-base font-semibold text-[#0a3450]">
                {item.title}
              </h3>
              <p className="mt-2 text-[0.875rem] leading-[1.7] text-[#4a6b82]">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-[1100px] gap-12 px-8 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-xl font-semibold text-[#0a3450]">The lab</h2>
            <p className="mt-4 text-[0.95rem] leading-[1.75] text-[#4a6b82]">
              OrbitX is a small AI engineering lab based in India. We build agentic
              systems, document every decision, and share everything publicly.
            </p>
            <ul className="mt-8 space-y-3">
              {VALUES.map((v) => (
                <li
                  key={v}
                  className="flex items-start gap-2.5 text-[0.875rem] text-[#4a6b82]"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#1a7a5e]"
                    aria-hidden
                  />
                  {v}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="rounded-xl border border-[rgba(13,67,102,0.09)] bg-white p-6 text-center"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: i * 0.06 }}
              >
                <p
                  className="font-bold text-[#1a7a5e]"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                >
                  {stat.value}
                </p>
                <p className="mt-1 text-[13px] text-[#4a6b82]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
