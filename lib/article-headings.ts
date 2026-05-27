import type { ArticleSection } from "@/lib/types";
import { slugifyHeading } from "@/lib/learn-topics";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export function extractHeadingsFromMarkdown(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  const re = /^(#{2,3})\s+(.+)$/gm;
  let match: RegExpExecArray | null;
  while ((match = re.exec(markdown)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].trim().replace(/\s+#+\s*$/, "");
    items.push({ id: slugifyHeading(text), text, level });
  }
  return items;
}

export function extractHeadingsFromSections(
  sections: ArticleSection[]
): TocItem[] {
  const sorted = [...sections].sort((a, b) => a.order_index - b.order_index);
  const items: TocItem[] = [];
  for (const s of sorted) {
    if (s.section_type !== "heading") continue;
    const text = (s.title ?? s.content ?? "").trim();
    if (!text) continue;
    items.push({ id: slugifyHeading(text), text, level: 2 });
  }
  return items;
}
