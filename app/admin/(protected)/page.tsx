import Link from "next/link";
import { ArrowUpRight, FolderPlus, ExternalLink } from "lucide-react";
import { getAccessToken } from "@/lib/admin/session";
import { apiFetch } from "@/lib/api/client";
import { getProjects } from "@/lib/api/projects";
import { getCategories } from "@/lib/api/categories";
import { getResources } from "@/lib/api/resources";
import { getThemes } from "@/lib/api/themes";
import type {
  Article,
  PaginatedArticles,
  PaginatedProjects,
  Video,
} from "@/lib/types";

export const metadata = { title: "Admin" };

const ACTIONS = [
  {
    href: "/admin/projects/new",
    title: "New project",
    description: "Create a project with architecture, roadmap, and features.",
    icon: FolderPlus,
  },
  {
    href: "/admin/articles/new",
    title: "New article",
    description: "Create a draft article and publish later.",
    icon: FolderPlus,
  },
  {
    href: "/admin/categories/new",
    title: "New category",
    description: "Add a new taxonomy category.",
    icon: FolderPlus,
  },
  {
    href: "/admin/resources/new",
    title: "New resource",
    description: "Add downloadable files and guides.",
    icon: FolderPlus,
  },
  {
    href: "/admin/videos/new",
    title: "New video",
    description: "Add new video reference entries.",
    icon: FolderPlus,
  },
  {
    href: "/admin/themes/new",
    title: "New theme",
    description: "Create section design themes.",
    icon: FolderPlus,
  },
  {
    href: "/projects/orbitx-voice-pipeline",
    title: "View live page",
    description: "Open the public project page in a new tab.",
    icon: ExternalLink,
    external: true,
  },
];

async function getAllProjects(): Promise<PaginatedProjects["items"]> {
  const [publicRes, unlistedRes, privateRes] = await Promise.all([
    getProjects({ page: 1, pageSize: 100, visibility: "public" }).catch(
      () => ({ items: [] as PaginatedProjects["items"] })
    ),
    getProjects({ page: 1, pageSize: 100, visibility: "unlisted" }).catch(
      () => ({ items: [] as PaginatedProjects["items"] })
    ),
    getProjects({ page: 1, pageSize: 100, visibility: "private" }).catch(
      () => ({ items: [] as PaginatedProjects["items"] })
    ),
  ]);

  return [...publicRes.items, ...unlistedRes.items, ...privateRes.items].sort(
    (a, b) => b.updatedAt.localeCompare(a.updatedAt)
  );
}

async function getAllArticles(token: string): Promise<Article[]> {
  const data = await apiFetch<PaginatedArticles>(
    "/articles?page=1&page_size=200&published_only=false",
    { token, cache: "no-store" }
  );
  return data.items;
}

type AuditLogItem = {
  id: number;
  actor_email: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  meta?: { path?: string | null };
  created_at: string;
};

export default async function AdminPage() {
  const token = await getAccessToken();
  const [projects, categories, resources, themes, videos, articles, auditLogs] =
    await Promise.all([
      getAllProjects().catch(() => []),
      getCategories().catch(() => []),
      getResources().catch(() => []),
      getThemes().catch(() => []),
      apiFetch<Video[]>("/videos", {
        token,
        cache: "no-store",
      }).catch(() => []),
      token ? getAllArticles(token).catch(() => []) : Promise.resolve([]),
      token
        ? apiFetch<{ items: AuditLogItem[] }>("/audit-logs?page=1&page_size=50", {
            token,
            cache: "no-store",
          }).then((res) => res.items)
        : Promise.resolve([]),
    ]);

  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#999]">
        Admin
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">
        Content dashboard
      </h1>
      <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-[#b9d2e2]">
        Everything currently stored in backend APIs. Use this page to verify what
        is live in projects, articles, taxonomy, and media.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <MetricCard label="Projects" value={projects.length} />
        <MetricCard label="Articles" value={articles.length} />
        <MetricCard label="Categories" value={categories.length} />
        <MetricCard label="Resources" value={resources.length} />
        <MetricCard label="Videos" value={videos.length} />
        <MetricCard label="Themes" value={themes.length} />
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          const className =
            "group flex flex-col rounded-lg border border-white/15 bg-[#18364c]/70 p-5 transition-all hover:border-[#4e89ad] hover:bg-[#1d3f57]";
          const inner = (
            <>
              <Icon className="h-4 w-4 text-[#95bcd2] group-hover:text-[#dcecf6]" />
              <p className="mt-4 text-[14px] font-medium text-white">
                {action.title}
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-[#b9d2e2]">
                {action.description}
              </p>
              <ArrowUpRight className="mt-4 h-3.5 w-3.5 text-[#95bcd2] group-hover:text-white" />
            </>
          );
          return action.external ? (
            <a
              key={action.href}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {inner}
            </a>
          ) : (
            <Link key={action.href} href={action.href} className={className}>
              {inner}
            </Link>
          );
        })}
      </div>

      <Section title="Projects">
        <div className="overflow-hidden rounded-lg border border-[#e8eaed] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f7f8fa] text-xs uppercase tracking-wide text-[#777]">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Visibility</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-t border-[#eef1f4]">
                  <td className="px-4 py-3 font-medium text-[#111]">{project.title}</td>
                  <td className="px-4 py-3 text-[#666]">{project.status}</td>
                  <td className="px-4 py-3 text-[#666]">{project.visibility}</td>
                  <td className="px-4 py-3 text-[#666]">
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/projects/${project.slug}/edit`}
                        className="text-[#0a3450] hover:underline"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="text-[#4a6b82] hover:underline"
                      >
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Articles">
        <div className="overflow-hidden rounded-lg border border-[#e8eaed] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f7f8fa] text-xs uppercase tracking-wide text-[#777]">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Published</th>
                <th className="px-4 py-3">Visibility</th>
                <th className="px-4 py-3">Updated</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-t border-[#eef1f4]">
                  <td className="px-4 py-3 font-medium text-[#111]">{article.title}</td>
                  <td className="px-4 py-3 text-[#666]">
                    {article.published ? "yes" : "no"}
                  </td>
                  <td className="px-4 py-3 text-[#666]">{article.visibility}</td>
                  <td className="px-4 py-3 text-[#666]">
                    {new Date(article.updated_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Taxonomy & media">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SimpleList title="Categories" items={categories.map((c) => c.name)} />
          <SimpleList title="Themes" items={themes.map((t) => t.name)} />
          <SimpleList title="Resources" items={resources.map((r) => r.title)} />
          <SimpleList title="Videos" items={videos.map((v) => v.title)} />
        </div>
      </Section>

      <Section title="Audit logs">
        <div className="overflow-hidden rounded-lg border border-[#e8eaed] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f7f8fa] text-xs uppercase tracking-wide text-[#777]">
              <tr>
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3">Actor</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Entity</th>
                <th className="px-4 py-3">Path</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.length === 0 ? (
                <tr className="border-t border-[#eef1f4]">
                  <td colSpan={5} className="px-4 py-4 text-[#888]">
                    No audit events yet.
                  </td>
                </tr>
              ) : (
                auditLogs.map((log) => (
                  <tr key={log.id} className="border-t border-[#eef1f4]">
                    <td className="px-4 py-3 text-[#666]">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-[#333]">
                      {log.actor_email ?? "anonymous"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-md bg-[#f0f5f8] px-2 py-1 text-xs font-semibold text-[#0a3450]">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#666]">
                      {log.entity_type}
                      {log.entity_id ? ` #${log.entity_id}` : ""}
                    </td>
                    <td className="px-4 py-3 text-[#666]">
                      {log.meta?.path ?? "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-[#e8eaed] bg-white px-4 py-3">
      <p className="text-[11px] uppercase tracking-wide text-[#888]">{label}</p>
      <p className="mt-1 text-xl font-semibold text-[#111]">{value}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="mb-3 text-base font-semibold text-[#111]">{title}</h2>
      {children}
    </section>
  );
}

function SimpleList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-[#e8eaed] bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#777]">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-[#333]">
        {items.length === 0 ? (
          <li className="text-[#888]">No data</li>
        ) : (
          items.slice(0, 12).map((item) => <li key={item}>• {item}</li>)
        )}
      </ul>
    </div>
  );
}
