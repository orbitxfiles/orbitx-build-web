"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

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

  return (
    <section
      className="py-[96px]"
      style={{
        background: bg,
      }}
    >
      <div className="mx-auto max-w-[1100px] px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease }}
        >
          {label && (
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#4a6b82] mb-[12px]">
              {label}
            </p>
          )}
          <h2
            className="font-semibold"
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              color: "#0a3450",
              lineHeight: 1.2,
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            {title}
          </h2>
          {description && (
            <p
              className="text-[1rem] text-[#4a6b82] leading-[1.65]"
              style={{
                maxWidth: 520,
                marginBottom: 48,
              }}
            >
              {description}
            </p>
          )}
        </motion.div>

        <div className={description ? "" : "mt-12"}>{children}</div>
      </div>
    </section>
  );
}

