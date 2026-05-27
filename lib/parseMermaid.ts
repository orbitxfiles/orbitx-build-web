import type {
  DiagramData,
  DiagramDirection,
  DiagramEdge,
  DiagramNode,
  DiagramSubgraph,
  EdgeStyle,
  NodeShape,
} from "@/lib/diagram/types";

export type { DiagramData } from "@/lib/diagram/types";

const DIRECTION_RE = /^graph\s+(TD|LR|TB|BT|RL)\s*;?\s*$/i;
const SUBGRAPH_START = /^subgraph\s+(.+)$/i;
const SUBGRAPH_END = /^end\s*$/i;

const NODE_DEF_RE =
  /^([A-Za-z][\w-]*)\s*(\[\[([^\]]+)\]\]|\[\(([^)]+)\)\]|\(\(([^)]+)\)\)|\(([^)]+)\)|\{([^}]+)\}|\[([^\]]+)\]|\(([^)]+)\))/;

const EDGE_RE =
  /^([A-Za-z][\w-]*)\s*(?:(--)\s*([^-\n]+?)\s*)?(-\.->|==>|--+>)\s*(?:\|([^|]+)\|\s*)?([A-Za-z][\w-]*)\s*$/;

function normalizeDirection(raw: string): DiagramDirection {
  const u = raw.toUpperCase();
  if (u === "LR" || u === "RL") return "LR";
  if (u === "TB" || u === "BT") return "TB";
  return "TD";
}

function parseNodeShape(
  id: string,
  label: string,
  bracket: string | undefined
): DiagramNode | null {
  if (!id) return null;
  const text = (label ?? id).trim();
  let shape: NodeShape = "rect";

  if (bracket) {
    const b = bracket.trim();
    if (b.startsWith("[[")) shape = "rect";
    else if (b.startsWith("[(")) shape = "stadium";
    else if (b.startsWith("((")) shape = "rounded";
    else if (b.startsWith("{")) shape = "diamond";
    else if (b.startsWith("(")) shape = "rounded";
    else if (b.startsWith("[")) shape = "rect";
  }

  return { id, label: text, shape };
}

function extractNodeFromLine(line: string): DiagramNode | null {
  const m = line.match(NODE_DEF_RE);
  if (!m) return null;
  const id = m[1];
  const label =
    m[3] ?? m[4] ?? m[5] ?? m[6] ?? m[7] ?? m[8] ?? m[9] ?? id;
  return parseNodeShape(id, label, m[2]);
}

function parseEdgeLine(line: string): DiagramEdge | null {
  const m = line.match(EDGE_RE);
  if (!m) return null;
  const from = m[1];
  const to = m[6];
  const arrow = m[4];
  let style: EdgeStyle = "solid";
  if (arrow === "-.->") style = "dashed";
  if (arrow === "==>") style = "thick";
  const label = (m[3] ?? m[5])?.trim().replace(/^"|"$/g, "");
  return { from, to, label: label || undefined, style };
}

function slugifySubgraph(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "subgraph";
}

export function parseMermaid(source: string): DiagramData {
  const lines = source
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.startsWith("%%"));

  let direction: DiagramDirection = "LR";
  const nodeMap = new Map<string, DiagramNode>();
  const edges: DiagramEdge[] = [];
  const subgraphs: DiagramSubgraph[] = [];
  let currentSubgraph: DiagramSubgraph | null = null;
  let subgraphIndex = 0;

  const ensureNode = (id: string, label?: string) => {
    if (!nodeMap.has(id)) {
      const node: DiagramNode = {
        id,
        label: label ?? id,
        shape: "rect",
        subgraph: currentSubgraph?.id,
      };
      nodeMap.set(id, node);
      if (currentSubgraph && !currentSubgraph.nodeIds.includes(id)) {
        currentSubgraph.nodeIds.push(id);
      }
    } else if (currentSubgraph && !currentSubgraph.nodeIds.includes(id)) {
      const n = nodeMap.get(id)!;
      if (!n.subgraph) {
        n.subgraph = currentSubgraph.id;
        currentSubgraph.nodeIds.push(id);
      }
    }
  };

  for (const line of lines) {
    const dirMatch = line.match(DIRECTION_RE);
    if (dirMatch) {
      direction = normalizeDirection(dirMatch[1]);
      continue;
    }

    if (SUBGRAPH_END.test(line)) {
      currentSubgraph = null;
      continue;
    }

    const sgMatch = line.match(SUBGRAPH_START);
    if (sgMatch) {
      const title = sgMatch[1].replace(/^"|"$/g, "").trim();
      const id = `sg-${slugifySubgraph(title)}-${subgraphIndex++}`;
      currentSubgraph = { id, title, nodeIds: [] };
      subgraphs.push(currentSubgraph);
      continue;
    }

    const edge = parseEdgeLine(line);
    if (edge) {
      ensureNode(edge.from);
      ensureNode(edge.to);
      edges.push(edge);
      continue;
    }

    const node = extractNodeFromLine(line);
    if (node) {
      const existing = nodeMap.get(node.id);
      if (existing) {
        existing.label = node.label;
        existing.shape = node.shape;
      } else {
        if (currentSubgraph) {
          node.subgraph = currentSubgraph.id;
          currentSubgraph.nodeIds.push(node.id);
        }
        nodeMap.set(node.id, node);
      }
      continue;
    }

    // Edge might appear after node on same conceptual line — try split by arrow tokens
    const parts = line.split(/\s+(?=-\.->|==>|--+>)\s*/);
    if (parts.length >= 2) {
      const combined = parts.join(" ");
      const e2 = parseEdgeLine(combined);
      if (e2) {
        ensureNode(e2.from);
        ensureNode(e2.to);
        edges.push(e2);
      }
    }
  }

  // Ensure all edge endpoints exist
  for (const e of edges) {
    ensureNode(e.from);
    ensureNode(e.to);
  }

  return {
    nodes: Array.from(nodeMap.values()),
    edges,
    subgraphs,
    direction,
  };
}

export function isMermaidGraph(source: string): boolean {
  return /^\s*graph\s+(TD|LR|TB|BT|RL)\b/im.test(source.trim());
}
