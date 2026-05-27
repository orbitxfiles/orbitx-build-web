"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

function TerminalLayer() {
  return (
    <motion.div
      className="absolute bottom-0 right-0 z-[1] w-[320px] overflow-hidden rounded-[14px] border border-[rgba(255,255,255,0.08)] bg-[#0d1f2d] shadow-[0_20px_60px_rgba(13,67,102,0.20)]"
      style={{ transform: "rotate(3deg) translateY(20px) translateX(10px)" }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay: 0.15 }}
    >
      <div className="flex h-[34px] items-center gap-1.5 border-b border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.05)] px-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-auto font-mono text-[11px] text-[rgba(255,255,255,0.25)]">
          architecture.py
        </span>
      </div>
      <div className="space-y-0 p-4 font-mono text-[11px] leading-[1.8]">
        <p>
          <span className="text-[#c792ea]">from</span>{" "}
          <span className="text-[#c8d8e8]">orbitx.rag</span>{" "}
          <span className="text-[#c792ea]">import</span>{" "}
          <span className="text-[#c8d8e8]">Pipeline</span>
        </p>
        <p className="text-[#546e7a]"># Initialize retrieval chain</p>
        <p className="h-2" />
        <p className="text-[#c8d8e8]">pipeline = Pipeline(</p>
        <p className="pl-4 text-[#c8d8e8]">
          <span className="text-[#80cbc4]">model</span>=
          <span className="text-[#9ecbff]">&quot;gemini-flash&quot;</span>,
        </p>
        <p className="pl-4 text-[#c8d8e8]">
          <span className="text-[#80cbc4]">retriever</span>=VectorStore(
          <span className="text-[#9ecbff]">&quot;docs&quot;</span>),
        </p>
        <p className="pl-4 text-[#c8d8e8]">
          <span className="text-[#80cbc4]">max_tokens</span>=
          <span className="text-[#f78c6c]">512</span>
        </p>
        <p className="text-[#c8d8e8]">
          )<span className="hero-cursor-blink ml-0.5 inline-block h-3.5 w-0.5 bg-[rgba(255,255,255,0.6)] align-middle" />
        </p>
      </div>
    </motion.div>
  );
}

function ArticlePreviewLayer() {
  return (
    <motion.div
      className="absolute left-0 top-0 z-[2] w-[300px] rounded-[14px] border border-[rgba(13,67,102,0.12)] bg-[rgba(255,255,255,0.92)] p-5 shadow-[0_16px_48px_rgba(13,67,102,0.13),0_4px_12px_rgba(13,67,102,0.07)] backdrop-blur-[12px]"
      style={{ transform: "rotate(-1.5deg)" }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <span
          className="rounded-[20px] px-2 py-0.5 text-[10px] font-semibold tracking-[0.08em]"
          style={{
            background: "rgba(107,79,160,0.10)",
            color: "#6b4fa0",
            border: "1px solid rgba(107,79,160,0.20)",
          }}
        >
          AGENTS
        </span>
        <span className="text-[11px] text-[#4a6b82]">5 min read</span>
      </div>
      <div className="mt-3.5 space-y-2">
        <div className="h-[13px] w-[88%] rounded-[3px] bg-[rgba(10,52,80,0.14)]" />
        <div className="h-[13px] w-[62%] rounded-[3px] bg-[rgba(10,52,80,0.09)]" />
      </div>
      <svg
        className="mt-4 w-full"
        viewBox="0 0 240 48"
        height={48}
        aria-hidden
      >
        <rect
          x={10}
          y={14}
          width={56}
          height={20}
          rx={10}
          fill="rgba(107,79,160,0.12)"
          stroke="rgba(107,79,160,0.30)"
        />
        <text x={22} y={28} fontSize={9} fill="#5a3d8a">
          Query
        </text>
        <line
          x1={68}
          y1={24}
          x2={82}
          y2={24}
          stroke="rgba(107,79,160,0.25)"
          strokeWidth={1.5}
        />
        <polygon points="82,24 76,21 76,27" fill="rgba(107,79,160,0.25)" />
        <circle r={2.5} fill="#6b4fa0">
          <animateMotion
            dur="1.6s"
            repeatCount="indefinite"
            path="M68,24 L82,24"
          />
        </circle>
        <rect
          x={86}
          y={14}
          width={56}
          height={20}
          rx={10}
          fill="rgba(107,79,160,0.12)"
          stroke="rgba(107,79,160,0.30)"
        />
        <text x={102} y={28} fontSize={9} fill="#5a3d8a">
          LLM
        </text>
        <line
          x1={144}
          y1={24}
          x2={158}
          y2={24}
          stroke="rgba(107,79,160,0.25)"
          strokeWidth={1.5}
        />
        <polygon points="158,24 152,21 152,27" fill="rgba(107,79,160,0.25)" />
        <rect
          x={162}
          y={14}
          width={56}
          height={20}
          rx={10}
          fill="rgba(107,79,160,0.12)"
          stroke="rgba(107,79,160,0.30)"
        />
        <text x={172} y={28} fontSize={9} fill="#5a3d8a">
          Output
        </text>
      </svg>
      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {["LangGraph", "FastAPI", "Pydantic"].map((tag) => (
          <span
            key={tag}
            className="rounded-[20px] border border-[rgba(107,79,160,0.15)] bg-[rgba(107,79,160,0.07)] px-2 py-0.5 text-[9px] text-[#5a3d8a]"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function AcademyHeroVisual() {
  return (
    <div className="relative mx-auto h-[320px] w-full max-w-[360px] lg:mx-0 lg:ml-auto">
      <TerminalLayer />
      <ArticlePreviewLayer />
    </div>
  );
}
