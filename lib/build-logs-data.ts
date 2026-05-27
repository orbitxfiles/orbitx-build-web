export type BuildLogEntry = {
  id: string;
  date: string;
  weekLabel: string;
  project: string;
  title: string;
  body: string;
  tags: string[];
  isLatest?: boolean;
};

export const BUILD_LOGS: BuildLogEntry[] = [
  {
    id: "2026-w21",
    date: "May 27, 2026",
    weekLabel: "Week 21",
    project: "OrbitX Voice Pipeline",
    title: "Shipped minimal architecture diagram + Academy redesign",
    body: "Replaced placeholder hero visuals with terminal stack and editorial article layout. RAG seed articles live for /learn testing.",
    tags: ["Next.js", "FastAPI", "Design"],
    isLatest: true,
  },
  {
    id: "2026-w20",
    date: "May 20, 2026",
    weekLabel: "Week 20",
    project: "OrbitX Voice Pipeline",
    title: "DiagramRenderer v2 — pure SVG, pan/zoom, minimap",
    body: "Dropped foreignObject nodes. Added orthogonal edges, icon mapping, and visibility-aware flow animation pause.",
    tags: ["SVG", "Mermaid", "UX"],
  },
  {
    id: "2026-w19",
    date: "May 13, 2026",
    weekLabel: "Week 19",
    project: "Platform",
    title: "Expanded Project model + admin form",
    body: "JSONB fields for tech stack, roadmap, lessons learned, and architecture Mermaid. Non-destructive Alembic migration.",
    tags: ["PostgreSQL", "Alembic", "Admin"],
  },
  {
    id: "2026-w18",
    date: "May 6, 2026",
    weekLabel: "Week 18",
    project: "Academy",
    title: "Seeded 9 engineering articles across topics",
    body: "Production RAG walkthrough with code blocks, TOC, and related project sidebar for voice pipeline.",
    tags: ["Content", "RAG", "Seed"],
  },
];
