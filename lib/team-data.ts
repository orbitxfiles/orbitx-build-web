export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  tagline: string;
  bio: string;
  highlights: string[];
  focus: string[];
  linkedin: string;
  github: string;
  accent: string;
};

export const ORBITX_ORIGIN = {
  title: "How we built OrbitX",
  subtitle:
    "Four engineers, one shared frustration with AI demos that look finished but fail in production — and a lab born from late-night whiteboards.",
  chapters: [
    {
      title: "The spark",
      body: "It started with a simple question: why does every AI product ship a slick landing page, but hide the messy middle — retries, evals, broken retrieval, and the post-mortem nobody writes? We wanted a place where the middle is the product.",
      imageLabel: "Photo: first whiteboard sketch (coming soon)",
    },
    {
      title: "Building in the open",
      body: "OrbitX became our shared notebook. One repo for architecture diagrams, one for honest failures, one for tutorials we actually use in production. We document while we build — not after we forget what broke.",
      imageLabel: "Photo: lab workspace (coming soon)",
    },
    {
      title: "What OrbitX is today",
      body: "A public engineering lab from India: real projects, Academy articles, post-mortems, resources, and build logs. Less hype. More systems that work — and the receipts to prove it.",
      imageLabel: "Photo: team at work (coming soon)",
    },
  ],
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    slug: "surya-raj-salve",
    name: "Surya Raj Salve",
    role: "Co-founder · Systems & Backend",
    tagline: "Turns ambiguous product ideas into APIs that survive traffic.",
    bio: "Surya architects the bones of OrbitX — FastAPI services, data models, and the boring reliability work that keeps demos from becoming lies. He believes the best AI systems are measured in latency histograms, not slide decks.",
    highlights: [
      "Backend architecture for OrbitX projects",
      "Database design and API contracts",
      "Production debugging and observability",
    ],
    focus: ["FastAPI", "PostgreSQL", "System design"],
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    accent: "#1a7a5e",
  },
  {
    slug: "venkata-tharun-parsa",
    name: "Venkata Tharun Parsa",
    role: "Co-founder · AI & Agents",
    tagline: "Builds agent loops that fail gracefully — not spectacularly.",
    bio: "Tharun leads the AI layer: RAG pipelines, tool-calling agents, and eval harnesses that catch regressions before users do. He writes the prompts we trust enough to version-control.",
    highlights: [
      "RAG and retrieval quality",
      "Multi-agent orchestration",
      "Prompt kits and eval rubrics",
    ],
    focus: ["LangGraph", "RAG", "Gemini / LLM APIs"],
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    accent: "#6b4fa0",
  },
  {
    slug: "pavan-kumar-kunukuntla",
    name: "Pavan Kumar Kunukuntla",
    role: "Co-founder · Frontend & Product",
    tagline: "Makes complex systems feel calm on the surface.",
    bio: "Pavan shapes how OrbitX reads and feels — editorial layouts, diagram UX, and the polish that turns engineering notes into something people actually want to read. He cares about hierarchy, whitespace, and honest empty states.",
    highlights: [
      "Next.js product surfaces",
      "Design systems and editorial UI",
      "Interactive architecture diagrams",
    ],
    focus: ["Next.js", "TypeScript", "UI engineering"],
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    accent: "#2d5fa0",
  },
  {
    slug: "sai-manjith-paripelli",
    name: "Sai Manjith Paripelli",
    role: "Co-founder · Infra & Integration",
    tagline: "Connects models, data, and deploy pipelines without drama.",
    bio: "Manjith keeps the lab running — deployments, integrations, MCP starters, and the glue between services. When something works in staging but not prod, he finds the cable nobody documented.",
    highlights: [
      "CI/CD and deployment workflows",
      "MCP and third-party integrations",
      "Infrastructure and monitoring",
    ],
    focus: ["DevOps", "MCP", "Cloud / Docker"],
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    accent: "#b45309",
  },
];

export function getTeamMember(slug: string): TeamMember | undefined {
  return TEAM_MEMBERS.find((m) => m.slug === slug);
}

export function memberInitials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
