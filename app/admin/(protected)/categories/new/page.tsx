import { createCategoryAction } from "@/lib/admin/actions";

export const metadata = { title: "Admin - New Category" };

export default function NewCategoryPage() {
  return (
    <div className="max-w-2xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#666]">
        Categories
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-[#111]">Create category</h1>
      <form action={createCategoryAction} className="mt-8 space-y-4 rounded-xl border border-[#e5e7eb] bg-white p-6">
        <Field label="Name" name="name" required />
        <Field label="Slug" name="slug" required />
        <Field label="Description" name="description" />
        <button className="rounded-lg bg-[#111] px-4 py-2 text-sm font-semibold text-white hover:bg-[#222]">
          Create category
        </button>
      </form>
    </div>
  );
}

function Field({ label, name, required = false }: { label: string; name: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#666]">{label}</span>
      <input
        name={name}
        required={required}
        className="h-11 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#111] outline-none focus:border-[#6da6c9]"
      />
    </label>
  );
}

