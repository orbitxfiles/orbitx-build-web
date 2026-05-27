"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

function splitTitleEmphasis(title: string): { lead: string; emphasis?: string } {
  const words = title.trim().split(/\s+/);
  if (words.length < 2) return { lead: title };
  const emphasis = words.pop()!;
  return { lead: words.join(" "), emphasis };
}

export function HomeSection({
  variant,
  label,
  title,
  description,
  children,
}: {
  variant: "odd" | "even";
  label?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const bg = variant === "odd" ? "#e8f1f5" : "#f0f5f8";
  const { lead, emphasis } = splitTitleEmphasis(title);

  return (
    <section className="py-[96px]" style={{ background: bg }}>
      <div className="mx-auto max-w-[1100px] px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease }}
        >
          {label && (
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4a6b82]">
              {label}
            </p>
          )}
          <h2
            className="font-semibold text-[#0a3450]"
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              lineHeight: 1.2,
              fontWeight: 600,
              marginBottom: description ? 12 : 0,
            }}
          >
            {lead}
            {emphasis ? (
              <>
                {" "}
                <em
                  className="font-normal not-italic"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  {emphasis}
                </em>
              </>
            ) : null}
          </h2>
          {description && (
            <p className="mb-12 max-w-[520px] text-[1rem] leading-[1.65] text-[#4a6b82]">
              {description}
            </p>
          )}
        </motion.div>

        <div className={description ? "" : "mt-12"}>{children}</div>
      </div>
    </section>
  );
}
