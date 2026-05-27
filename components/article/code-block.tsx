"use client";

import { useRef, useState, type ReactNode } from "react";

export function CodeBlock({
  children,
  language,
}: {
  children: ReactNode;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  async function copy() {
    const text = preRef.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  const langLabel = language?.replace(/^language-/, "") ?? "code";

  return (
    <div className="prose-code-block relative my-8 overflow-hidden rounded-xl border border-[rgba(255,255,255,0.07)] bg-[#0d1f2d] shadow-[0_4px_24px_rgba(13,67,102,0.15)]">
      <div className="code-header absolute left-0 right-0 top-0 z-[2] flex h-9 items-center border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)] px-3.5">
        <span className="code-dot" aria-hidden />
        <span className="code-dot" aria-hidden />
        <span className="code-dot" aria-hidden />
        <span className="code-lang">{langLabel}</span>
        <button
          type="button"
          onClick={copy}
          className={`copy-btn ${copied ? "copied" : ""}`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre ref={preRef} className="!m-0 overflow-x-auto border-0 bg-transparent pt-9">
        {children}
      </pre>
    </div>
  );
}
