export interface NodeIcon {
  svgPath: string;
  viewBox: string;
  accent: string;
}

interface IconRule {
  keywords: string[];
  svgPath: string;
  accent: string;
}

const VIEWBOX = "0 0 16 16";

const RULES: IconRule[] = [
  {
    keywords: ["client", "browser", "user", "ui"],
    accent: "#2d5fa0",
    svgPath:
      "M8 7.2c1.35 0 2.2-1 2.2-2.35S9.2 2.5 8 2.5 5.8 3.5 5.8 4.85 6.65 7.2 8 7.2zm0 1.1c-2 0-3.6.9-3.6 2V12h7.2V10.3c0-1.1-1.6-2-3.6-2z",
  },
  {
    keywords: ["websocket", "ws", "socket", "gateway"],
    accent: "#1a7a5e",
    svgPath:
      "M3 5.5h3V4H2v4h1V6.5H3zm10 0H10V4h4v4h-1V6.5zm-5 6h3v1.5H6V11h1v1.5zM8 3 5.5 5.5 8 8l2.5-2.5L8 3zm0 10-2.5-2.5L8 8l2.5 2.5L8 13z",
  },
  {
    keywords: ["stt", "speech", "microphone", "mic", "audio", "voice"],
    accent: "#6b4fa0",
    svgPath:
      "M8 2.5a2.2 2.2 0 0 0-2.2 2.2V8a2.2 2.2 0 0 0 4.4 0V4.7A2.2 2.2 0 0 0 8 2.5zm-3.8 5.5a3.8 3.8 0 0 0 7.6 0h-1.2a2.6 2.6 0 0 1-5.2 0H4.2zM7.2 11.2h1.6V14H7.2v-2.8z",
  },
  {
    keywords: ["llm", "model", "gemini", "gpt", "claude", "openai"],
    accent: "#00436e",
    svgPath: "M8 2.5 4 12h2l2-4.5 2 4.5h2L8 2.5z",
  },
  {
    keywords: ["tts", "speaker", "wav", "elevenlabs"],
    accent: "#8b3a3a",
    svgPath:
      "M3 5.5v5h2.5L9 14V2L5.5 5.5H3zm7.2-.8a3.5 3.5 0 0 1 0 6.6M10.5 3.5a5.8 5.8 0 0 1 0 9",
  },
  {
    keywords: ["vector", "store", "db", "database", "postgres", "redis"],
    accent: "#1a7a5e",
    svgPath:
      "M8 2C4.5 2 2.5 3.2 2.5 4.5S4.5 7 8 7s5.5-1.2 5.5-2.5S11.5 2 8 2zm0 5c-3.2 0-5.5-1.1-5.5-2.5S4.8 2 8 2s5.5 1.1 5.5 2.5S11.2 7 8 7zm0 2.5c-3.2 0-5.5 1.1-5.5 2.5S4.8 14 8 14s5.5-1.1 5.5-2.5S11.2 9.5 8 9.5z",
  },
  {
    keywords: ["retriever", "search", "query"],
    accent: "#2d5fa0",
    svgPath:
      "M7 2.5a4.5 4.5 0 1 0 2.8 8l2.5 2.5 1-1-2.5-2.5A4.5 4.5 0 0 0 7 2.5zm0 1.8a2.7 2.7 0 1 1 0 5.4 2.7 2.7 0 0 1 0-5.4z",
  },
  {
    keywords: ["api", "external", "http", "rest"],
    accent: "#6b4fa0",
    svgPath: "M9.2 2 6 9h2.2l-.6 5 4.4-7H9.2z",
  },
  {
    keywords: ["load", "balancer", "cdn", "cloudflare", "nginx"],
    accent: "#2d5fa0",
    svgPath:
      "M2 4h12v1.2H2V4zm0 3.2h9v1.2H2V7.2zm0 3.2h12v1.2H2v-1.2zM12.5 8.5l2 1.5-2 1.5v-3z",
  },
  {
    keywords: ["context", "memory", "cache", "session"],
    accent: "#00436e",
    svgPath: "M2 4h12v2H2V4zm0 3.5h12v2H2V7.5zm0 3.5h8v2H2v-2z",
  },
  {
    keywords: ["response", "output", "result"],
    accent: "#1a7a5e",
    svgPath: "M2 8h8l-2-2 1.4-1.4L14 8l-4.6 4.6L8 11l2-2H2V8z",
  },
  {
    keywords: ["agent", "worker", "coordinator"],
    accent: "#6b4fa0",
    svgPath:
      "M8 1.8 13.5 5v6L8 14.2 2.5 11V5L8 1.8zm0 1.6L4.2 5.8v4.4L8 12.4l3.8-2.2V5.8L8 3.4z",
  },
  {
    keywords: ["metrics", "telemetry", "grafana", "observability"],
    accent: "#8b3a3a",
    svgPath: "M3 13V6h2v7H3zm3.5 0V3h2v10h-2zM10 13V8h2v5h-2z",
  },
];

const DEFAULT_ICON: NodeIcon = {
  viewBox: VIEWBOX,
  accent: "#4a6b82",
  svgPath: "M8 8m-3.2 0a3.2 3.2 0 1 0 6.4 0 3.2 3.2 0 1 0-6.4 0M8 8m-.8 0a.8.8 0 1 0 1.6 0 .8.8 0 1 0-1.6 0",
};

export function resolveNodeIcon(label: string): NodeIcon {
  const hay = label.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some((kw) => hay.includes(kw))) {
      return { viewBox: VIEWBOX, accent: rule.accent, svgPath: rule.svgPath };
    }
  }
  return DEFAULT_ICON;
}

export function collectAccentColors(labels: string[]): string[] {
  const set = new Set<string>();
  for (const label of labels) {
    set.add(resolveNodeIcon(label).accent);
  }
  return Array.from(set);
}

export function accentMarkerId(accent: string): string {
  return `arrow-${accent.replace("#", "")}`;
}
