import { apiFetch } from "./client";
import type { SearchResults } from "@/lib/types";

export async function search(query: string): Promise<SearchResults> {
  return apiFetch<SearchResults>(`/search?q=${encodeURIComponent(query)}`);
}
