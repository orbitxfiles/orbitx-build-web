"use client";

export function HeroDiagram() {
  const nodeW = 130;
  const nodeH = 38;
  const nodeRx = 19;

  const nodes = [
    { key: "user", label: "USER QUERY", cx: 100, cy: 40 },
    { key: "retriever", label: "RETRIEVER", cx: 220, cy: 40 },
    { key: "vector", label: "VECTOR STORE", cx: 340, cy: 40 },
    { key: "context", label: "CONTEXT", cx: 340, cy: 130 },
    { key: "llm", label: "LLM", cx: 220, cy: 130 },
    { key: "response", label: "RESPONSE", cx: 220, cy: 220 },
  ] as const;

  const getNodeBox = (cx: number, cy: number) => {
    const x = cx - nodeW / 2;
    const y = cy - nodeH / 2;
    return { x, y };
  };

  const n = new Map(nodes.map((x) => [x.key, x]));

  // Helper: pick edge attachment points for simple orthogonal lines.
  const right = (key: (typeof nodes)[number]["key"]) => (n.get(key)!.cx + nodeW / 2);
  const left = (key: (typeof nodes)[number]["key"]) => (n.get(key)!.cx - nodeW / 2);
  const top = (key: (typeof nodes)[number]["key"]) => (n.get(key)!.cy - nodeH / 2);
  const bottom = (key: (typeof nodes)[number]["key"]) => (n.get(key)!.cy + nodeH / 2);
  const centerY = (key: (typeof nodes)[number]["key"]) => n.get(key)!.cy;
  const centerX = (key: (typeof nodes)[number]["key"]) => n.get(key)!.cx;

  const edges = [
    {
      // USER QUERY → RETRIEVER (horizontal)
      // Note: the provided node centers slightly overlap for the given capsule sizes.
      // We anchor the arrowhead at the *target* border, but start from the source center
      // so marker orientation matches the intended flow direction.
      d: `M ${centerX("user")} ${centerY("user")} L ${left("retriever")} ${centerY("retriever")}`,
      begin: "0s",
      dur: "1.8s",
    },
    {
      // RETRIEVER → VECTOR STORE (horizontal)
      d: `M ${centerX("retriever")} ${centerY("retriever")} L ${left("vector")} ${centerY("vector")}`,
      begin: "0.6s",
      dur: "1.8s",
    },
    {
      // VECTOR STORE → CONTEXT (vertical down)
      d: `M ${centerX("vector")} ${bottom("vector")} L ${centerX("context")} ${top("context")}`,
      begin: "1.1s",
      dur: "1.4s",
    },
    {
      // CONTEXT → LLM (horizontal left)
      d: `M ${centerX("context")} ${centerY("context")} L ${right("llm")} ${centerY("llm")}`,
      begin: "0.3s",
      dur: "1.8s",
    },
    {
      // RETRIEVER → LLM (vertical down)
      d: `M ${centerX("retriever")} ${bottom("retriever")} L ${centerX("llm")} ${top("llm")}`,
      begin: "0.9s",
      dur: "1.4s",
    },
    {
      // LLM → RESPONSE (vertical down)
      d: `M ${centerX("llm")} ${bottom("llm")} L ${centerX("response")} ${top("response")}`,
      begin: "1.5s",
      dur: "1.4s",
    },
  ] as const;

  return (
    <div
      className="w-full max-w-[480px]"
      style={{
        background: "rgba(255,255,255,0.60)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(13,67,102,0.10)",
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 4px 24px rgba(13,67,102,0.07)",
      }}
    >
      <svg viewBox="0 0 440 320" width="100%" height="auto" aria-label="RAG pipeline illustration">
        <defs>
          <marker
            id="hero-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M 0 0 L 6 3 L 0 6 z" fill="rgba(13,67,102,0.35)" />
          </marker>
        </defs>

        {edges.map((edge, i) => (
          <g key={i}>
            <path
              d={edge.d}
              fill="none"
              stroke="rgba(13,67,102,0.20)"
              strokeWidth={1.5}
              markerEnd="url(#hero-arrow)"
            />
            <circle r="3.5" fill="#1a7a5e" opacity="0.8">
              <animateMotion
                path={edge.d}
                begin={edge.begin}
                dur={edge.dur}
                repeatCount="indefinite"
                calcMode="linear"
                rotate="auto"
              />
            </circle>
          </g>
        ))}

        {nodes.map((node) => {
          const { x, y } = getNodeBox(node.cx, node.cy);
          return (
            <g key={node.key}>
              <rect
                x={x}
                y={y}
                width={nodeW}
                height={nodeH}
                rx={nodeRx}
                fill="rgba(255,255,255,0.85)"
                stroke="rgba(13,67,102,0.15)"
                strokeWidth={1}
              />
              <text
                x={x + nodeW / 2}
                y={y + nodeH / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#0d4366"
                fontSize={11}
                fontWeight={500}
                fontFamily="Inter, sans-serif"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

