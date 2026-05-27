export type ResumeExperience = {
  title: string;
  org: string;
  period: string;
  bullets: string[];
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  tagline: string;
  bio: string;
  recruiterSummary: string;
  highlights: string[];
  focus: string[];
  experience: ResumeExperience[];
  education: string;
  openTo: string;
  linkedin: string;
  github: string;
  instagram: string;
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

export const ORBITX_INVESTOR = {
  headline: "OrbitX for partners & investors",
  subtitle:
    "A public AI engineering lab with documented shipping velocity, technical depth, and a content engine that compounds trust — built by four founders in India.",
  thesis: [
    {
      title: "Problem",
      body: "Enterprise and startup teams adopt AI fast but lack credible, production-grade playbooks. Demos outpace reliability; knowledge stays locked in private Slack threads.",
    },
    {
      title: "Solution",
      body: "OrbitX is a technical media + product lab: shipped projects, Academy content, post-mortems, and reusable resources — all public. We prove capability before we pitch it.",
    },
    {
      title: "Why now",
      body: "India’s AI builder ecosystem is scaling. Teams that document in public win hiring, partnerships, and early customers faster than teams with slide decks alone.",
    },
  ],
  traction: [
    { metric: "4", label: "Technical co-founders" },
    { metric: "3+", label: "Shipped lab projects" },
    { metric: "9+", label: "Academy articles" },
    { metric: "100%", label: "Public build logs" },
  ],
  model: [
    "Project showcases → consulting & implementation leads",
    "Academy & resources → community and hiring pipeline",
    "Open documentation → trust and partnership inbound",
  ],
  roadmap: [
    {
      phase: "Now",
      items: [
        "Public project portfolio with architecture depth",
        "Academy and resource library",
        "Post-mortem and build-log cadence",
      ],
    },
    {
      phase: "Next",
      items: [
        "Commercial pilots from inbound technical audience",
        "Premium templates and enterprise resource packs",
        "Expanded agent/RAG reference implementations",
      ],
    },
  ],
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    slug: "surya-raj-salve",
    name: "Surya Raj Salve",
    role: "Agentic AI Engineer",
    tagline: "Turns ambiguous product ideas into APIs that survive traffic.",
    bio: "Surya architects the bones of OrbitX — FastAPI services, data models, and the boring reliability work that keeps demos from becoming lies. He believes the best AI systems are measured in latency histograms, not slide decks.",
    recruiterSummary:
      "Backend engineer focused on API design, PostgreSQL, and production reliability for AI products. Ideal for teams shipping FastAPI services, data layers, and observability from day one.",
    highlights: [
      "Backend architecture for OrbitX projects",
      "Database design and API contracts",
      "Production debugging and observability",
    ],
    focus: ["Voice AI", "Agent orchestration"],
    experience: [
      {
        title: "Co-founder · Backend",
        org: "OrbitX",
        period: "2025 — Present",
        bullets: [
          "Designed REST APIs and PostgreSQL schemas for public lab projects",
          "Owned deployment patterns and error budgets for demo-to-prod paths",
        ],
      },
    ],
    education: "B.Tech — Computer Science (India)",
    openTo: "Backend / platform engineering roles · technical co-founder conversations",
    linkedin: "https://www.linkedin.com/in/salve-surya-raj",
    github: "https://github.com/suryaraj05",
    instagram: "https://www.instagram.com/surya_1035_?igsh=dDl3bnVoeG53cGRt",
    accent: "#1a7a5e",
  },
  {
    slug: "venkata-tharun-parsa",
    name: "Venkata Tharun Parsa",
    role: "Agentic AI Engineer",
    tagline: "Builds agent loops that fail gracefully — not spectacularly.",
    bio: "Tharun leads the AI layer: RAG pipelines, tool-calling agents, and eval harnesses that catch regressions before users do. He writes the prompts we trust enough to version-control.",
    recruiterSummary:
      "AI engineer specializing in RAG, agents, and eval-driven development. Strong fit for LLM product teams that need retrieval quality and tool-calling reliability, not just chat wrappers.",
    highlights: [
      "RAG and retrieval quality",
      "Multi-agent orchestration",
      "Prompt kits and eval rubrics",
    ],
    focus: ["Deployments", "Cloud"],
    experience: [
      {
        title: "Co-founder · AI",
        org: "OrbitX",
        period: "2025 — Present",
        bullets: [
          "Built RAG and agent reference implementations with public eval notes",
          "Authored Academy content on prompts, tools, and failure modes",
        ],
      },
    ],
    education: "B.Tech — Computer Science (India)",
    openTo: "AI engineer / applied scientist roles · LLM product teams",
    linkedin: "https://www.linkedin.com/in/venkata-tharun-parsa-98850632a/",
    github: "https://github.com/venkatatharunparsa",
    instagram: "https://www.instagram.com/tharunparsa__666/",
    accent: "#6b4fa0",
  },
  {
    slug: "pavan-kumar-kunukuntla",
    name: "Pavan Kumar Kunukuntla",
    role: "Agentic AI Engineer",
    tagline: "Makes complex systems feel calm on the surface.",
    bio: "Pavan shapes how OrbitX reads and feels — editorial layouts, diagram UX, and the polish that turns engineering notes into something people actually want to read. He cares about hierarchy, whitespace, and honest empty states.",
    recruiterSummary:
      "Frontend engineer with product taste — Next.js, design systems, and technical storytelling. Great for developer tools, AI products, and content-heavy surfaces recruiters can actually evaluate.",
    highlights: [
      "Next.js product surfaces",
      "Design systems and editorial UI",
      "Interactive architecture diagrams",
    ],
    focus: ["Data analytics"],
    experience: [
      {
        title: "Co-founder · Product & Frontend",
        org: "OrbitX",
        period: "2025 — Present",
        bullets: [
          "Shipped the OrbitX web lab with section-specific design language",
          "Built diagram and article experiences for technical readers",
        ],
      },
    ],
    education: "B.Tech — Computer Science (India)",
    openTo: "Frontend / product engineer roles · design-engineering hybrids",
    linkedin: "https://www.linkedin.com/in/pavan-kumar-kunukuntla",
    github: "https://github.com/pavan939111",
    instagram: "https://www.instagram.com/pavan_yadav___74?igsh=Z2Zzb3EzNDRwZGlr",
    accent: "#2d5fa0",
  },
  {
    slug: "sai-manjith-paripelli",
    name: "Sai Manjith Paripelli",
    role: "Agentic AI Engineer",
    tagline: "Connects models, data, and deploy pipelines without drama.",
    bio: "Manjith keeps the lab running — deployments, integrations, MCP starters, and the glue between services. When something works in staging but not prod, he finds the cable nobody documented.",
    recruiterSummary:
      "Infrastructure and integrations engineer — CI/CD, MCP, cloud, and the glue between AI services. Valuable for teams scaling from prototype to repeatable deploys.",
    highlights: [
      "CI/CD and deployment workflows",
      "MCP and third-party integrations",
      "Infrastructure and monitoring",
    ],
    focus: ["Big data handling"],
    experience: [
      {
        title: "Co-founder · Infra",
        org: "OrbitX",
        period: "2025 — Present",
        bullets: [
          "Maintained deploy pipelines and integration templates for the lab",
          "Published MCP starters and operational runbooks",
        ],
      },
    ],
    education: "B.Tech — Computer Science (India)",
    openTo: "DevOps / platform / integrations roles · infra-heavy startups",
    linkedin: "https://www.linkedin.com/in/saimanjith-paripelli-33b399357",
    github: "https://github.com/SaiManjith07",
    instagram: "https://www.instagram.com/minnnnuu___07?igsh=ZGR3emtqYzBpaWlx",
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

export function shuffleTeamMembers<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
