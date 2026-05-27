export type NodeShape = "rect" | "rounded" | "diamond" | "stadium";
export type EdgeStyle = "solid" | "dashed" | "thick";
export type DiagramDirection = "TD" | "LR" | "TB";

export interface DiagramNode {
  id: string;
  label: string;
  shape: NodeShape;
  subgraph?: string;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  style: EdgeStyle;
}

export interface DiagramSubgraph {
  id: string;
  title: string;
  nodeIds: string[];
}

export interface DiagramData {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  subgraphs: DiagramSubgraph[];
  direction: DiagramDirection;
}

export interface LayoutNode extends DiagramNode {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LayoutBounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
}

export interface LayoutDiagramData extends DiagramData {
  nodes: LayoutNode[];
  bounds: LayoutBounds;
  subgraphRects: {
    id: string;
    title: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }[];
}
