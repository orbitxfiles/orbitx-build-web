import { createResourceAction } from "@/lib/admin/actions";

export const metadata = { title: "Admin - New Resource" };

export default function NewResourcePage() {
  return (
    <div className="max-w-2xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9ac0d7]">
        Resources
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-white">Create resource</h1>
      <form action={createResourceAction} className="mt-8 space-y-4 rounded-xl border border-white/15 bg-[#18364c]/70 p-6">
        <Field label="Title" name="title" required />
        <Field label="File URL" name="file_url" required />
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#9ac0d7]">Type</span>
          <select name="type" className="h-11 w-full rounded-lg border border-white/15 bg-[#0e2535] px-3 text-sm text-white outline-none">
            <option value="pdf">pdf</option>
            <option value="template">template</option>
            <option value="cheat_sheet">cheat_sheet</option>
            <option value="source_code">source_code</option>
            <option value="architecture_doc">architecture_doc</option>
          </select>
        </label>
        <Field label="Description" name="description" />
        <button className="rounded-lg bg-[#1a7a5e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1f8e6e]">
          Create resource
        </button>
      </form>
    </div>
  );
}

function Field({ label, name, required = false }: { label: string; name: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#9ac0d7]">{label}</span>
      <input
        name={name}
        required={required}
        className="h-11 w-full rounded-lg border border-white/15 bg-[#0e2535] px-3 text-sm text-white outline-none focus:border-[#6da6c9]"
      />
    </label>
  );
}

