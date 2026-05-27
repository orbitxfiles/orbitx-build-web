"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  shuffleTeamMembers,
  TEAM_MEMBERS,
  type TeamMember,
} from "@/lib/team-data";
import { TeamMemberCard } from "@/components/about/team-member-card";

const ease = [0.16, 1, 0.3, 1] as const;

export function TeamGridShuffled() {
  const [members, setMembers] = useState<TeamMember[] | null>(null);

  useEffect(() => {
    setMembers(shuffleTeamMembers(TEAM_MEMBERS));
  }, []);

  if (!members) {
    return (
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM_MEMBERS.map((m) => (
          <div
            key={m.slug}
            className="h-[320px] animate-pulse rounded-xl border border-[rgba(13,67,102,0.06)] bg-white/60"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((member, i) => (
        <motion.div
          key={member.slug}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease, delay: i * 0.05 }}
        >
          <TeamMemberCard member={member} />
        </motion.div>
      ))}
    </div>
  );
}
