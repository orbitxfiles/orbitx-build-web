import { EmphasisTitle } from "@/components/typography/emphasis-title";

function BrokenPipelineVisual() {
  return (
    <div
      className="rounded-[14px] border border-[rgba(13,67,102,0.10)] bg-[rgba(255,255,255,0.85)] p-6 shadow-[0_8px_40px_rgba(13,67,102,0.10)] backdrop-blur-[8px]"
    >
      <svg viewBox="0 0 320 120" className="w-full max-w-[320px]" aria-hidden>
        <rect
          x={20}
          y={44}
          width={72}
          height={32}
          rx={16}
          fill="white"
          stroke="rgba(13,67,102,0.18)"
        />
        <text x={38} y={64} fontSize={11} fill="#0a3450" fontWeight={500}>
          Ingest
        </text>
        <line
          x1={92}
          y1={60}
          x2={118}
          y2={60}
          stroke="rgba(139,58,58,0.40)"
          strokeWidth={2}
          strokeDasharray="6 4"
        />
        <line x1={128} y1={48} x2={148} y2={72} stroke="rgba(139,58,58,0.60)" strokeWidth={2} />
        <line x1={128} y1={72} x2={148} y2={48} stroke="rgba(139,58,58,0.60)" strokeWidth={2} />
        <line
          x1={158}
          y1={60}
          x2={184}
          y2={60}
          stroke="rgba(139,58,58,0.40)"
          strokeWidth={2}
          strokeDasharray="6 4"
        />
        <rect
          x={124}
          y={44}
          width={72}
          height={32}
          rx={16}
          fill="#f5e8e8"
          stroke="rgba(139,58,58,0.35)"
        />
        <text x={136} y={64} fontSize={11} fill="#8b3a3a" fontWeight={600}>
          Failed
        </text>
        <rect
          x={228}
          y={44}
          width={72}
          height={32}
          rx={16}
          fill="white"
          stroke="rgba(13,67,102,0.18)"
        />
        <text x={244} y={64} fontSize={11} fill="#0a3450" fontWeight={500}>
          Output
        </text>
      </svg>
    </div>
  );
}

export function WhatBrokeHero() {
  return (
    <section style={{ background: "#f5e8e8", padding: "80px 0 64px" }}>
      <div className="mx-auto grid max-w-[1100px] items-center gap-16 px-8 lg:grid-cols-[52%_48%]">
        <div>
          <span
            className="inline-block rounded-[20px] px-3 py-1 text-[11px] font-semibold tracking-[0.10em]"
            style={{
              background: "rgba(139,58,58,0.09)",
              color: "#8b3a3a",
              border: "1px solid rgba(139,58,58,0.20)",
            }}
          >
            POST-MORTEMS
          </span>
          <EmphasisTitle
            title="What Broke."
            className="mt-5 block font-bold text-[#0a3450]"
            leadClassName="text-[#0a3450]"
            emphasisClassName="text-[#0a3450]"
            style={{
              fontSize: "clamp(2.8rem, 5vw, 4rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          />
          <p className="mt-5 max-w-[420px] text-base leading-[1.7] text-[#4a6b82]">
            Honest post-mortems. What failed, why it failed, and what we changed.
          </p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <BrokenPipelineVisual />
        </div>
      </div>
    </section>
  );
}
