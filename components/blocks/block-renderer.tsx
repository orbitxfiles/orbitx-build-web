import type { ArticleSection } from "@/lib/types";
import { slugifyHeading } from "@/lib/learn-topics";
import { CodeBlock } from "@/components/article/code-block";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function SectionCodeBlock({
  content,
  title,
}: {
  content: string;
  title?: string | null;
}) {
  const lang = title?.toLowerCase().replace(/\s+/g, "") ?? "code";
  return (
    <CodeBlock language={`language-${lang}`}>
      <code>{content}</code>
    </CodeBlock>
  );
}

export function BlockRenderer({ sections }: { sections: ArticleSection[] }) {
  const sorted = [...sections].sort((a, b) => a.order_index - b.order_index);

  return (
    <div>
      {sorted.map((block) => {
        switch (block.section_type) {
          case "heading": {
            const text = (block.title ?? block.content ?? "").trim();
            return (
              <h2 key={block.id} id={slugifyHeading(text)}>
                {text}
              </h2>
            );
          }
          case "paragraph":
            return (
              <div key={block.id}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{block.content ?? ""}</ReactMarkdown>
              </div>
            );
          case "code":
            return (
              <SectionCodeBlock
                key={block.id}
                content={block.content ?? ""}
                title={block.title}
              />
            );
          case "quote":
            return <blockquote key={block.id}>{block.content}</blockquote>;
          case "image":
            return block.content ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={block.id} src={block.content} alt={block.title ?? ""} />
            ) : null;
          case "video":
            return block.content ? (
              <div key={block.id} className="my-8 aspect-video overflow-hidden rounded-xl">
                <iframe
                  src={block.content}
                  title={block.title ?? "Video"}
                  className="h-full w-full"
                  allowFullScreen
                />
              </div>
            ) : null;
          case "architecture":
          case "diagram":
            return (
              <div
                key={block.id}
                className="my-8 rounded-xl border border-[rgba(13,67,102,0.09)] bg-[#f0f5f8] p-8 text-center text-sm text-[#4a6b82]"
              >
                {block.title ?? "Architecture diagram"}
              </div>
            );
          default:
            return block.content ? (
              <p key={block.id}>{block.content}</p>
            ) : null;
        }
      })}
    </div>
  );
}
