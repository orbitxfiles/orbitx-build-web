"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { search } from "@/lib/api/search";
import { ProjectCard } from "@/components/cards/project-card";
import { ArticleCard } from "@/components/cards/article-card";
import { PageSection } from "@/components/sections/page-section";
import Link from "next/link";

export function SearchClient() {
  const [q, setQ] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebounced(q.trim()), 350);
    return () => clearTimeout(t);
  }, [q]);

  const { data, isFetching } = useQuery({
    queryKey: ["search", debounced],
    queryFn: () => search(debounced),
    enabled: debounced.length >= 2,
  });

  return (
    <PageSection label="Search" title="Find anything">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search projects, articles, resources…"
        className="w-full rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--bg-card)] px-5 py-3.5 text-[var(--text-primary)] outline-none transition-colors duration-150 focus:border-[var(--border-hover)]"
      />
      {isFetching && (
        <p className="mt-4 text-sm text-[var(--text-muted)]">Searching…</p>
      )}
      {data && (
        <div className="mt-12 space-y-14">
          {data.projects.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.projects.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          )}
          {data.articles.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">
              {data.articles.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          )}
          {data.resources.length > 0 && (
            <ul className="space-y-3">
              {data.resources.map((r) => (
                <li key={r.id}>
                  <Link
                    href={r.file_url}
                    className="text-[var(--text-primary)] transition-colors duration-150 hover:text-[var(--accent)]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {r.title} ({r.type})
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {data.projects.length === 0 &&
            data.articles.length === 0 &&
            data.resources.length === 0 && (
              <p className="text-[var(--text-muted)]">No results for “{debounced}”.</p>
            )}
        </div>
      )}
    </PageSection>
  );
}
