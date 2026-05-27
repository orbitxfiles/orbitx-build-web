import Link from "next/link";
import { FileText, LayoutGrid, Terminal } from "lucide-react";

const CARDS = [
  { title: "Prompt Kits", count: "12 templates", icon: FileText },
  { title: "System Diagrams", count: "8 blueprints", icon: LayoutGrid },
  { title: "MCP Starters", count: "5 scaffolds", icon: Terminal },
] as const;

export function BuildersToolkit() {
  return (
    <section className="px-8 pb-24 pt-4">
      <div
        className="mx-auto max-w-[1100px] rounded-[20px] px-8 py-20 text-center md:px-16"
        style={{ background: "#0a3450" }}
      >
        <h2
          className="font-bold text-white"
          style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.15 }}
        >
          The Builder&apos;s{" "}
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            Toolkit.
          </span>
        </h2>
        <p
          className="mx-auto mt-4 max-w-[520px] text-[0.95rem] leading-relaxed"
          style={{ color: "rgba(255,255,255,0.60)" }}
        >
          Curated prompts, diagram templates, and MCP starters — the same assets
          we use when shipping OrbitX projects.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {CARDS.map(({ title, count, icon: Icon }) => (
            <div
              key={title}
              className="rounded-xl border p-6 text-left transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.07)",
                borderColor: "rgba(255,255,255,0.12)",
              }}
            >
              <Icon
                className="h-5 w-5"
                style={{ color: "rgba(255,255,255,0.5)" }}
                aria-hidden
              />
              <p className="mt-3 text-[0.95rem] font-semibold text-white">{title}</p>
              <p
                className="mt-1 text-xs uppercase tracking-[0.08em]"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {count}
              </p>
            </div>
          ))}
        </div>

        <Link
          href="/resources"
          className="mt-10 inline-block rounded-lg px-7 py-2.5 text-[0.9rem] font-semibold transition-all duration-200 hover:-translate-y-px"
          style={{ background: "#ffffff", color: "#0a3450" }}
        >
          Access Resources
        </Link>
      </div>
    </section>
  );
}
