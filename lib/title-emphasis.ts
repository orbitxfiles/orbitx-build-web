/** Split title for Cormorant italic emphasis on the last word or phrase. */
export function splitTitleForEmphasis(title: string): {
  lead: string;
  emphasis: string;
} {
  const trimmed = title.trim();
  const withIdx = trimmed.lastIndexOf(" with ");
  if (withIdx !== -1) {
    return {
      lead: trimmed.slice(0, withIdx + 6).trimEnd(),
      emphasis: trimmed.slice(withIdx + 6).trim(),
    };
  }

  const words = trimmed.split(/\s+/);
  if (words.length <= 1) {
    return { lead: "", emphasis: trimmed };
  }

  const last = words[words.length - 1];
  const prev = words[words.length - 2];
  if (
    words.length >= 2 &&
    ((last.length <= 12 && /^[A-Z]/.test(last) && prev.length <= 8) ||
      prev === "JSON" ||
      prev === "API" ||
      prev === "RAG")
  ) {
    return {
      lead: words.slice(0, -2).join(" "),
      emphasis: `${prev} ${last}`,
    };
  }

  return {
    lead: words.slice(0, -1).join(" "),
    emphasis: last,
  };
}
