"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Download } from "lucide-react";
import type { TeamMember } from "@/lib/team-data";
import { TeamAvatar } from "@/components/about/team-avatar";
import { TeamSocialLinks } from "@/components/about/team-social-links";

const ease = [0.16, 1, 0.3, 1] as const;

export function MemberResumePageContent({ member }: { member: TeamMember }) {
  const roleShort = member.role.split(" · ")[0];

  return (
    <div className="bg-[#f4f7f9] min-h-screen">
      <div className="border-b border-[rgba(13,67,102,0.08)] bg-white">
        <div className="mx-auto max-w-[820px] px-8 py-10">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#4a6b82] hover:text-[#0a3450]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to About
          </Link>

          <motion.div
            className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            <TeamAvatar member={member} size="xl" />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6a8fa8]">
                Profile · Recruiters
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0a3450]">
                {member.name}
              </h1>
              <p className="mt-1 text-[15px] font-medium text-[#1a7a5e]">
                {member.role}
              </p>
              <p
                className="mt-4 text-[17px] italic leading-snug text-[#3d5a72]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {member.tagline}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <TeamSocialLinks member={member} />
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0a3450] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#0d4366]"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden />
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-[820px] px-8 py-12">
        <ResumeSection title="Summary">
          <p className="text-[15px] leading-[1.8] text-[#3d5a72]">
            {member.recruiterSummary}
          </p>
          <p className="mt-4 rounded-lg border border-[rgba(26,122,94,0.2)] bg-[rgba(26,122,94,0.06)] px-4 py-3 text-[13px] font-medium text-[#1a5c47]">
            {member.openTo}
          </p>
        </ResumeSection>

        <ResumeSection title="Experience">
          <div className="space-y-8">
            {member.experience.map((exp) => (
              <div key={`${exp.org}-${exp.title}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[15px] font-semibold text-[#0a3450]">
                    {exp.title}
                  </h3>
                  <span className="text-[12px] text-[#6a8fa8]">{exp.period}</span>
                </div>
                <p className="text-[14px] font-medium text-[#4a6b82]">{exp.org}</p>
                <ul className="mt-3 space-y-2">
                  {exp.bullets.map((b) => (
                    <li
                      key={b}
                      className="text-[14px] leading-relaxed text-[#4a6b82] before:mr-2 before:font-bold before:text-[#1a7a5e] before:content-['•']"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection title="Core strengths">
          <ul className="space-y-2">
            {member.highlights.map((h) => (
              <li
                key={h}
                className="text-[14px] text-[#4a6b82] before:mr-2 before:text-[#1a7a5e] before:content-['•']"
              >
                {h}
              </li>
            ))}
          </ul>
        </ResumeSection>

        <ResumeSection title="Skills">
          <div className="flex flex-wrap gap-2">
            {member.focus.map((f) => (
              <span
                key={f}
                className="rounded-md border border-[rgba(13,67,102,0.12)] bg-white px-3 py-1.5 text-[13px] font-medium text-[#0a3450]"
              >
                {f}
              </span>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection title="Education">
          <p className="text-[14px] text-[#4a6b82]">{member.education}</p>
        </ResumeSection>

        <ResumeSection title="About">
          <p className="text-[14px] leading-[1.8] text-[#4a6b82]">{member.bio}</p>
          <p className="mt-4 text-[12px] text-[#6a8fa8]">
            Part of{" "}
            <Link href="/about/team" className="font-medium text-[#0a3450] hover:underline">
              OrbitX
            </Link>{" "}
            — {roleShort}
          </p>
        </ResumeSection>
      </div>
    </div>
  );
}

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      className="mb-10 rounded-xl border border-[rgba(13,67,102,0.08)] bg-white p-8"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease }}
    >
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6a8fa8]">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </motion.section>
  );
}
