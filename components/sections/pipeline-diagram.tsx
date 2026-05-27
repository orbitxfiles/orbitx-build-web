"use client";

export function PipelineDiagram() {
  const nodes = [
    { label: "User Query", x: 24, y: 24, w: 100, h: 44 },
    { label: "Retriever", x: 150, y: 24, w: 100, h: 44 },
    { label: "Vector Store", x: 276, y: 24, w: 100, h: 44 },
    { label: "Context", x: 276, y: 120, w: 100, h: 44 },
    { label: "LLM", x: 150, y: 200, w: 100, h: 44 },
    { label: "Response", x: 24, y: 280, w: 100, h: 44 },
  ];

  const edges: { d: string; delay: number }[] = [
    { d: "M 124 46 L 150 46", delay: 0 },
    { d: "M 250 46 L 276 46", delay: 0.4 },
    { d: "M 326 68 L 326 120", delay: 0.8 },
    { d: "M 276 142 L 200 222", delay: 1.2 },
    { d: "M 150 244 L 124 280", delay: 1.6 },
    { d: "M 200 222 L 276 68", delay: 2.0 },
  ];

  return (
    <div
      className="flex w-full items-center justify-center rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-card)]"
      style={{ minHeight: 340 }}
    >
      <svg
        viewBox="0 0 400 340"
        width="100%"
        height="340"
        className="max-w-[400px]"
        aria-label="RAG pipeline diagram"
      >
        {edges.map((edge, i) => (
          <g key={i}>
            <path
              d={edge.d}
              fill="none"
              stroke="var(--border)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              className="pipeline-edge"
              style={{ animationDelay: `${edge.delay}s` }}
            />
            <circle r="4" fill="#1a7a5e">
              <animateMotion
                dur="2.4s"
                begin={`${edge.delay}s`}
                repeatCount="indefinite"
                path={edge.d}
              />
            </circle>
          </g>
        ))}

        {nodes.map((node) => (
          <g key={node.label} transform={`translate(${node.x}, ${node.y})`}>
            <rect
              width={node.w}
              height={node.h}
              rx="8"
              fill="#ffffff"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <circle cx="14" cy="14" r="4" fill="#1a7a5e" />
            <text
              x={node.w / 2}
              y={node.h / 2 + 4}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#4a6b82"
              fontSize="11"
              fontFamily="General Sans, Inter, sans-serif"
              letterSpacing="0.08em"
            >
              {node.label.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
