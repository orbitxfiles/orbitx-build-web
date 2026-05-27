import { Github, Linkedin } from "lucide-react";
import type { TeamMember } from "@/lib/team-data";

export function TeamSocialLinks({ member }: { member: TeamMember }) {
  return (
    <div className="flex items-center gap-2">
      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${member.name} on LinkedIn`}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(13,67,102,0.12)] bg-white text-[#4a6b82] transition-colors hover:border-[rgba(13,67,102,0.25)] hover:text-[#0a3450]"
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <a
        href={member.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${member.name} on GitHub`}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(13,67,102,0.12)] bg-white text-[#4a6b82] transition-colors hover:border-[rgba(13,67,102,0.25)] hover:text-[#0a3450]"
      >
        <Github className="h-4 w-4" />
      </a>
    </div>
  );
}
