import { notFound } from "next/navigation";
import { ResourceCategoryView } from "@/components/resources/resource-category-view";
import { getResourceCategory } from "@/lib/resources-data";
import type { Metadata } from "next";

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: id } = await params;
  const cat = getResourceCategory(id);
  if (!cat) return { title: "Resources" };
  return {
    title: cat.title,
    description: cat.description,
  };
}

export function generateStaticParams() {
  return [
    { category: "prompt-kits" },
    { category: "system-diagrams" },
    { category: "mcp-starters" },
  ];
}

export default async function ResourceCategoryPage({ params }: Props) {
  const { category: id } = await params;
  const category = getResourceCategory(id);
  if (!category) notFound();
  return <ResourceCategoryView category={category} />;
}
