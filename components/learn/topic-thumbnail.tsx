import type { TopicKey } from "@/lib/learn-topics";

export function TopicThumbnail({ topic }: { topic: TopicKey }) {
  if (topic === "rag") {
    return (
      <svg width={120} height={48} viewBox="0 0 120 48" aria-hidden>
        <rect x={8} y={16} width={40} height={16} rx={8} fill="rgba(107,79,160,0.15)" stroke="rgba(107,79,160,0.3)" />
        <text x={28} y={27} textAnchor="middle" fontSize={7} fill="#6b4fa0">
          Query
        </text>
        <line x1={48} y1={24} x2={58} y2={24} stroke="rgba(107,79,160,0.25)" strokeWidth={1.5} />
        <rect x={58} y={16} width={40} height={16} rx={8} fill="rgba(107,79,160,0.15)" stroke="rgba(107,79,160,0.3)" />
        <text x={78} y={27} textAnchor="middle" fontSize={7} fill="#6b4fa0">
          Retriever
        </text>
        <line x1={98} y1={24} x2={108} y2={24} stroke="rgba(107,79,160,0.25)" strokeWidth={1.5} />
        <rect x={108} y={16} width={40} height={16} rx={8} fill="rgba(107,79,160,0.15)" stroke="rgba(107,79,160,0.3)" />
      </svg>
    );
  }

  if (topic === "agents") {
    return (
      <svg width={80} height={64} viewBox="0 0 80 64" aria-hidden>
        <circle cx={40} cy={18} r={8} fill="rgba(26,122,94,0.15)" stroke="rgba(26,122,94,0.3)" />
        <circle cx={20} cy={46} r={8} fill="rgba(26,122,94,0.15)" stroke="rgba(26,122,94,0.3)" />
        <circle cx={60} cy={46} r={8} fill="rgba(26,122,94,0.15)" stroke="rgba(26,122,94,0.3)" />
        <line x1={40} y1={26} x2={24} y2={38} stroke="rgba(26,122,94,0.2)" strokeWidth={1.5} />
        <line x1={40} y1={26} x2={56} y2={38} stroke="rgba(26,122,94,0.2)" strokeWidth={1.5} />
        <line x1={28} y1={46} x2={52} y2={46} stroke="rgba(26,122,94,0.2)" strokeWidth={1.5} />
      </svg>
    );
  }

  const accent =
    topic === "what-broke"
      ? "rgba(139,58,58,0.3)"
      : topic === "langgraph"
        ? "rgba(45,95,160,0.3)"
        : "rgba(107,79,160,0.3)";

  return (
    <svg width={54} height={54} viewBox="0 0 54 54" aria-hidden>
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={12 + col * 15}
            cy={12 + row * 15}
            r={3}
            fill={accent}
          />
        ))
      )}
    </svg>
  );
}
