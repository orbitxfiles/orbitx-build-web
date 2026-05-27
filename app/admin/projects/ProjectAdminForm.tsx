"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DiagramRenderer } from "@/components/DiagramRenderer";
import { apiFetch } from "@/lib/api/client";
import { getProject } from "@/lib/api/projects";
import type { ProjectDetail } from "@/lib/types";
import { getThemes } from "@/lib/api/themes";

type RoadmapStatus = "done" | "in_progress" | "planned";
type ProjectStatus = "planning" | "building" | "launched" | "archived";
type ProjectVisibility = "public" | "unlisted" | "private";

type FormLesson = { title: string; body: string };
type FormCoreFeature = { title: string; description?: string | null };
type FormRoadmapItem = {
  milestone: string;
  status: RoadmapStatus;
  date?: string | null;
};

type ProjectFormState = {
  title: string;
  slug: string;
  tagline: string;

  problem_statement: string;
  architecture_overview: string;
  architecture_mermaid: string;

  lessons_learned: FormLesson[];
  tech_stack: string[];
  core_features: FormCoreFeature[];
  roadmap: FormRoadmapItem[];

  thumbnail: string | null;
  banner_image: string | null;
  walkthrough_url: string | null;
  walkthrough_duration: string | null;
  github_url: string | null;
  demo_url: string | null;
  build_logs_url: string | null;

  accent_color: string;
  icon_label: string | null;

  status: ProjectStatus;
  is_featured: boolean;
  visibility: ProjectVisibility;

  theme_id: number | null;
  featured_article_ids: number[] | null;
};

const DEFAULT_MERMAID = `graph TD
  Client[Client]
  Server[Server]
  Client --> Server`;

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseFeaturedIds(input: string): number[] {
  const parts = input
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  const nums = parts.map((p) => Number(p)).filter((n) => Number.isFinite(n));
  // dedupe
  return Array.from(new Set(nums));
}

export function ProjectAdminForm({
  mode,
  slug: editSlug,
}: {
  mode: "create" | "edit";
  slug?: string;
}) {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [tokenError, setTokenError] = useState<string | null>(null);

  const [themes, setThemes] = useState<{ id: number; name: string }[]>([]);
  const [themesError, setThemesError] = useState<string | null>(null);

  const [loading, setLoading] = useState(mode === "edit");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const [featuredIdsText, setFeaturedIdsText] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const [form, setForm] = useState<ProjectFormState>({
    title: "",
    slug: "",
    tagline: "",

    problem_statement: "",
    architecture_overview: "",
    architecture_mermaid: DEFAULT_MERMAID,

    lessons_learned: [],
    tech_stack: [],
    core_features: [],
    roadmap: [],

    thumbnail: null,
    banner_image: null,
    walkthrough_url: null,
    walkthrough_duration: null,
    github_url: null,
    demo_url: null,
    build_logs_url: null,

    accent_color: "#1a7a5e",
    icon_label: null,

    status: "planning",
    is_featured: false,
    visibility: "public",

    theme_id: null,
    featured_article_ids: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadThemes() {
      try {
        setThemesError(null);
        const t = await getThemes();
        if (cancelled) return;
        setThemes(
          t.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (e) {
        if (cancelled) return;
        setThemesError("Failed to load themes.");
      }
    }

    loadThemes();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadProject() {
      if (mode !== "edit" || !editSlug) return;
      setLoading(true);
      try {
        const p: ProjectDetail = await getProject(editSlug);
        if (cancelled) return;
        setForm({
          title: p.title,
          slug: p.slug,
          tagline: p.tagline,

          problem_statement: p.problemStatement,
          architecture_overview: p.architectureOverview,
          architecture_mermaid: p.architectureMermaid ?? DEFAULT_MERMAID,

          lessons_learned: p.lessonsLearned,
          tech_stack: p.techStack,
          core_features: p.coreFeatures,
          roadmap: p.roadmap,

          thumbnail: p.thumbnail ?? null,
          banner_image: p.bannerImage ?? null,
          walkthrough_url: p.walkthroughUrl ?? null,
          walkthrough_duration: p.walkthroughDuration ?? null,
          github_url: p.githubUrl ?? null,
          demo_url: p.demoUrl ?? null,
          build_logs_url: p.buildLogsUrl ?? null,

          accent_color: p.accentColor,
          icon_label: p.iconLabel ?? null,

          status: p.status,
          is_featured: p.isFeatured,
          visibility: p.visibility,

          theme_id: p.themeId ?? null,
          featured_article_ids: p.featuredArticleIds.length
            ? p.featuredArticleIds
            : null,
        });
        setFeaturedIdsText(
          p.featuredArticleIds.length ? p.featuredArticleIds.join(", ") : ""
        );
        setSlugManuallyEdited(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadProject();
    return () => {
      cancelled = true;
    };
  }, [mode, editSlug]);

  const titleCharCount = form.title.trim().length;
  const slugCharCount = form.slug.trim().length;
  const taglineCharCount = form.tagline.trim().length;

  const previewMermaid = useMemo(() => {
    const m = form.architecture_mermaid?.trim();
    return m ? m : DEFAULT_MERMAID;
  }, [form.architecture_mermaid]);

  function setField<K extends keyof ProjectFormState>(key: K, value: ProjectFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTokenError(null);

    if (!token.trim()) {
      setTokenError("JWT token is required for admin operations.");
      return;
    }

    const payload: Record<string, unknown> = {
      ...form,
      featured_article_ids: featuredIdsText.trim()
        ? parseFeaturedIds(featuredIdsText)
        : [],
    };

    try {
      const method = mode === "create" ? "POST" : "PUT";
      const path = mode === "create" ? "/projects" : `/projects/${form.slug}`;

      await apiFetch<unknown>(path, {
        method,
        token,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      router.push(`/projects/${form.slug}`);
    } catch (err: unknown) {
      setTokenError(
        err instanceof Error ? err.message : "Failed to submit admin form."
      );
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-10">
        <p className="text-sm text-[var(--text-muted)]">Loading…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 md:px-8">
      <h1 className="text-[1.6rem] font-semibold text-[var(--text-strong)]">
        {mode === "create" ? "New Project" : "Edit Project"}
      </h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        Paste a JWT token to submit changes.
      </p>

      {tokenError ? (
        <div className="mt-4 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          {tokenError}
        </div>
      ) : null}

      {themesError ? (
        <div className="mt-4 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          {themesError}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-8 space-y-10">
        {/* Basic Info */}
        <section className="rounded-[14px] border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)]">
          <h2 className="text-sm font-semibold text-[var(--text-strong)]">
            Basic Info
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="space-y-1">
              <span className="text-xs font-semibold text-[var(--text-muted)]">
                Title *
              </span>
              <input
                value={form.title}
                onChange={(ev) => {
                  const v = ev.target.value;
                  setField("title", v);
                  if (!slugManuallyEdited) setField("slug", slugify(v));
                }}
                className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 text-sm"
              />
              <span className="text-[11px] text-[var(--text-muted)]">
                {titleCharCount}/255
              </span>
            </label>

            <label className="space-y-1">
              <span className="text-xs font-semibold text-[var(--text-muted)]">
                Slug *
              </span>
              <input
                value={form.slug}
                onChange={(ev) => {
                  setSlugManuallyEdited(true);
                  setField("slug", slugify(ev.target.value));
                }}
                className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 text-sm"
              />
              <span className="text-[11px] text-[var(--text-muted)]">
                {slugCharCount} chars
              </span>
            </label>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="space-y-1 md:col-span-2">
              <span className="text-xs font-semibold text-[var(--text-muted)]">
                Tagline * (max 120)
              </span>
              <input
                value={form.tagline}
                onChange={(ev) => setField("tagline", ev.target.value)}
                className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 text-sm"
              />
              <span className="text-[11px] text-[var(--text-muted)]">
                {taglineCharCount}/120
              </span>
            </label>

            <label className="space-y-1">
              <span className="text-xs font-semibold text-[var(--text-muted)]">
                Status *
              </span>
              <select
                value={form.status}
                onChange={(ev) => setField("status", ev.target.value as ProjectStatus)}
                className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 text-sm"
              >
                <option value="planning">planning</option>
                <option value="building">building</option>
                <option value="launched">launched</option>
                <option value="archived">archived</option>
              </select>
            </label>

            <label className="space-y-1">
              <span className="text-xs font-semibold text-[var(--text-muted)]">
                Visibility *
              </span>
              <select
                value={form.visibility}
                onChange={(ev) =>
                  setField("visibility", ev.target.value as ProjectVisibility)
                }
                className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 text-sm"
              >
                <option value="public">public</option>
                <option value="unlisted">unlisted</option>
                <option value="private">private</option>
              </select>
            </label>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <label className="space-y-1 md:col-span-1">
              <span className="text-xs font-semibold text-[var(--text-muted)]">
                Accent Color
              </span>
              <input
                type="color"
                value={form.accent_color}
                onChange={(ev) => setField("accent_color", ev.target.value)}
                className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--bg)]"
              />
              <input
                value={form.accent_color}
                onChange={(ev) => setField("accent_color", ev.target.value)}
                className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 text-sm"
              />
            </label>

            <label className="space-y-1 md:col-span-1">
              <span className="text-xs font-semibold text-[var(--text-muted)]">
                Icon Label (max 2)
              </span>
              <input
                value={form.icon_label ?? ""}
                onChange={(ev) =>
                  setField(
                    "icon_label",
                    ev.target.value.trim().slice(0, 2) || null
                  )
                }
                className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 text-sm"
                placeholder="e.g. PX"
              />
            </label>

            <label className="space-y-1 md:col-span-1">
              <span className="text-xs font-semibold text-[var(--text-muted)]">
                Theme
              </span>
              <select
                value={form.theme_id ?? ""}
                onChange={(ev) =>
                  setField(
                    "theme_id",
                    ev.target.value ? Number(ev.target.value) : null
                  )
                }
                className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 text-sm"
              >
                <option value="">(none)</option>
                {themes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <input
              id="isFeatured"
              type="checkbox"
              checked={form.is_featured}
              onChange={(ev) => setField("is_featured", ev.target.checked)}
            />
            <label htmlFor="isFeatured" className="text-sm text-[var(--text-muted)]">
              Featured
            </label>
          </div>

          <div className="mt-4">
            <label className="space-y-1">
              <span className="text-xs font-semibold text-[var(--text-muted)]">
                Featured Article IDs (comma-separated)
              </span>
              <input
                value={featuredIdsText}
                onChange={(ev) => setFeaturedIdsText(ev.target.value)}
                className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 text-sm"
                placeholder="e.g. 1, 2, 3"
              />
            </label>
          </div>
        </section>

        {/* Content */}
        <section className="rounded-[14px] border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)]">
          <h2 className="text-sm font-semibold text-[var(--text-strong)]">Content</h2>

          <div className="mt-5 space-y-4">
            <label className="space-y-2">
              <span className="text-xs font-semibold text-[var(--text-muted)]">
                Problem Statement *
              </span>
              <textarea
                value={form.problem_statement}
                onChange={(ev) => setField("problem_statement", ev.target.value)}
                className="min-h-[120px] w-full rounded-md border border-[var(--border)] bg-[var(--bg)] p-3 text-sm"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs font-semibold text-[var(--text-muted)]">
                Architecture Overview *
              </span>
              <textarea
                value={form.architecture_overview}
                onChange={(ev) => setField("architecture_overview", ev.target.value)}
                className="min-h-[90px] w-full rounded-md border border-[var(--border)] bg-[var(--bg)] p-3 text-sm"
              />
            </label>

            <label className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold text-[var(--text-muted)]">
                  Architecture Mermaid (graph)
                </span>
                <button
                  type="button"
                  className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
                  onClick={() => setShowPreview(true)}
                >
                  Preview
                </button>
              </div>
              <textarea
                value={form.architecture_mermaid}
                onChange={(ev) => setField("architecture_mermaid", ev.target.value)}
                className="min-h-[180px] w-full rounded-md border border-[var(--border)] bg-[var(--bg)] p-3 font-mono text-sm"
              />
            </label>
          </div>

          {showPreview ? (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5"
              role="dialog"
              aria-modal="true"
              onClick={() => setShowPreview(false)}
            >
              <div
                className="w-full max-w-5xl overflow-hidden rounded-[16px] border border-[var(--border)] bg-[var(--bg-card)] shadow-[var(--shadow-card)]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] p-4">
                  <h3 className="text-sm font-semibold text-[var(--text-strong)]">
                    Mermaid Preview
                  </h3>
                  <button
                    type="button"
                    className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                    onClick={() => setShowPreview(false)}
                  >
                    Close
                  </button>
                </div>
                <div className="p-4">
                  <DiagramRenderer
                    mermaid={previewMermaid}
                    height={420}
                    accentColor={form.accent_color}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </section>

        {/* Structured Data */}
        <section className="rounded-[14px] border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)]">
          <h2 className="text-sm font-semibold text-[var(--text-strong)]">
            Structured Data
          </h2>

          <div className="mt-5 space-y-8">
            {/* Tech stack */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-strong)]">Tech Stack</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {form.tech_stack.map((t, idx) => (
                  <span
                    key={`${t}-${idx}`}
                    className="flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--bg)] px-2 py-1 text-xs"
                  >
                    <span style={{ color: form.accent_color }}>{t}</span>
                    <button
                      type="button"
                      className="text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                      onClick={() =>
                        setField(
                          "tech_stack",
                          form.tech_stack.filter((_, i) => i !== idx)
                        )
                      }
                    >
                      ×
                    </button>
                  </span>
                ))}
                {form.tech_stack.length === 0 ? (
                  <span className="text-xs text-[var(--text-muted)]">No tech stack yet.</span>
                ) : null}
              </div>

              <div className="mt-3 flex gap-3">
                <input
                  type="text"
                  placeholder="Add tech & press Enter"
                  className="h-10 flex-1 rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 text-sm"
                  onKeyDown={(ev) => {
                    if (ev.key !== "Enter") return;
                    ev.preventDefault();
                    const target = ev.currentTarget;
                    const v = target.value.trim();
                    if (!v) return;
                    if (!form.tech_stack.includes(v)) {
                      setField("tech_stack", [...form.tech_stack, v]);
                    }
                    target.value = "";
                  }}
                />
              </div>
            </div>

            {/* Core Features */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-strong)]">Core Features</h3>
              <div className="mt-4 space-y-4">
                {form.core_features.map((f, idx) => (
                  <div key={`${f.title}-${idx}`} className="rounded-md border border-[var(--border)] p-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="space-y-1">
                        <span className="text-xs font-semibold text-[var(--text-muted)]">Title *</span>
                        <input
                          value={f.title}
                          onChange={(ev) => {
                            const v = ev.target.value;
                            setField(
                              "core_features",
                              form.core_features.map((x, i) =>
                                i === idx ? { ...x, title: v } : x
                              )
                            );
                          }}
                          className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 text-sm"
                        />
                      </label>
                      <label className="space-y-1">
                        <span className="text-xs font-semibold text-[var(--text-muted)]">
                          Description
                        </span>
                        <input
                          value={f.description ?? ""}
                          onChange={(ev) => {
                            const v = ev.target.value;
                            setField(
                              "core_features",
                              form.core_features.map((x, i) =>
                                i === idx ? { ...x, description: v || null } : x
                              )
                            );
                          }}
                          className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 text-sm"
                        />
                      </label>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text-primary)]"
                        onClick={() =>
                          setField(
                            "core_features",
                            form.core_features.filter((_, i) => i !== idx)
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text-primary)]"
                  onClick={() =>
                    setField("core_features", [
                      ...form.core_features,
                      { title: "", description: null },
                    ])
                  }
                >
                  Add core feature
                </button>
              </div>
            </div>

            {/* Roadmap */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-strong)]">Roadmap</h3>
              <div className="mt-4 space-y-4">
                {form.roadmap.map((r, idx) => (
                  <div key={`${r.milestone}-${idx}`} className="rounded-md border border-[var(--border)] p-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <label className="space-y-1 md:col-span-2">
                        <span className="text-xs font-semibold text-[var(--text-muted)]">Milestone *</span>
                        <input
                          value={r.milestone}
                          onChange={(ev) => {
                            const v = ev.target.value;
                            setField(
                              "roadmap",
                              form.roadmap.map((x, i) =>
                                i === idx ? { ...x, milestone: v } : x
                              )
                            );
                          }}
                          className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 text-sm"
                        />
                      </label>
                      <label className="space-y-1">
                        <span className="text-xs font-semibold text-[var(--text-muted)]">
                          Status *
                        </span>
                        <select
                          value={r.status}
                          onChange={(ev) => {
                            const v = ev.target.value as RoadmapStatus;
                            setField(
                              "roadmap",
                              form.roadmap.map((x, i) =>
                                i === idx ? { ...x, status: v } : x
                              )
                            );
                          }}
                          className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 text-sm"
                        >
                          <option value="planned">planned</option>
                          <option value="in_progress">in_progress</option>
                          <option value="done">done</option>
                        </select>
                      </label>
                      <label className="space-y-1">
                        <span className="text-xs font-semibold text-[var(--text-muted)]">
                          Date
                        </span>
                        <input
                          value={r.date ?? ""}
                          onChange={(ev) => {
                            const v = ev.target.value;
                            setField(
                              "roadmap",
                              form.roadmap.map((x, i) =>
                                i === idx ? { ...x, date: v || null } : x
                              )
                            );
                          }}
                          className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 text-sm"
                        />
                      </label>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text-primary)]"
                        onClick={() =>
                          setField(
                            "roadmap",
                            form.roadmap.filter((_, i) => i !== idx)
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text-primary)]"
                  onClick={() =>
                    setField("roadmap", [
                      ...form.roadmap,
                      { milestone: "", status: "planned", date: null },
                    ])
                  }
                >
                  Add roadmap item
                </button>
              </div>
            </div>

            {/* Lessons Learned */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-strong)]">
                Lessons Learned
              </h3>
              <div className="mt-4 space-y-4">
                {form.lessons_learned.map((l, idx) => (
                  <div key={`${l.title}-${idx}`} className="rounded-md border border-[var(--border)] p-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="space-y-1">
                        <span className="text-xs font-semibold text-[var(--text-muted)]">
                          Title *
                        </span>
                        <input
                          value={l.title}
                          onChange={(ev) => {
                            const v = ev.target.value;
                            setField(
                              "lessons_learned",
                              form.lessons_learned.map((x, i) =>
                                i === idx ? { ...x, title: v } : x
                              )
                            );
                          }}
                          className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 text-sm"
                        />
                      </label>
                      <label className="space-y-1">
                        <span className="text-xs font-semibold text-[var(--text-muted)]">
                          Body *
                        </span>
                        <textarea
                          value={l.body}
                          onChange={(ev) => {
                            const v = ev.target.value;
                            setField(
                              "lessons_learned",
                              form.lessons_learned.map((x, i) =>
                                i === idx ? { ...x, body: v } : x
                              )
                            );
                          }}
                          className="min-h-[110px] w-full rounded-md border border-[var(--border)] bg-[var(--bg)] p-3 text-sm"
                        />
                      </label>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text-primary)]"
                        onClick={() =>
                          setField(
                            "lessons_learned",
                            form.lessons_learned.filter((_, i) => i !== idx)
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text-primary)]"
                  onClick={() =>
                    setField("lessons_learned", [
                      ...form.lessons_learned,
                      { title: "", body: "" },
                    ])
                  }
                >
                  Add lesson
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Media & Links */}
        <section className="rounded-[14px] border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)]">
          <h2 className="text-sm font-semibold text-[var(--text-strong)]">Media & Links</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="space-y-1 md:col-span-2">
              <span className="text-xs font-semibold text-[var(--text-muted)]">
                Thumbnail URL
              </span>
              <input
                value={form.thumbnail ?? ""}
                onChange={(ev) => setField("thumbnail", ev.target.value || null)}
                className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 text-sm"
                placeholder="https://..."
              />
            </label>
            <label className="space-y-1 md:col-span-2">
              <span className="text-xs font-semibold text-[var(--text-muted)]">
                Banner Image URL
              </span>
              <input
                value={form.banner_image ?? ""}
                onChange={(ev) => setField("banner_image", ev.target.value || null)}
                className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 text-sm"
                placeholder="https://..."
              />
            </label>

            <label className="space-y-1">
              <span className="text-xs font-semibold text-[var(--text-muted)]">
                Walkthrough URL
              </span>
              <input
                value={form.walkthrough_url ?? ""}
                onChange={(ev) =>
                  setField("walkthrough_url", ev.target.value || null)
                }
                className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 text-sm"
                placeholder="https://..."
              />
            </label>
            <label className="space-y-1">
              <span className="text-xs font-semibold text-[var(--text-muted)]">
                Walkthrough Duration
              </span>
              <input
                value={form.walkthrough_duration ?? ""}
                onChange={(ev) =>
                  setField("walkthrough_duration", ev.target.value || null)
                }
                className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 text-sm"
                placeholder="e.g. 12 min"
              />
            </label>

            <label className="space-y-1">
              <span className="text-xs font-semibold text-[var(--text-muted)]">GitHub URL</span>
              <input
                value={form.github_url ?? ""}
                onChange={(ev) => setField("github_url", ev.target.value || null)}
                className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 text-sm"
                placeholder="https://github.com/..."
              />
            </label>
            <label className="space-y-1">
              <span className="text-xs font-semibold text-[var(--text-muted)]">Demo URL</span>
              <input
                value={form.demo_url ?? ""}
                onChange={(ev) => setField("demo_url", ev.target.value || null)}
                className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 text-sm"
                placeholder="https://..."
              />
            </label>
            <label className="space-y-1 md:col-span-2">
              <span className="text-xs font-semibold text-[var(--text-muted)]">
                Build Logs URL
              </span>
              <input
                value={form.build_logs_url ?? ""}
                onChange={(ev) =>
                  setField("build_logs_url", ev.target.value || null)
                }
                className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 text-sm"
                placeholder="https://..."
              />
            </label>
          </div>
        </section>

        {/* Token + Submit */}
        <section className="rounded-[14px] border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)]">
          <h2 className="text-sm font-semibold text-[var(--text-strong)]">
            Admin Authorization
          </h2>
          <div className="mt-4 space-y-2">
            <label className="space-y-1">
              <span className="text-xs font-semibold text-[var(--text-muted)]">
                JWT Token *
              </span>
              <input
                value={token}
                onChange={(ev) => setToken(ev.target.value)}
                className="h-10 w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 text-sm font-mono"
                placeholder="Paste JWT token here"
              />
            </label>
            <button
              type="submit"
              className="mt-2 w-full rounded-md bg-[var(--theme-primary)] px-4 py-3 text-sm font-semibold text-white hover:opacity-95"
            >
              {mode === "create" ? "Create Project" : "Save Changes"}
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}

