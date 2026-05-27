"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/types";
import { getProjectAccent } from "@/lib/project-mermaid";
import { Card } from "@/components/ui/Card";

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const ease = [0.16, 1, 0.3, 1] as const;
  const accent = getProjectAccent(project);
  const thumbBg = `${accent}18`;
  const dotColor = `${accent}59`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.45,
        ease,
        delay: index * 0.07,
      }}
    >
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <Card className="h-full">
          <div
            className="relative h-[200px] overflow-hidden"
            style={{
              backgroundColor: thumbBg,
              backgroundImage: `radial-gradient(${dotColor} 1.5px, transparent 1.5px)`,
              backgroundSize: "18px 18px",
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-[12px] text-sm font-bold text-white"
                style={{ background: accent }}
              >
                {project.iconLabel?.trim() || project.title.charAt(0)}
              </span>
              <span
                className="mt-3 text-[11px] font-semibold uppercase tracking-[0.08em]"
                style={{ color: accent }}
              >
                {project.title}
              </span>
            </div>
          </div>

          <div className="px-[24px] py-[20px]">
            <div className="flex items-center justify-end gap-[10px]">
              <span
                className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-[0.10em]"
                style={{
                  background: thumbBg,
                  color: accent,
                }}
              >
                {project.status.toUpperCase()}
              </span>
              <span className="text-[14px]" style={{ color: accent }}>
                ↗
              </span>
            </div>

            <h3
              className="mt-4 font-semibold text-[var(--text-strong)]"
              style={{
                fontSize: "1.1rem",
                lineHeight: 1.25,
              }}
            >
              {project.title}
            </h3>
            <p
              className="mt-1 text-[0.875rem] leading-[1.6] text-[var(--text-muted)]"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {project.tagline}
            </p>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
