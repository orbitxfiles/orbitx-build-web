import { apiFetch } from "./client";
import type { Resource } from "@/lib/types";

export async function getResources(): Promise<Resource[]> {
  return apiFetch<Resource[]>("/resources");
}
