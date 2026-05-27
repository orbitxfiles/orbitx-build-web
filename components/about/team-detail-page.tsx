"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ImageIcon } from "lucide-react";
import { ORBITX_ORIGIN, TEAM_MEMBERS } from "@/lib/team-data";
import { TeamAvatar } from "@/components/about/team-avatar";
import { TeamSocialLinks } from "@/components/about/team-social-links";

const ease = [0.16, 1, 0.3, 1] as const;

export function TeamDetailPageContent() {
  return (
    <div className="bg-[#e8f1f5]">
      <section className="border-b border-[rgba(13,67,102,0.08)] bg-white/60 px-8 py-12 backdrop-blur-sm">
        <div className="mx-auto max-w-[1100px]">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#4a6b82] transition-colors hover:text-[#0a3450]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            About OrbitX
          </Link>
          <h1
            className="mt-6 font-bold text-[#0a3450]"
            style={{
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
            }}
          >
            Meet the team behind{" "}
            <em
              className="font-normal not-italic text-[#1a4d6e]"
              style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
            >
              OrbitX.
            </em>
          </h1>
          <p className="mt-4 max-w-[620px] text-[1rem] leading-[1.75] text-[#4a6b82]">
            Resumes in plain language — who we are, what we ship, and where to
            find us. Social links live here only; the main About page stays focused
            on the lab.
          </p>
        </div>
      </section>

      <section className="px-8 py-20">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4a6b82]">
            ORIGIN
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[#0a3450]">
            {ORBITX_ORIGIN.title}
          </h2>
          <p className="mt-4 max-w-[720px] text-[0.95rem] leading-[1.8] text-[#4a6b82]">
            {ORBITX_ORIGIN.subtitle}
          </p>

          <div className="mt-14 space-y-16">
            {ORBITX_ORIGIN.chapters.map((chapter, i) => (
              <motion.article
                key={chapter.title}
                className="grid gap-8 lg:grid-cols-2 lg:items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease, delay: i * 0.05 }}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#1a7a5e]">
                    Chapter {i + 1}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-[#0a3450]">
                    {chapter.title}
                  </h3>
                  <p className="mt-4 text-[0.925rem] leading-[1.8] text-[#4a6b82]">
                    {chapter.body}
                  </p>
                </div>
                <div
                  className={`flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-[rgba(13,67,102,0.18)] bg-white/80 ${i % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <div className="px-6 text-center">
                    <ImageIcon
                      className="mx-auto h-8 w-8 text-[#a8c0d4]"
                      aria-hidden
                    />
                    <p className="mt-3 text-[12px] text-[#6a8fa8]">
                      {chapter.imageLabel}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(13,67,102,0.08)] px-8 py-20">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4a6b82]">
            PEOPLE
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[#0a3450]">
            The builders
          </h2>

          <div className="mt-12 space-y-10">
            {TEAM_MEMBERS.map((member, i) => (
              <motion.article
                key={member.slug}
                id={member.slug}
                className="scroll-mt-24 rounded-xl border border-[rgba(13,67,102,0.09)] bg-white p-8 md:p-10"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, ease, delay: i * 0.04 }}
              >
                <div className="flex flex-col gap-8 md:flex-row md:items-start">
                  <TeamAvatar member={member} size="xl" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-[#0a3450]">
                          {member.name}
                        </h3>
                        <p className="mt-1 text-[14px] font-medium text-[#1a7a5e]">
                          {member.role}
                        </p>
                        <p
                          className="mt-3 text-[15px] italic text-[#3d5a72]"
                          style={{ fontFamily: "var(--font-serif)" }}
                        >
                          {member.tagline}
                        </p>
                      </div>
                      <TeamSocialLinks member={member} />
                    </div>

                    <p className="mt-6 text-[0.925rem] leading-[1.8] text-[#4a6b82]">
                      {member.bio}
                    </p>

                    <div className="mt-8 grid gap-8 sm:grid-cols-2">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#4a6b82]">
                          Highlights
                        </p>
                        <ul className="mt-3 space-y-2">
                          {member.highlights.map((h) => (
                            <li
                              key={h}
                              className="text-[13px] leading-relaxed text-[#4a6b82] before:mr-2 before:text-[#1a7a5e] before:content-['·']"
                            >
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#4a6b82]">
                          Focus
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {member.focus.map((f) => (
                            <span
                              key={f}
                              className="rounded-full border border-[rgba(13,67,102,0.12)] bg-[#f0f5f8] px-3 py-1 text-[12px] text-[#3d5a72]"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
