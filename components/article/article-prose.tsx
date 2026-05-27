"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { isValidElement, type ReactNode } from "react";
import { slugifyHeading } from "@/lib/learn-topics";
import { CodeBlock } from "@/components/article/code-block";
import { Info } from "lucide-react";

function headingId(children: ReactNode): string {
  const text =
    typeof children === "string"
      ? children
      : Array.isArray(children)
        ? children.map((c) => (typeof c === "string" ? c : "")).join("")
        : "";
  return slugifyHeading(text);
}

function PreBlock({ children }: { children: ReactNode }) {
  let language: string | undefined;
  if (isValidElement(children) && children.props) {
    const props = children.props as { className?: string };
    language = props.className;
  }
  return <CodeBlock language={language}>{children}</CodeBlock>;
}

const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 id={headingId(children)}>{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 id={headingId(children)}>{children}</h3>
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  code: ({ className, children }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return <code className={className}>{children}</code>;
    }
    return <code>{children}</code>;
  },
  pre: ({ children }) => <PreBlock>{children}</PreBlock>,
  blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  ul: ({ children }) => <ul>{children}</ul>,
  ol: ({ children }) => <ol>{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src ?? ""} alt={alt ?? ""} />
  ),
  div: ({ className, children }) => {
    if (className?.includes("callout")) {
      return (
        <div className="callout">
          <Info className="callout-icon h-[18px] w-[18px] shrink-0 text-[#6b4fa0]" aria-hidden />
          <div>{children}</div>
        </div>
      );
    }
    return <div className={className}>{children}</div>;
  },
};

export function ArticleProse({ content }: { content: string }) {
  return (
    <div className="prose-orbitx">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
