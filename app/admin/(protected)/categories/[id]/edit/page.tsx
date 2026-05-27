import { notFound } from "next/navigation";
import { getCategories } from "@/lib/api/categories";
import { updateCategoryAction } from "@/lib/admin/actions";

export const metadata = { title: "Admin - Edit Category" };

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const categoryId = Number(id);
  const categories = await getCategories().catch(() => []);
  const category = categories.find((c) => c.id === categoryId);
  if (!category) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-white">Edit category</h1>
      <form action={updateCategoryAction} className="mt-8 space-y-4 rounded-xl border border-white/15 bg-[#18364c]/70 p-6">
        <input type="hidden" name="id" value={String(category.id)} />
        <Field label="Name" name="name" defaultValue={category.name} required />
        <Field label="Slug" name="slug" defaultValue={category.slug} required />
        <Field label="Description" name="description" defaultValue={category.description ?? ""} />
        <button className="rounded-lg bg-[#1a7a5e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1f8e6e]">
          Save category
        </button>
      </form>
    </div>
  );
}

function Field({ label, name, defaultValue, required = false }: { label: string; name: string; defaultValue?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#9ac0d7]">{label}</span>
      <input name={name} defaultValue={defaultValue} required={required} className="h-11 w-full rounded-lg border border-white/15 bg-[#0e2535] px-3 text-sm text-white outline-none focus:border-[#6da6c9]" />
    </label>
  );
}

