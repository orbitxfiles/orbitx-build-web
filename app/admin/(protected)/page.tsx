import Link from "next/link";
import { ArrowUpRight, FolderPlus, Pencil, ExternalLink } from "lucide-react";

export const metadata = { title: "Admin" };

const ACTIONS = [
  {
    href: "/admin/projects/new",
    title: "New project",
    description: "Create a project with architecture, roadmap, and features.",
    icon: FolderPlus,
  },
  {
    href: "/admin/projects/orbitx-voice-pipeline/edit",
    title: "Edit demo project",
    description: "Update the voice pipeline showcase and Mermaid diagram.",
    icon: Pencil,
  },
  {
    href: "/projects/orbitx-voice-pipeline",
    title: "View live page",
    description: "Open the public project page in a new tab.",
    icon: ExternalLink,
    external: true,
  },
];

export default function AdminPage() {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#999]">
        Content
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#111]">
        Admin
      </h1>
      <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-[#666]">
        Signed-in admin tools for managing OrbitX projects. Sessions use secure
        httpOnly cookies — no manual JWT paste.
      </p>

      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          const className =
            "group flex flex-col rounded-lg border border-[#e8eaed] bg-white p-5 transition-all hover:border-[#d0d4d9] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]";
          const inner = (
            <>
              <Icon className="h-4 w-4 text-[#888] group-hover:text-[#333]" />
              <p className="mt-4 text-[14px] font-medium text-[#111]">
                {action.title}
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-[#888]">
                {action.description}
              </p>
              <ArrowUpRight className="mt-4 h-3.5 w-3.5 text-[#ccc] group-hover:text-[#666]" />
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
    </div>
  );
}
