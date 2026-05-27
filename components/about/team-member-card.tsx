"use client";

import Link from "next/link";
import type { TeamMember } from "@/lib/team-data";
import { TeamAvatar } from "@/components/about/team-avatar";
import { TeamSocialLinks } from "@/components/about/team-social-links";

export function TeamMemberCard({ member }: { member: TeamMember }) {
  const roleShort = member.role.split(" · ")[1] ?? member.role;

  return (
    <article className="flex h-full flex-col rounded-xl border border-[rgba(13,67,102,0.09)] bg-white p-6 text-center">
      <div className="flex justify-center">
        <TeamAvatar member={member} size="lg" />
      </div>
      <h3 className="mt-5 text-[15px] font-semibold text-[#0a3450]">{member.name}</h3>
      <p className="mt-1 text-[12px] font-medium text-[#1a7a5e]">{roleShort}</p>
      <p className="mt-3 flex-1 text-[13px] leading-relaxed text-[#4a6b82]">
        {member.tagline}
      </p>

      <div className="mt-5 flex justify-center">
        <TeamSocialLinks member={member} />
      </div>

      <Link
        href={`/about/${member.slug}`}
        className="mt-5 inline-flex w-full items-center justify-center rounded-lg border border-[rgba(13,67,102,0.18)] bg-[#f0f5f8] px-4 py-2.5 text-[13px] font-semibold text-[#0a3450] transition-colors hover:border-[rgba(13,67,102,0.3)] hover:bg-white"
      >
        View more
      </Link>
    </article>
  );
}
