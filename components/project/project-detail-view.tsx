import Link from "next/link";
import { ArrowLeft, CircleAlert, Layers, Lightbulb, Play } from "lucide-react";
import type { ProjectDetail } from "@/lib/types";
import { getProjectAccent, getProjectMermaid } from "@/lib/project-mermaid";
import { DiagramRenderer } from "@/components/DiagramRenderer";
import { Button } from "@/components/ui/button";
import { CardSurface } from "@/components/ui/card-surface";

const DEFAULT_MERMAID = `graph TD
  Client[Client Browser]
  WS[WebSocket /audio]
  STT[Deepgram Nova-3 STT]
  LLM[Gemini Flash LLM]
  TTS[ElevenLabs TTS]
  Speaker[Speaker / WAV]
  Client -->|PCM 16kHz| WS
  WS -->|send_media| STT
  STT -->|transcripts| WS
  WS -->|prompt| LLM
  LLM -->|token stream| WS
  WS -->|text chunks| TTS
  TTS -->|PCM 24kHz| WS
  WS -->|binary TTS| Speaker`;

function SectionHeading({
  icon,
  title,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  accent: string;
}) {
  return (
    <h2 className="flex items-center gap-2.5 text-[1.2rem] font-semibold text-[var(--text-strong)]">
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full"
        style={{ background: `${accent}18`, color: accent }}
      >
        {icon}
      </span>
      {title}
    </h2>
  );
}

function statusLabel(status: ProjectDetail["status"]): string {
  switch (status) {
    case "planning":
      return "PLANNING";
    case "building":
      return "BUILDING";
    case "launched":
      return "LAUNCHED";
    case "archived":
      return "ARCHIVED";
    default:
      return "UNKNOWN";
  }
}

function roadmapStateMeta(state: ProjectDetail["roadmap"][number]["status"]) {
  if (state === "done") {
    return { label: "DONE", color: "#1a7a5e" };
  }
  if (state === "in_progress") {
    return { label: "IN PROGRESS", color: "#2d5fa0" };
  }
  return { label: "PLANNED", color: "var(--border)" };
}

export function ProjectDetailView({ project }: { project: ProjectDetail }) {
  const accent = getProjectAccent(project);
  const mermaid = getProjectMermaid(project) ?? DEFAULT_MERMAID;
  const statusText = statusLabel(project.status);
  const tech = project.techStack ?? [];
  const metaLine = [statusText, tech[0], tech[1], tech[2]]
    .filter((v) => typeof v === "string" && v.trim().length > 0)
    .join(" • ");

  const roadmap = project.roadmap ?? [];

  const lessons =
    project.lessonsLearned.length > 0
      ? project.lessonsLearned
      : [
          {
            title: "Context Window Delusion",
            body: "RAG is still superior when you treat retrieval quality as a first-class metric, not an afterthought.",
          },
          {
            title: "Prompt Engineering is SE",
            body: "Version control for prompts makes evaluation meaningful and prevents regressions from 'helpful' edits.",
          },
        ];

  return (
    <div className="min-h-screen bg-[var(--bg)] pb-24 pt-8">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Top bar */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] transition-colors duration-150 hover:text-[var(--text-primary)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
          <div className="flex flex-wrap gap-2">
            {project.githubUrl && (
              <Button href={project.githubUrl} variant="primary">
                GitHub
              </Button>
            )}
            {project.demoUrl && (
              <Button href={project.demoUrl} variant="secondary">
                Live Demo
              </Button>
            )}
          </div>
        </div>

        {/* Header */}
        <header className="mx-auto max-w-[720px] text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-sm font-bold text-white"
              style={{ background: accent }}
            >
              {project.iconLabel?.trim() || project.title.charAt(0)}
            </span>
            <h1
              className="text-left font-semibold text-[var(--text-strong)] md:text-center"
              style={{
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                lineHeight: 1.15,
                fontFamily: "var(--font-heading)",
              }}
            >
              {project.title}
            </h1>
          </div>
          <p className="mt-4 text-sm text-[var(--text-muted)]">{metaLine}</p>
          <p
            className="mx-auto mt-5 max-w-[600px] text-[1.15rem] font-medium text-[var(--text-strong)]"
            style={{ lineHeight: 1.6 }}
          >
            {project.tagline}
          </p>
        </header>

        <hr className="my-10 border-[var(--border)]" />

        {/* Two columns */}
        <div className="grid gap-12 lg:grid-cols-[62%_35%] lg:gap-[48px]">
          <div className="min-w-0 space-y-12">
            <section>
                <SectionHeading
                  icon={<CircleAlert className="h-4 w-4" />}
                  title="The Problem"
                  accent={accent}
                />
                <p
                  className="mt-4 text-[var(--text-muted)]"
                  style={{ lineHeight: 1.75 }}
                >
                  {project.problemStatement}
                </p>
              </section>

            <section>
              <SectionHeading
                icon={<Layers className="h-4 w-4" />}
                title="Architecture"
                accent={accent}
              />
              <div
                className="diagram-container mt-4"
                style={{
                  background: "var(--bg-card)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: 16,
                  overflow: "hidden",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <DiagramRenderer
                  mermaid={mermaid}
                  height={440}
                  accentColor={accent}
                />
              </div>
              <p className="mt-3 text-center text-xs text-[var(--text-muted)]">
                {project.architectureOverview}
              </p>
            </section>

            {project.coreFeatures.length > 0 && (
              <section>
                <SectionHeading
                  icon={<Layers className="h-4 w-4" />}
                  title="Core Features"
                  accent={accent}
                />
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {project.coreFeatures.slice(0, 4).map((f) => (
                    <div
                      key={f.title}
                      className="flex gap-3 rounded-[10px] border border-[var(--border)] bg-[var(--bg-card)] p-[16px_20px] shadow-[var(--shadow-card)] transition-all duration-[280ms] hover:-translate-y-[2px] hover:shadow-[var(--shadow-hover)]"
                    >
                      <span
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                        style={{ background: accent }}
                      />
                      <div>
                        <p className="font-semibold text-[var(--text-strong)]">{f.title}</p>
                        {f.description ? (
                          <p className="mt-1 text-sm text-[var(--text-muted)]">
                            {f.description}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section
              className="rounded-[14px] p-7 md:p-8"
              style={{ background: "var(--project-accent-dark, #0d2d44)" }}
            >
              <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                <Lightbulb className="h-5 w-5" style={{ color: accent }} />
                Lessons Learned
              </h2>
              <div className="mt-6 space-y-6">
                {lessons.map((lesson, i) => (
                  <div key={lesson.title}>
                    {i > 0 && (
                      <hr className="mb-6 border-[rgba(255,255,255,0.1)]" />
                    )}
                    <p className="font-semibold text-white">{lesson.title}</p>
                    <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                      {lesson.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            <CardSurface accentColor={accent} hover={false} className="border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)]">
              <h3 className="text-sm font-semibold text-[var(--text-strong)]">Tech Stack</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.length > 0 ? (
                  project.techStack.map((t) => (
                    <span
                      key={t}
                      className="rounded-md px-2.5 py-1 text-[11px] font-semibold tracking-wide"
                      style={{
                        background: `${accent}1f`,
                        color: accent,
                      }}
                    >
                      {t}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-[var(--text-muted)]">—</span>
                )}
              </div>
            </CardSurface>

            <CardSurface accentColor={accent} hover={false} className="border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)]">
              <h3 className="text-sm font-semibold text-[var(--text-strong)]">Roadmap</h3>
              <ul className="mt-5 space-y-0">
                {roadmap.map((item, i) => {
                  const meta = roadmapStateMeta(item.status);
                  const borderColor = meta.color;
                  return (
                    <li
                      key={item.milestone}
                      className="relative flex gap-3 pb-6 last:pb-0"
                    >
                      {i < roadmap.length - 1 && (
                        <span
                          className="absolute left-[5px] top-4 h-[calc(100%-8px)] w-px border-l border-dashed border-[var(--border)]"
                          aria-hidden
                        />
                      )}
                      <span
                        className="mt-1 h-full w-[3px] shrink-0 rounded-full"
                        style={{ background: borderColor, minHeight: 32 }}
                      />
                      <div>
                        <p
                          className="text-[10px] font-medium uppercase tracking-wider"
                          style={{ color: borderColor }}
                        >
                          {meta.label}
                        </p>
                        <p className="mt-0.5 text-[13px] font-medium text-[var(--text-strong)]">
                          {item.milestone}
                        </p>
                        <p className="text-[10px] text-[var(--text-muted)]">
                          {item.date}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </CardSurface>

            {project.walkthroughUrl && (
              <CardSurface accentColor={accent} hover={false} className="overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] p-0 shadow-[var(--shadow-card)]">
                <div
                  className="relative flex aspect-video items-center justify-center"
                  style={{ background: "var(--project-accent-dark, #0d2d44)" }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95">
                    <Play className="ml-0.5 h-4 w-4" style={{ color: "var(--project-accent-dark, #0d2d44)" }} fill="currentColor" />
                  </div>
                </div>
                <div className="p-4 text-center">
                  <p className="text-sm font-medium text-[var(--text-strong)]">
                    Watch Build Walkthrough
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    {(project.walkthroughDuration
                      ? `${project.walkthroughDuration} `
                      : "") + "engineering deep-dive"}
                  </p>
                  <Link
                    href={project.walkthroughUrl}
                    className="mt-2 inline-block text-xs text-[var(--text-primary)] hover:underline"
                  >
                    Open demo →
                  </Link>
                </div>
              </CardSurface>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
