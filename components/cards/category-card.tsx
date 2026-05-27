"use client";

import Link from "next/link";
import type { Category } from "@/lib/types";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

type CategoryCardSpec = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  accent: string;
  href: string;
};

const PLACEHOLDER_CATEGORIES: CategoryCardSpec[] = [
  {
    slug: "ai-concepts",
    name: "AI Concepts",
    description: "Core AI engineering ideas — agents, RAG, evals, and model patterns.",
    icon: "A",
    accent: "#6b4fa0",
    href: "/learn?category=ai-concepts",
  },
  {
    slug: "what-broke",
    name: "What Broke",
    description: "Postmortems and debugging stories from real builds.",
    icon: "!",
    accent: "#8b3a3a",
    href: "/what-broke",
  },
  {
    slug: "frameworks",
    name: "Frameworks",
    description: "Patterns, libraries, and tools we use in production.",
    icon: "F",
    accent: "#2d5fa0",
    href: "/learn?category=frameworks",
  },
  {
    slug: "build-logs",
    name: "Build Logs",
    description: "Weekly shipping notes and progress updates.",
    icon: "B",
    accent: "#1a7a5e",
    href: "/build-logs",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

function resolveCategorySpec({
  spec,
  category,
}: {
  spec: CategoryCardSpec;
  category?: Category;
}): CategoryCardSpec {
  return {
    ...spec,
    name: category?.name ?? spec.name,
    description: category?.description ?? spec.description,
  };
}

function CategoryCardInner({
  name,
  description,
  icon,
  accent,
  href,
}: {
  name: string;
  description: string;
  icon: string;
  accent: string;
  href: string;
}) {
  return (
    <Link href={href} className="block h-full">
      <Card className="h-full cursor-pointer p-[24px]">
        <span
          className="pointer-events-none absolute top-[20px] right-[20px] text-[14px] opacity-0 transition-all duration-[200ms] group-hover:opacity-100 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
          style={{ color: accent }}
          aria-hidden
        >
          ↗
        </span>

        <div
          className="flex h-[36px] w-[36px] items-center justify-center rounded-[8px]"
          style={{
            background: `${accent}26`,
            color: accent,
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          {icon}
        </div>

        <h3 className="mt-[16px] text-[1rem] font-semibold" style={{ color: "#0a3450" }}>
          {name}
        </h3>
        <p
          className="mt-[6px] text-[0.875rem] leading-[1.6]"
          style={{ color: "#4a6b82" }}
        >
          {description}
        </p>

        <div
          className="mt-[20px] h-[2px] rounded-[2px] transition-[width] duration-[280ms] ease group-hover:w-[56px] w-[32px]"
          style={{ background: accent }}
          aria-hidden
        />
      </Card>
    </Link>
  );
}

export function CategoryGrid({ categories }: { categories: Category[] }) {
  const catBySlug = new Map(categories.map((c) => [c.slug, c] as const));

  const cards = PLACEHOLDER_CATEGORIES.map((spec) =>
    resolveCategorySpec({ spec, category: catBySlug.get(spec.slug) })
  );

  return (
    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
      {cards.map((c, i) => (
        <motion.div
          key={c.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease, delay: i * 0.07 }}
        >
          <CategoryCardInner
            name={c.name}
            description={c.description}
            icon={c.icon}
            accent={c.accent}
            href={c.href}
          />
        </motion.div>
      ))}
    </div>
  );
}
