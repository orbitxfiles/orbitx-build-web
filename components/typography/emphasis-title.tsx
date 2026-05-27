import { splitTitleForEmphasis } from "@/lib/title-emphasis";
import { cn } from "@/lib/utils";

export function EmphasisTitle({
  title,
  as: Tag = "h1",
  className,
  leadClassName,
  emphasisClassName,
  style,
}: {
  title: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  leadClassName?: string;
  emphasisClassName?: string;
  style?: React.CSSProperties;
}) {
  const { lead, emphasis } = splitTitleForEmphasis(title);

  return (
    <Tag className={className} style={style}>
      {lead ? (
        <>
          <span className={leadClassName}>{lead} </span>
          <em
            className={cn("font-normal not-italic", emphasisClassName)}
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
            }}
          >
            {emphasis}
          </em>
        </>
      ) : (
        <em
          className={cn("font-normal not-italic", emphasisClassName)}
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
          }}
        >
          {emphasis}
        </em>
      )}
    </Tag>
  );
}
