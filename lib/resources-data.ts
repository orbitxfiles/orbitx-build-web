export type ResourceCategoryId = "prompt-kits" | "system-diagrams" | "mcp-starters";

export type CatalogResource = {
  slug: string;
  title: string;
  description: string;
  type: string;
  tags: string[];
  /** Path under /resources/files/... for download */
  filePath: string;
};

export type ResourceCategory = {
  id: ResourceCategoryId;
  title: string;
  countLabel: string;
  description: string;
  accent: string;
  items: CatalogResource[];
};

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    id: "prompt-kits",
    title: "Prompt Kits",
    countLabel: "8 templates",
    description: "Battle-tested system prompts and eval rubrics from production agents.",
    accent: "#2d5fa0",
    items: [
      {
        slug: "rag-system-v2",
        title: "RAG System Prompt v2",
        description: "Grounded answering with citation rules and refusal when context is insufficient.",
        type: "System prompt",
        tags: ["RAG", "Safety"],
        filePath: "/resources/files/prompt-kits/rag-system-v2.txt",
      },
      {
        slug: "agent-planner",
        title: "Agent Planner Prompt",
        description: "Separates planning from tool execution with explicit step budgets.",
        type: "System prompt",
        tags: ["Agents", "Tools"],
        filePath: "/resources/files/prompt-kits/agent-planner.txt",
      },
      {
        slug: "eval-judge-rubric",
        title: "LLM-as-Judge Rubric",
        description: "Structured scoring template for regression evals on answer quality.",
        type: "Eval kit",
        tags: ["Evals", "QA"],
        filePath: "/resources/files/prompt-kits/eval-judge-rubric.txt",
      },
      {
        slug: "structured-output-instructions",
        title: "Structured Output Instructions",
        description: "Schema-first generation with retry-on-validation-failure pattern.",
        type: "Template",
        tags: ["JSON", "Pydantic"],
        filePath: "/resources/files/prompt-kits/structured-output-instructions.txt",
      },
      {
        slug: "voice-assistant-core",
        title: "Voice Assistant Core",
        description: "Low-latency spoken responses with barge-in and concise phrasing rules.",
        type: "System prompt",
        tags: ["Voice", "STT"],
        filePath: "/resources/files/prompt-kits/voice-assistant-core.txt",
      },
      {
        slug: "postmortem-writer",
        title: "Post-Mortem Writer",
        description: "What Broke article template — timeline, root cause, fix, prevention.",
        type: "Template",
        tags: ["Docs", "Incidents"],
        filePath: "/resources/files/prompt-kits/postmortem-writer.txt",
      },
      {
        slug: "code-review-agent",
        title: "Code Review Agent",
        description: "Security + correctness checklist for Python/FastAPI PRs.",
        type: "System prompt",
        tags: ["DevOps", "Review"],
        filePath: "/resources/files/prompt-kits/code-review-agent.txt",
      },
      {
        slug: "chunking-metadata-rules",
        title: "Chunking Metadata Rules",
        description: "Instructions for enriching chunks with doc_type, tenant_id, and section paths.",
        type: "Template",
        tags: ["RAG", "Indexing"],
        filePath: "/resources/files/prompt-kits/chunking-metadata-rules.txt",
      },
    ],
  },
  {
    id: "system-diagrams",
    title: "System Diagrams",
    countLabel: "6 maps",
    description: "Mermaid architecture starters for common AI stacks — copy into your repo.",
    accent: "#2d5fa0",
    items: [
      {
        slug: "rag-pipeline-lr",
        title: "RAG Pipeline (LR)",
        description: "Query → embed → retrieve → rerank → LLM → response with observability sidecar.",
        type: "Mermaid",
        tags: ["RAG", "LR"],
        filePath: "/resources/files/system-diagrams/rag-pipeline-lr.mmd",
      },
      {
        slug: "voice-streaming-td",
        title: "Voice Streaming (TD)",
        description: "Client → gateway → STT → LLM → TTS with session cache.",
        type: "Mermaid",
        tags: ["Voice", "WebSocket"],
        filePath: "/resources/files/system-diagrams/voice-streaming-td.mmd",
      },
      {
        slug: "multi-agent-supervisor",
        title: "Multi-Agent Supervisor",
        description: "Supervisor routes to specialist agents with shared memory store.",
        type: "Mermaid",
        tags: ["Agents", "LangGraph"],
        filePath: "/resources/files/system-diagrams/multi-agent-supervisor.mmd",
      },
      {
        slug: "mcp-tool-host",
        title: "MCP Tool Host",
        description: "IDE/client → MCP server → internal APIs and document store.",
        type: "Mermaid",
        tags: ["MCP", "Tools"],
        filePath: "/resources/files/system-diagrams/mcp-tool-host.mmd",
      },
      {
        slug: "eval-harness",
        title: "Eval Harness",
        description: "Golden set → runner → judge → metrics dashboard feedback loop.",
        type: "Mermaid",
        tags: ["Evals", "CI"],
        filePath: "/resources/files/system-diagrams/eval-harness.mmd",
      },
      {
        slug: "hybrid-search",
        title: "Hybrid Search Architecture",
        description: "BM25 + vector fusion with metadata filters at query time.",
        type: "Mermaid",
        tags: ["Vector", "Search"],
        filePath: "/resources/files/system-diagrams/hybrid-search.mmd",
      },
    ],
  },
  {
    id: "mcp-starters",
    title: "MCP Starters",
    countLabel: "5 scaffolds",
    description: "Boilerplate MCP servers with auth, logging, and health checks wired.",
    accent: "#2d5fa0",
    items: [
      {
        slug: "docs-mcp-python",
        title: "Docs MCP (Python)",
        description: "Read-only markdown runbooks exposed as MCP tools with path sandboxing.",
        type: "Python",
        tags: ["Python", "Docs"],
        filePath: "/resources/files/mcp-starters/docs-mcp-python.md",
      },
      {
        slug: "postgres-mcp-python",
        title: "Postgres MCP (Python)",
        description: "Parameterized read queries with allowlisted tables and row limits.",
        type: "Python",
        tags: ["SQL", "Postgres"],
        filePath: "/resources/files/mcp-starters/postgres-mcp-python.md",
      },
      {
        slug: "github-mcp-typescript",
        title: "GitHub MCP (TypeScript)",
        description: "Issues and PR tools with org-scoped token and rate-limit handling.",
        type: "TypeScript",
        tags: ["GitHub", "TS"],
        filePath: "/resources/files/mcp-starters/github-mcp-typescript.md",
      },
      {
        slug: "rag-search-mcp",
        title: "RAG Search MCP",
        description: "Vector search tool wrapping your existing embedding index API.",
        type: "Python",
        tags: ["RAG", "Search"],
        filePath: "/resources/files/mcp-starters/rag-search-mcp.md",
      },
      {
        slug: "mcp-health-check",
        title: "MCP Health & Config",
        description: "Shared `--check` CLI pattern and env validation for all starters.",
        type: "Guide",
        tags: ["Ops", "Config"],
        filePath: "/resources/files/mcp-starters/mcp-health-check.md",
      },
    ],
  },
];

export function getResourceCategory(id: string): ResourceCategory | undefined {
  return RESOURCE_CATEGORIES.find((c) => c.id === id);
}

export function getAllCatalogResources(): CatalogResource[] {
  return RESOURCE_CATEGORIES.flatMap((c) => c.items);
}
