import type { DiagramDirection, LayoutNode } from "@/lib/diagram/types";

const CORNER_RADIUS = 16;

export function getNodeCenter(n: LayoutNode) {
  return { cx: n.x + n.width / 2, cy: n.y + n.height / 2 };
}

export function getAnchors(
  from: LayoutNode,
  to: LayoutNode,
  direction: DiagramDirection
): { x1: number; y1: number; x2: number; y2: number } {
  const isLR = direction === "LR";
  if (isLR) {
    return {
      x1: from.x + from.width,
      y1: from.y + from.height / 2,
      x2: to.x,
      y2: to.y + to.height / 2,
    };
  }
  return {
    x1: from.x + from.width / 2,
    y1: from.y + from.height,
    x2: to.x + to.width / 2,
    y2: to.y,
  };
}

/** Orthogonal routing with rounded corners (LR or TD). */
export function orthogonalPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  direction: DiagramDirection,
  cornerRadius = CORNER_RADIUS
): string {
  const isLR = direction === "LR";
  const r = Math.min(cornerRadius, Math.abs((isLR ? x2 - x1 : y2 - y1) / 4) || cornerRadius);

  if (isLR) {
    if (Math.abs(y1 - y2) < 1) {
      return `M ${x1} ${y1} L ${x2} ${y2}`;
    }
    const midX = (x1 + x2) / 2;
    const dy = y2 > y1 ? 1 : -1;
    return [
      `M ${x1} ${y1}`,
      `L ${midX - r} ${y1}`,
      `Q ${midX} ${y1} ${midX} ${y1 + dy * r}`,
      `L ${midX} ${y2 - dy * r}`,
      `Q ${midX} ${y2} ${midX + r} ${y2}`,
      `L ${x2} ${y2}`,
    ].join(" ");
  }

  if (Math.abs(x1 - x2) < 1) {
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }
  const midY = (y1 + y2) / 2;
  const dx = x2 > x1 ? 1 : -1;
  return [
    `M ${x1} ${y1}`,
    `L ${x1} ${midY - r}`,
    `Q ${x1} ${midY} ${x1 + dx * r} ${midY}`,
    `L ${x2 - dx * r} ${midY}`,
    `Q ${x2} ${midY} ${x2} ${midY + r}`,
    `L ${x2} ${y2}`,
  ].join(" ");
}

function samplePolyline(points: { x: number; y: number }[]): number {
  let len = 0;
  for (let i = 1; i < points.length; i++) {
    len += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
  }
  return len;
}

function lrPolylinePoints(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  r: number
): { x: number; y: number }[] {
  if (Math.abs(y1 - y2) < 1) return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
  const midX = (x1 + x2) / 2;
  const dy = y2 > y1 ? 1 : -1;
  return [
    { x: x1, y: y1 },
    { x: midX - r, y: y1 },
    { x: midX, y: y1 + dy * r },
    { x: midX, y: y2 - dy * r },
    { x: midX + r, y: y2 },
    { x: x2, y: y2 },
  ];
}

function tdPolylinePoints(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  r: number
): { x: number; y: number }[] {
  if (Math.abs(x1 - x2) < 1) return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
  const midY = (y1 + y2) / 2;
  const dx = x2 > x1 ? 1 : -1;
  return [
    { x: x1, y: y1 },
    { x: x1, y: midY - r },
    { x: x1 + dx * r, y: midY },
    { x: x2 - dx * r, y: midY },
    { x: x2, y: midY + r },
    { x: x2, y: y2 },
  ];
}

export function estimatePathLength(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  direction: DiagramDirection
): number {
  const r = CORNER_RADIUS;
  const pts =
    direction === "LR"
      ? lrPolylinePoints(x1, y1, x2, y2, r)
      : tdPolylinePoints(x1, y1, x2, y2, r);
  return samplePolyline(pts);
}

export function pathMidpoint(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  direction: DiagramDirection
): { x: number; y: number } {
  const r = CORNER_RADIUS;
  const pts =
    direction === "LR"
      ? lrPolylinePoints(x1, y1, x2, y2, r)
      : tdPolylinePoints(x1, y1, x2, y2, r);
  const total = samplePolyline(pts);
  const half = total / 2;
  let acc = 0;
  for (let i = 1; i < pts.length; i++) {
    const seg = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    if (acc + seg >= half) {
      const t = (half - acc) / seg;
      return {
        x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * t,
        y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * t,
      };
    }
    acc += seg;
  }
  return pts[pts.length - 1];
}
