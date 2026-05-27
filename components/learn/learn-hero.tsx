import { LayoutGrid } from "lucide-react";
import { AcademyHeroVisual } from "@/components/learn/AcademyHeroVisual";

export function LearnHero({
  articleCount,
  topicCount,
}: {
  articleCount: number;
  topicCount: number;
}) {
  return (
    <section style={{ background: "#e8f1f5", padding: "80px 0 96px" }}>
      <div className="mx-auto grid max-w-[1100px] items-center gap-20 px-8 lg:grid-cols-[52%_48%]">
        <div>
          <span
            className="inline-flex items-center gap-1.5 rounded-[20px] px-3 py-1 text-[11px] font-medium tracking-[0.08em]"
            style={{
              background: "rgba(107,79,160,0.10)",
              color: "#6b4fa0",
              border: "1px solid rgba(107,79,160,0.20)",
            }}
          >
            <LayoutGrid className="h-3 w-3" aria-hidden />
            LEARNING ECOSYSTEM
          </span>

          <h1 className="mt-4" style={{ letterSpacing: "-0.03em", lineHeight: 1 }}>
            <span
              className="block font-bold text-[#0a3450]"
              style={{ fontSize: "clamp(2.8rem, 5vw, 4rem)" }}
            >
              OrbitX
            </span>
            <span
              className="mt-1 block text-[#0a3450]"
              style={{
                fontSize: "clamp(2.8rem, 5vw, 4rem)",
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              Academy.
            </span>
          </h1>

          <p
            className="mt-5 max-w-[380px] text-base leading-[1.7] text-[#4a6b82]"
          >
            Deep-dive engineering tutorials, architecture diagrams, and
            implementation guides for building reliable AI systems.
          </p>

          <div className="mt-8 flex flex-wrap items-center text-xs font-medium text-[#4a6b82]">
            <span>{articleCount} Articles</span>
            <span
              className="mx-3 inline-block h-3 w-px"
              style={{ background: "rgba(13,67,102,0.15)" }}
              aria-hidden
            />
            <span>{topicCount} Topics</span>
            <span
              className="mx-3 inline-block h-3 w-px"
              style={{ background: "rgba(13,67,102,0.15)" }}
              aria-hidden
            />
            <span>Updated weekly</span>
          </div>
        </div>

        <AcademyHeroVisual />
      </div>
    </section>
  );
}
