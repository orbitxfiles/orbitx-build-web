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
      <h1 className="text-2xl font-semibold text-[#111]">Edit category</h1>
      <form action={updateCategoryAction} className="mt-8 space-y-4 rounded-xl border border-[#e5e7eb] bg-white p-6">
        <input type="hidden" name="id" value={String(category.id)} />
        <Field label="Name" name="name" defaultValue={category.name} required />
        <Field label="Slug" name="slug" defaultValue={category.slug} required />
        <Field label="Description" name="description" defaultValue={category.description ?? ""} />
        <button className="rounded-lg bg-[#111] px-4 py-2 text-sm font-semibold text-white hover:bg-[#222]">
          Save category
        </button>
      </form>
    </div>
  );
}

function Field({ label, name, defaultValue, required = false }: { label: string; name: string; defaultValue?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#666]">{label}</span>
      <input name={name} defaultValue={defaultValue} required={required} className="h-11 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#111] outline-none focus:border-[#6da6c9]" />
    </label>
  );
}

