import { apiFetch } from "./client";
import type { Category } from "@/lib/types";

export async function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("/categories");
}
