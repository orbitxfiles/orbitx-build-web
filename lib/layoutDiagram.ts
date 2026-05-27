import type {
  DiagramData,
  DiagramDirection,
  LayoutDiagramData,
  LayoutNode,
} from "@/lib/diagram/types";

const NODE_H = 44;
const PADDING = 48;
const RANK_GAP_LR = 110;
const SIBLING_GAP_LR = 64;
const RANK_GAP_TD = 90;
const SIBLING_GAP_TD = 80;
const SUBGRAPH_PAD = 24;

function measureNodeWidth(label: string): number {
  return Math.min(220, Math.max(140, label.length * 7.5 + 60));
}

function buildAdjacency(data: DiagramData) {
  const adj = new Map<string, string[]>();
  const rev = new Map<string, string[]>();
  for (const n of data.nodes) {
    adj.set(n.id, []);
    rev.set(n.id, []);
  }
  for (const e of data.edges) {
    adj.get(e.from)?.push(e.to);
    rev.get(e.to)?.push(e.from);
  }
  return { adj, rev };
}

function assignRanks(data: DiagramData): Map<string, number> {
  const { adj, rev } = buildAdjacency(data);
  const ranks = new Map<string, number>();
  const ids = data.nodes.map((n) => n.id);

  const roots = ids.filter((id) => (rev.get(id)?.length ?? 0) === 0);
  const start = roots.length > 0 ? roots : ids;

  for (const id of ids) ranks.set(id, 0);

  for (const root of start) {
    const queue: { id: string; rank: number }[] = [{ id: root, rank: 0 }];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const { id, rank } = queue.shift()!;
      const key = `${id}-${rank}`;
      if (visited.has(key)) continue;
      visited.add(key);
      ranks.set(id, Math.max(ranks.get(id) ?? 0, rank));
      for (const next of adj.get(id) ?? []) {
        queue.push({ id: next, rank: rank + 1 });
      }
    }
  }

  let maxRank = 0;
  for (const r of ranks.values()) maxRank = Math.max(maxRank, r);
  for (const id of ids) {
    if (!ranks.has(id)) ranks.set(id, maxRank + 1);
  }

  return ranks;
}

function groupByRank(ranks: Map<string, number>) {
  const groups = new Map<number, string[]>();
  for (const [id, rank] of ranks.entries()) {
    if (!groups.has(rank)) groups.set(rank, []);
    groups.get(rank)!.push(id);
  }
  return groups;
}

function placeNodes(
  data: DiagramData,
  ranks: Map<string, number>,
  direction: DiagramDirection
): LayoutNode[] {
  const groups = groupByRank(ranks);
  const maxRank = Math.max(...Array.from(groups.keys()), 0);
  const isLR = direction === "LR";

  const widths = new Map<string, number>();
  for (const n of data.nodes) {
    widths.set(n.id, measureNodeWidth(n.label));
  }

  const rankMaxWidth: number[] = [];
  for (let rank = 0; rank <= maxRank; rank++) {
    const ids = groups.get(rank) ?? [];
    rankMaxWidth[rank] = Math.max(140, ...ids.map((id) => widths.get(id) ?? 140));
  }

  const rankOffset: number[] = [0];
  for (let rank = 1; rank <= maxRank; rank++) {
    rankOffset[rank] =
      rankOffset[rank - 1] + rankMaxWidth[rank - 1] + (isLR ? RANK_GAP_LR : RANK_GAP_TD);
  }

  const layoutNodes: LayoutNode[] = [];

  for (let rank = 0; rank <= maxRank; rank++) {
    const ids = groups.get(rank) ?? [];
    const count = ids.length;
    const siblingGap = isLR ? SIBLING_GAP_LR : SIBLING_GAP_TD;

    let totalCross = 0;
    for (let i = 0; i < count; i++) {
      totalCross += widths.get(ids[i]) ?? 140;
      if (i < count - 1) totalCross += siblingGap;
    }

    let crossCursor = -totalCross / 2;

    ids.forEach((id) => {
      const node = data.nodes.find((n) => n.id === id)!;
      const w = widths.get(id) ?? 140;
      const crossCenter = crossCursor + w / 2;
      crossCursor += w + siblingGap;

      let x = 0;
      let y = 0;

      if (isLR) {
        x = rankOffset[rank];
        y = crossCenter - NODE_H / 2;
      } else {
        x = crossCenter - w / 2;
        y = rankOffset[rank];
      }

      layoutNodes.push({
        ...node,
        x,
        y,
        width: w,
        height: NODE_H,
      });
    });
  }

  return layoutNodes;
}

function applySubgraphGrouping(
  nodes: LayoutNode[],
  data: DiagramData
): LayoutDiagramData["subgraphRects"] {
  const rects: LayoutDiagramData["subgraphRects"] = [];

  for (const sg of data.subgraphs) {
    const members = nodes.filter((n) => n.subgraph === sg.id);
    if (members.length === 0) continue;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const n of members) {
      minX = Math.min(minX, n.x);
      minY = Math.min(minY, n.y);
      maxX = Math.max(maxX, n.x + n.width);
      maxY = Math.max(maxY, n.y + n.height);
    }

    rects.push({
      id: sg.id,
      title: sg.title,
      x: minX - SUBGRAPH_PAD,
      y: minY - SUBGRAPH_PAD - 18,
      width: maxX - minX + SUBGRAPH_PAD * 2,
      height: maxY - minY + SUBGRAPH_PAD * 2 + 18,
    });
  }

  return rects;
}

function computeBounds(
  nodes: LayoutNode[],
  subgraphRects: LayoutDiagramData["subgraphRects"]
) {
  if (nodes.length === 0) {
    return { minX: 0, minY: 0, maxX: 400, maxY: 300, width: 400, height: 300 };
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const n of nodes) {
    minX = Math.min(minX, n.x);
    minY = Math.min(minY, n.y);
    maxX = Math.max(maxX, n.x + n.width);
    maxY = Math.max(maxY, n.y + n.height);
  }

  for (const r of subgraphRects) {
    minX = Math.min(minX, r.x);
    minY = Math.min(minY, r.y);
    maxX = Math.max(maxX, r.x + r.width);
    maxY = Math.max(maxY, r.y + r.height);
  }

  const paddedMinX = minX - PADDING;
  const paddedMinY = minY - PADDING;
  const paddedMaxX = maxX + PADDING;
  const paddedMaxY = maxY + PADDING;

  return {
    minX: paddedMinX,
    minY: paddedMinY,
    maxX: paddedMaxX,
    maxY: paddedMaxY,
    width: paddedMaxX - paddedMinX,
    height: paddedMaxY - paddedMinY,
  };
}

function translateToOrigin(
  nodes: LayoutNode[],
  subgraphRects: LayoutDiagramData["subgraphRects"],
  bounds: LayoutDiagramData["bounds"]
) {
  const dx = -bounds.minX;
  const dy = -bounds.minY;
  for (const n of nodes) {
    n.x += dx;
    n.y += dy;
  }
  for (const r of subgraphRects) {
    r.x += dx;
    r.y += dy;
  }
}

export function layoutDiagram(data: DiagramData): LayoutDiagramData {
  if (data.nodes.length === 0) {
    return {
      ...data,
      nodes: [],
      bounds: { minX: 0, minY: 0, maxX: 400, maxY: 300, width: 400, height: 300 },
      subgraphRects: [],
    };
  }

  const ranks = assignRanks(data);
  const nodes = placeNodes(data, ranks, data.direction);
  const subgraphRects = applySubgraphGrouping(nodes, data);
  const bounds = computeBounds(nodes, subgraphRects);
  translateToOrigin(nodes, subgraphRects, bounds);

  const normalizedBounds = computeBounds(nodes, subgraphRects);

  return {
    ...data,
    nodes,
    bounds: normalizedBounds,
    subgraphRects,
  };
}
