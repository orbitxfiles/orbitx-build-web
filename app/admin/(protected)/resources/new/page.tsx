import { createResourceAction } from "@/lib/admin/actions";

export const metadata = { title: "Admin - New Resource" };

export default function NewResourcePage() {
  return (
    <div className="max-w-2xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#666]">
        Resources
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-[#111]">Create resource</h1>
      <form action={createResourceAction} className="mt-8 space-y-4 rounded-xl border border-[#e5e7eb] bg-white p-6">
        <Field label="Title" name="title" required />
        <Field label="File URL" name="file_url" required />
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#666]">Type</span>
          <select name="type" className="h-11 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#111] outline-none">
            <option value="pdf">pdf</option>
            <option value="template">template</option>
            <option value="cheat_sheet">cheat_sheet</option>
            <option value="source_code">source_code</option>
            <option value="architecture_doc">architecture_doc</option>
          </select>
        </label>
        <Field label="Description" name="description" />
        <button className="rounded-lg bg-[#111] px-4 py-2 text-sm font-semibold text-white hover:bg-[#222]">
          Create resource
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

