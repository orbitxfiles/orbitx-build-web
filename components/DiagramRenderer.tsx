"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { parseMermaid } from "@/lib/parseMermaid";
import { layoutDiagram } from "@/lib/layoutDiagram";
import type { LayoutDiagramData, LayoutNode } from "@/lib/diagram/types";
import {
  estimatePathLength,
  getAnchors,
  getNodeCenter,
  orthogonalPath,
  pathMidpoint,
} from "@/lib/diagram/geometry";
import {
  accentMarkerId,
  collectAccentColors,
  resolveNodeIcon,
  type NodeIcon,
} from "@/lib/nodeIcons";
import { cn } from "@/lib/utils";

export interface DiagramRendererProps {
  mermaid: string;
  height?: number;
  className?: string;
  accentColor?: string;
}

const MIN_ZOOM = 0.4;
const MAX_ZOOM = 2.5;
const ZOOM_WHEEL = 0.12;
const ZOOM_BTN = 0.15;
const FIT_TRANSITION_MS = 350;

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  if (h.length < 6) return `rgba(74, 107, 130, ${alpha})`;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function DiagramSkeleton({ height }: { height: number }) {
  return (
    <svg
      width="100%"
      height={height}
      viewBox="0 0 420 120"
      aria-hidden
      className="block"
    >
      <g opacity={0.55}>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${40 + i * 130}, 36)`}>
            <rect
              width={100}
              height={44}
              rx={10}
              fill="rgba(13,67,102,0.06)"
              className="animate-pulse"
              style={{ animationDuration: "1.4s" }}
            />
            {i < 2 && (
              <path
                d="M 100 22 L 130 22"
                stroke="rgba(13,67,102,0.2)"
                strokeWidth={1.5}
                strokeDasharray="6 5"
                fill="none"
              />
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}

function DiagramNodeSvg({
  node,
  icon,
  isSelected,
  isHovered,
  isConnected,
  isDimmed,
  onSelect,
  onHover,
}: {
  node: LayoutNode;
  icon: NodeIcon;
  isSelected: boolean;
  isHovered: boolean;
  isConnected: boolean;
  isDimmed: boolean;
  onSelect: () => void;
  onHover: (active: boolean) => void;
}) {
  const { cx, cy } = getNodeCenter(node);
  const w = node.width;
  const h = node.height;
  const left = node.x;
  const top = node.y;
  const active = isSelected || isHovered;
  const accent = icon.accent;
  const iconX = left + 12;
  const iconY = cy - 8;
  const labelX = left + 36;

  return (
    <g
      opacity={isDimmed ? 0.35 : 1}
      style={{ transition: "opacity 250ms ease" }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      cursor="pointer"
    >
      {active && (
        <ellipse
          cx={cx}
          cy={cy}
          rx={w / 2 + 8}
          ry={h / 2 + 8}
          fill={hexToRgba(accent, 0.08)}
          style={{ filter: "blur(8px)", transition: "opacity 250ms ease" }}
        />
      )}

      <rect
        x={left}
        y={top}
        width={w}
        height={h}
        rx={10}
        fill={
          isSelected
            ? "rgba(255,255,255,0.98)"
            : active
              ? "rgba(255,255,255,0.96)"
              : "rgba(255,255,255,0.82)"
        }
        stroke={
          isSelected
            ? accent
            : active || isConnected
              ? hexToRgba(accent, 0.35)
              : "rgba(13, 67, 102, 0.12)"
        }
        strokeWidth={isSelected ? 2 : 1}
        filter={
          isSelected
            ? "url(#glow)"
            : active
              ? undefined
              : "url(#glass)"
        }
        style={{
          transition: "fill 200ms ease, stroke 200ms ease",
          ...(active && !isSelected
            ? { filter: "drop-shadow(0 4px 16px rgba(13,67,102,0.12))" }
            : {}),
        }}
      />

      <rect
        x={left}
        y={cy - 14}
        width={3}
        height={28}
        rx={1.5}
        fill={accent}
        opacity={0.7}
      />

      <svg
        x={iconX}
        y={iconY}
        width={16}
        height={16}
        viewBox={icon.viewBox}
        aria-hidden
      >
        <path d={icon.svgPath} fill={accent} opacity={active ? 1 : 0.75} />
      </svg>

      <text
        x={labelX}
        y={cy + 1}
        dominantBaseline="middle"
        textAnchor="start"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize={12}
        fontWeight={500}
        fill={active ? "#061d2e" : "#0a3450"}
        style={{ pointerEvents: "none", transition: "fill 200ms ease" }}
      >
        {node.label}
      </text>
    </g>
  );
}

export function DiagramRenderer({
  mermaid,
  height = 480,
  className,
  accentColor = "#1a7a5e",
}: DiagramRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pinchRef = useRef<{ dist: number; zoom: number } | null>(null);

  const [ready, setReady] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [transformAnimating, setTransformAnimating] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, panX: 0, panY: 0 });
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const layoutResult = useMemo(() => {
    try {
      const data = parseMermaid(mermaid);
      if (data.nodes.length === 0) {
        return { layout: null as LayoutDiagramData | null, error: "No nodes in diagram" };
      }
      return { layout: layoutDiagram(data), error: null as string | null };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Parse failed";
      return { layout: null, error: msg };
    }
  }, [mermaid]);

  const layout = layoutResult.layout;

  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, [layout]);

  useEffect(() => {
    setParseError(layoutResult.error);
  }, [layoutResult.error]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.12,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const animateDots = inView && tabVisible;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    try {
      if (animateDots) svg.unpauseAnimations();
      else svg.pauseAnimations();
    } catch {
      /* SMIL may be unavailable */
    }
  }, [animateDots, layout]);

  const [viewportH, setViewportH] = useState(height);
  useEffect(() => {
    if (fullscreen) setViewportH(window.innerHeight);
  }, [fullscreen]);
  const containerHeight = fullscreen ? viewportH - 32 : isMobile ? 340 : height;

  const fitToView = useCallback(
    (animated = false) => {
      if (!layout || !containerRef.current) return;
      const cw = containerRef.current.clientWidth;
      const ch = containerHeight;
      const bw = layout.bounds.width;
      const bh = layout.bounds.height;
      const nextZoom = Math.min(cw / bw, ch / bh, 1) * 0.9;
      const clamped = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, nextZoom));
      const nextPan = {
        x: (cw - bw * clamped) / 2,
        y: (ch - bh * clamped) / 2,
      };
      if (animated) {
        setTransformAnimating(true);
        setTimeout(() => setTransformAnimating(false), FIT_TRANSITION_MS);
      }
      setZoom(clamped);
      setPan(nextPan);
    },
    [layout, containerHeight]
  );

  useEffect(() => {
    if (layout && ready) fitToView(true);
  }, [layout, ready, fitToView, isMobile]);

  const accentColors = useMemo(
    () => (layout ? collectAccentColors(layout.nodes.map((n) => n.label)) : [accentColor]),
    [layout, accentColor]
  );

  const nodeMap = useMemo(
    () => new Map((layout?.nodes ?? []).map((n) => [n.id, n])),
    [layout]
  );

  const connected = useMemo(() => {
    const set = new Set<string>();
    if (!selectedId || !layout) return set;
    set.add(selectedId);
    for (const e of layout.edges) {
      if (e.from === selectedId) set.add(e.to);
      if (e.to === selectedId) set.add(e.from);
    }
    return set;
  }, [selectedId, layout]);

  const onWheel = (e: ReactWheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const oldZoom = zoom;
    const delta = e.deltaY < 0 ? ZOOM_WHEEL : -ZOOM_WHEEL;
    const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, oldZoom + delta));
    const ratio = newZoom / oldZoom;
    setPan((p) => ({
      x: mouseX - (mouseX - p.x) * ratio,
      y: mouseY - (mouseY - p.y) * ratio,
    }));
    setZoom(newZoom);
  };

  const onMouseDown = (e: ReactMouseEvent<SVGSVGElement>) => {
    if ((e.target as Element).closest("[data-diagram-node]")) return;
    setDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y });
  };

  const onMouseMove = (e: ReactMouseEvent<SVGSVGElement>) => {
    if (!dragging) return;
    setPan({
      x: dragStart.panX + (e.clientX - dragStart.x),
      y: dragStart.panY + (e.clientY - dragStart.y),
    });
  };

  const onMouseUp = () => setDragging(false);

  const onTouchStart = (e: ReactTouchEvent<SVGSVGElement>) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchRef.current = { dist: Math.hypot(dx, dy), zoom };
      return;
    }
    const t = e.touches[0];
    setDragStart({ x: t.clientX, y: t.clientY, panX: pan.x, panY: pan.y });
    setDragging(true);
  };

  const onTouchMove = (e: ReactTouchEvent<SVGSVGElement>) => {
    if (e.touches.length === 2 && pinchRef.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const ratio = dist / pinchRef.current.dist;
      setZoom(Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, pinchRef.current.zoom * ratio)));
      return;
    }
    if (!dragging) return;
    const t = e.touches[0];
    setPan({
      x: dragStart.panX + (t.clientX - dragStart.x),
      y: dragStart.panY + (t.clientY - dragStart.y),
    });
  };

  const onTouchEnd = () => {
    pinchRef.current = null;
    setDragging(false);
  };

  if (!ready) {
    return (
      <div
        className={cn("relative w-full overflow-hidden", className)}
        style={{
          height: containerHeight,
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(10px) saturate(1.3)",
          border: "1px solid rgba(13, 67, 102, 0.10)",
          borderRadius: 14,
        }}
      >
        <DiagramSkeleton height={containerHeight} />
      </div>
    );
  }

  if (!layout || parseError) {
    return (
      <div
        className={cn("relative flex w-full flex-col items-center justify-center p-6", className)}
        style={{
          height: containerHeight,
          background: "rgba(255,255,255,0.55)",
          border: "1px solid rgba(13, 67, 102, 0.10)",
          borderRadius: 14,
        }}
      >
        <p className="text-[13px] text-[#4a6b82]">Could not render diagram</p>
        <pre
          className="mt-3 max-h-40 w-full max-w-lg overflow-auto rounded-lg border border-dashed p-3 text-left text-[11px] text-[#4a6b82]"
          style={{ borderColor: "rgba(139,58,58,0.3)" }}
        >
          {mermaid}
        </pre>
      </div>
    );
  }

  const highlightEdge = (from: string, to: string) => {
    const h = hoveredId ?? selectedId;
    if (!h) return false;
    return from === h || to === h;
  };

  const selectedNode = selectedId ? nodeMap.get(selectedId) : null;
  const connectedNames = selectedId
    ? layout.edges
        .flatMap((e) => {
          if (e.from !== selectedId && e.to !== selectedId) return [];
          const other = e.from === selectedId ? e.to : e.from;
          return nodeMap.get(other)?.label ?? [];
        })
        .filter(Boolean)
    : [];

  const vbW = layout.bounds.width;
  const vbH = layout.bounds.height;

  const tooltipPos = selectedNode
    ? {
        left: pan.x + (selectedNode.x + selectedNode.width / 2) * zoom,
        top: pan.y + (selectedNode.y + selectedNode.height + 8) * zoom,
      }
    : null;

  const viewW = (containerRef.current?.clientWidth ?? 400) / zoom;
  const viewH = containerHeight / zoom;
  const viewX = Math.max(0, -pan.x / zoom);
  const viewY = Math.max(0, -pan.y / zoom);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden",
        fullscreen && "fixed inset-0 z-50 bg-[var(--bg)] p-4",
        className
      )}
      style={{
        height: fullscreen ? "100vh" : containerHeight,
        background: "rgba(255, 255, 255, 0.55)",
        backdropFilter: "blur(10px) saturate(1.3)",
        border: "1px solid rgba(13, 67, 102, 0.10)",
        borderRadius: 14,
      }}
    >
      <div
        className="absolute right-3 top-3 z-20 flex gap-0.5 rounded-lg p-1"
        style={{
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(13,67,102,0.10)",
        }}
      >
        {[
          { label: "−", fn: () => setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_BTN)) },
          { label: "+", fn: () => setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_BTN)) },
          { label: "⊡", fn: () => fitToView(true) },
          { label: "⛶", fn: () => setFullscreen((f) => !f) },
        ].map((btn) => (
          <button
            key={btn.label}
            type="button"
            onClick={btn.fn}
            className="flex h-7 w-7 items-center justify-center rounded-md text-sm text-[#4a6b82] transition-colors hover:bg-[rgba(13,67,102,0.06)] active:bg-[rgba(13,67,102,0.10)]"
            style={{ width: 28, height: 28 }}
            aria-label={btn.label}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div
        className="absolute bottom-3 right-3 z-20 overflow-hidden rounded-lg"
        style={{
          width: 120,
          height: 80,
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(13,67,102,0.10)",
        }}
      >
        <svg width={120} height={80} viewBox={`0 0 ${vbW} ${vbH}`}>
          {layout.edges.map((edge, i) => {
            const from = nodeMap.get(edge.from);
            const to = nodeMap.get(edge.to);
            if (!from || !to) return null;
            const { x1, y1, x2, y2 } = getAnchors(from, to, layout.direction);
            return (
              <path
                key={`mm-e-${i}`}
                d={orthogonalPath(x1, y1, x2, y2, layout.direction)}
                stroke="rgba(13,67,102,0.2)"
                strokeWidth={0.5}
                fill="none"
              />
            );
          })}
          {layout.nodes.map((n) => {
            const icon = resolveNodeIcon(n.label);
            return (
              <rect
                key={`mm-n-${n.id}`}
                x={n.x + n.width / 2 - 3}
                y={n.y + n.height / 2 - 2}
                width={6}
                height={4}
                fill={icon.accent}
                rx={1}
              />
            );
          })}
          <rect
            x={viewX}
            y={viewY}
            width={Math.min(viewW, vbW)}
            height={Math.min(viewH, vbH)}
            fill="rgba(13,67,102,0.08)"
            stroke="rgba(13,67,102,0.30)"
            strokeWidth={1}
          />
        </svg>
      </div>

      <svg
        ref={svgRef}
        width="100%"
        height={containerHeight}
        className={cn("block", dragging ? "cursor-grabbing" : "cursor-grab")}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={() => setSelectedId(null)}
      >
        <defs>
          <filter id="glass" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur" />
            <feComposite in="blur" in2="SourceGraphic" operator="over" />
          </filter>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {accentColors.map((accent) => (
            <marker
              key={accentMarkerId(accent)}
              id={accentMarkerId(accent)}
              viewBox="0 0 10 10"
              refX={9}
              refY={5}
              markerWidth={6}
              markerHeight={6}
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill={hexToRgba(accent, 0.6)} />
            </marker>
          ))}
          <marker
            id="arrow-default"
            viewBox="0 0 10 10"
            refX={9}
            refY={5}
            markerWidth={6}
            markerHeight={6}
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill="rgba(13,67,102,0.35)" />
          </marker>
        </defs>

        <g
          transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}
          style={{
            transition: transformAnimating
              ? `transform ${FIT_TRANSITION_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`
              : undefined,
          }}
        >
          {layout.subgraphRects.map((sg) => (
            <g key={sg.id}>
              <rect
                x={sg.x}
                y={sg.y}
                width={sg.width}
                height={sg.height}
                fill="rgba(13, 67, 102, 0.03)"
                stroke="rgba(13, 67, 102, 0.10)"
                strokeWidth={1}
                strokeDasharray="6 4"
                rx={14}
              />
              <text
                x={sg.x + 10}
                y={sg.y + 14}
                fill="#4a6b82"
                fontSize={10}
                fontWeight={500}
                letterSpacing="0.1em"
                style={{ textTransform: "uppercase" }}
              >
                {sg.title}
              </text>
            </g>
          ))}

          {layout.edges.map((edge, i) => {
            const from = nodeMap.get(edge.from);
            const to = nodeMap.get(edge.to);
            if (!from || !to) return null;

            const fromIcon = resolveNodeIcon(from.label);
            const { x1, y1, x2, y2 } = getAnchors(from, to, layout.direction);
            const d = orthogonalPath(x1, y1, x2, y2, layout.direction);
            const hl = highlightEdge(edge.from, edge.to);
            const dim =
              !!selectedId &&
              !hl &&
              !(connected.has(edge.from) && connected.has(edge.to));

            const pathLen = estimatePathLength(x1, y1, x2, y2, layout.direction);
            const dur = Math.max(1.4, Math.min(3.2, pathLen / 100));
            const mid = pathMidpoint(x1, y1, x2, y2, layout.direction);
            const strokeColor = hl
              ? hexToRgba(fromIcon.accent, 0.55)
              : "rgba(13, 67, 102, 0.18)";
            const marker = hl
              ? `url(#${accentMarkerId(fromIcon.accent)})`
              : "url(#arrow-default)";

            return (
              <g key={`${edge.from}-${edge.to}-${i}`} opacity={dim ? 0.15 : 1}>
                <path
                  d={d}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={
                    edge.style === "thick" ? 2.5 : hl ? 2 : 1.5
                  }
                  strokeDasharray={edge.style === "dashed" ? "6 5" : undefined}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  markerEnd={marker}
                  style={{
                    transition: "stroke 200ms ease, opacity 250ms ease",
                    ...(hl
                      ? { filter: `drop-shadow(0 0 4px ${hexToRgba(fromIcon.accent, 0.3)})` }
                      : {}),
                  }}
                />
                {animateDots && (
                  <circle r={3.5} fill={fromIcon.accent} opacity={hl ? 1 : 0.85}>
                    <animateMotion
                      dur={`${dur}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.38}s`}
                      path={d}
                      rotate="auto"
                    />
                  </circle>
                )}
                {edge.label && (
                  <g transform={`translate(${mid.x}, ${mid.y - 12})`}>
                    <rect
                      x={-(edge.label.length * 3.2 + 14) / 2}
                      y={-9}
                      width={edge.label.length * 3.2 + 14}
                      height={18}
                      rx={4}
                      fill="rgba(232,241,245,0.92)"
                      stroke="rgba(13,67,102,0.10)"
                      strokeWidth={0.5}
                    />
                    <text
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={10}
                      fill="#4a6b82"
                      fontWeight={400}
                    >
                      {edge.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {layout.nodes.map((node) => {
            const icon = resolveNodeIcon(node.label);
            return (
              <g key={node.id} data-diagram-node>
                <DiagramNodeSvg
                  node={node}
                  icon={icon}
                  isSelected={selectedId === node.id}
                  isHovered={hoveredId === node.id}
                  isConnected={!!selectedId && connected.has(node.id) && selectedId !== node.id}
                  isDimmed={!!selectedId && !connected.has(node.id)}
                  onSelect={() =>
                    setSelectedId((id) => (id === node.id ? null : node.id))
                  }
                  onHover={(v) => setHoveredId(v ? node.id : null)}
                />
              </g>
            );
          })}
        </g>
      </svg>

      {selectedNode && tooltipPos && (
        <div
          className="pointer-events-none absolute z-30 min-w-[160px] rounded-[10px] border p-[10px_14px]"
          style={{
            left: tooltipPos.left,
            top: tooltipPos.top,
            transform: "translateX(-50%)",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(12px)",
            borderColor: "rgba(13,67,102,0.12)",
            boxShadow: "0 8px 24px rgba(13,67,102,0.12)",
          }}
        >
          <p className="text-[12px] font-semibold text-[#0a3450]">{selectedNode.label}</p>
          <p className="mt-1 text-[11px] text-[#4a6b82]">
            {connectedNames.length} connection{connectedNames.length === 1 ? "" : "s"}
          </p>
          {connectedNames.length > 0 && (
            <p className="mt-1 text-[10px] leading-snug text-[#4a6b82]">
              {connectedNames.join(", ")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
