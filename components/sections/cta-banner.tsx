"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

export function CtaBanner() {
  return (
    <section className="bg-[#e8f1f5] py-[96px]">
      <div className="mx-auto max-w-[1100px] px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card
            className="mx-auto max-w-[800px] px-[48px] py-[72px] text-center"
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(26,122,94,0.07) 0%, transparent 60%)",
              }}
            />

            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                color: "#0a3450",
                fontWeight: 400,
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                position: "relative",
              }}
            >
              Less hype. More systems that work.
            </p>

            <p
              className="relative mx-auto mt-[16px] text-[0.9rem] text-[#4a6b82]"
              style={{ maxWidth: 480, lineHeight: 1.65 }}
            >
              Follow the lab — engineering notes, open builds, honest postmortems.
            </p>

            <div className="relative mt-[36px]">
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-[8px] bg-[#0a3450] px-[22px] py-[10px] text-[0.9rem] font-medium text-white transition-colors duration-[200ms] ease"
              >
                About OrbitX →
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
