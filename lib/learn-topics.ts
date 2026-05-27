export type TopicKey =
  | "rag"
  | "agents"
  | "langgraph"
  | "vector"
  | "mcp"
  | "prompt"
  | "structured"
  | "what-broke"
  | "default";

export const LEARN_ACCENT = "#6b4fa0";

export const FILTER_TOPICS: { id: string; label: string }[] = [
  { id: "all", label: "All" },
  { id: "rag", label: "RAG" },
  { id: "agents", label: "Agents" },
  { id: "langgraph", label: "LangGraph" },
  { id: "vector", label: "Vector DBs" },
  { id: "mcp", label: "MCP" },
  { id: "prompt", label: "Prompt Engineering" },
  { id: "structured", label: "Structured Outputs" },
];

export const TOPIC_STYLES: Record<
  TopicKey,
  { bg: string; accent: string; label: string }
> = {
  rag: { bg: "#ede8f5", accent: "#6b4fa0", label: "RAG" },
  agents: { bg: "#e4f2ec", accent: "#1a7a5e", label: "Agents" },
  langgraph: { bg: "#e8eef5", accent: "#2d5fa0", label: "LangGraph" },
  vector: { bg: "#ede8f5", accent: "#6b4fa0", label: "Vector DBs" },
  mcp: { bg: "#e8eef5", accent: "#2d5fa0", label: "MCP" },
  prompt: { bg: "#ede8f5", accent: "#6b4fa0", label: "Prompt" },
  structured: { bg: "#e4f2ec", accent: "#1a7a5e", label: "Structured" },
  "what-broke": { bg: "#f5e8e8", accent: "#8b3a3a", label: "What Broke" },
  default: { bg: "#f0f5f8", accent: "#6b4fa0", label: "Engineering" },
};

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function resolveTopicKey(
  categoryName?: string | null,
  categorySlug?: string | null
): TopicKey {
  const hay = `${categoryName ?? ""} ${categorySlug ?? ""}`.toLowerCase();
  if (hay.includes("rag") || hay.includes("retrieval")) return "rag";
  if (hay.includes("agent")) return "agents";
  if (hay.includes("langgraph") || hay.includes("lang graph")) return "langgraph";
  if (hay.includes("vector") || hay.includes("embedding")) return "vector";
  if (hay.includes("mcp")) return "mcp";
  if (hay.includes("prompt")) return "prompt";
  if (hay.includes("structured")) return "structured";
  if (hay.includes("broke") || hay.includes("failure")) return "what-broke";
  return "default";
}

export function topicMatchesFilter(
  topicKey: TopicKey,
  filterId: string
): boolean {
  if (filterId === "all") return true;
  return topicKey === filterId;
}
