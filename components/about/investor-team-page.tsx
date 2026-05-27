"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ImageIcon } from "lucide-react";
import {
  ORBITX_INVESTOR,
  ORBITX_ORIGIN,
  TEAM_MEMBERS,
} from "@/lib/team-data";

const ease = [0.16, 1, 0.3, 1] as const;

export function InvestorTeamPageContent() {
  return (
    <div className="bg-[#0a1f2e] text-[#e8f1f5]">
      <section className="border-b border-white/10 px-8 py-14">
        <div className="mx-auto max-w-[1100px]">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#8eb4cc] hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            About OrbitX
          </Link>
          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5a9ab8]">
            For investors & partners
          </p>
          <h1
            className="mt-4 max-w-[720px] font-bold text-white"
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
            }}
          >
            {ORBITX_INVESTOR.headline}
          </h1>
          <p className="mt-5 max-w-[640px] text-[1rem] leading-[1.75] text-[#a8c8dc]">
            {ORBITX_INVESTOR.subtitle}
          </p>
        </div>
      </section>

      <section className="px-8 py-16">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-6 md:grid-cols-3">
            {ORBITX_INVESTOR.thesis.map((item, i) => (
              <motion.div
                key={item.title}
                className="rounded-xl border border-white/10 bg-white/5 p-7"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease, delay: i * 0.06 }}
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#5a9ab8]">
                  {item.title}
                </h3>
                <p className="mt-4 text-[14px] leading-[1.75] text-[#c5dce8]">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/5 px-8 py-16">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="text-xl font-semibold text-white">Traction snapshot</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {ORBITX_INVESTOR.traction.map((t, i) => (
              <motion.div
                key={t.label}
                className="rounded-xl border border-white/10 bg-[#0a1f2e] p-6 text-center"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: i * 0.05 }}
              >
                <p className="text-4xl font-bold text-[#4ec9a0]">{t.metric}</p>
                <p className="mt-2 text-[13px] text-[#8eb4cc]">{t.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-16">
        <div className="mx-auto max-w-[1100px] lg:grid lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-xl font-semibold text-white">Business model</h2>
            <ul className="mt-6 space-y-4">
              {ORBITX_INVESTOR.model.map((m) => (
                <li
                  key={m}
                  className="flex gap-3 text-[14px] leading-relaxed text-[#c5dce8]"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4ec9a0]" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Roadmap</h2>
            <div className="mt-6 space-y-8">
              {ORBITX_INVESTOR.roadmap.map((phase) => (
                <div key={phase.phase}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5a9ab8]">
                    {phase.phase}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {phase.items.map((item) => (
                      <li
                        key={item}
                        className="text-[14px] text-[#c5dce8] before:mr-2 before:text-[#4ec9a0] before:content-['→']"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-8 py-20">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5a9ab8]">
            Origin story
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            {ORBITX_ORIGIN.title}
          </h2>
          <p className="mt-4 max-w-[720px] text-[15px] leading-[1.8] text-[#a8c8dc]">
            {ORBITX_ORIGIN.subtitle}
          </p>

          <div className="mt-14 space-y-14">
            {ORBITX_ORIGIN.chapters.map((chapter, i) => (
              <article
                key={chapter.title}
                className="grid gap-8 lg:grid-cols-2 lg:items-center"
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#4ec9a0]">
                    Chapter {i + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {chapter.title}
                  </h3>
                  <p className="mt-4 text-[14px] leading-[1.8] text-[#a8c8dc]">
                    {chapter.body}
                  </p>
                </div>
                <div
                  className={`flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/5 ${i % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <div className="px-6 text-center">
                    <ImageIcon className="mx-auto h-8 w-8 text-[#5a7a8f]" />
                    <p className="mt-3 text-[12px] text-[#6a8fa8]">
                      {chapter.imageLabel}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-8 py-16">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="text-xl font-semibold text-white">Founding team</h2>
          <p className="mt-3 max-w-[560px] text-[14px] text-[#a8c8dc]">
            Four technical co-founders. Individual recruiter profiles live on the
            main About page.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {TEAM_MEMBERS.map((m) => (
              <li
                key={m.slug}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-5 py-4"
              >
                <div>
                  <p className="font-medium text-white">{m.name}</p>
                  <p className="text-[12px] text-[#8eb4cc]">{m.role}</p>
                </div>
                <Link
                  href={`/about/${m.slug}`}
                  className="text-[12px] font-medium text-[#4ec9a0] hover:text-white"
                >
                  Profile →
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 rounded-xl border border-[#4ec9a0]/30 bg-[#4ec9a0]/10 p-8">
            <p className="text-lg font-semibold text-white">
              Interested in partnering?
            </p>
            <p className="mt-2 text-[14px] text-[#c5dce8]">
              Reach out via LinkedIn on any founder profile, or email{" "}
              <span className="text-[#4ec9a0]">hello@orbitx.dev</span> (placeholder).
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-[#4ec9a0] hover:text-white"
            >
              Meet the team on About
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
