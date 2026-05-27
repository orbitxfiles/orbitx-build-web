import { notFound } from "next/navigation";
import { getResources } from "@/lib/api/resources";
import { updateResourceAction } from "@/lib/admin/actions";

export const metadata = { title: "Admin - Edit Resource" };

export default async function EditResourcePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const resourceId = Number(id);
  const resources = await getResources().catch(() => []);
  const resource = resources.find((r) => r.id === resourceId);
  if (!resource) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-[#111]">Edit resource</h1>
      <form action={updateResourceAction} className="mt-8 space-y-4 rounded-xl border border-[#e5e7eb] bg-white p-6">
        <input type="hidden" name="id" value={String(resource.id)} />
        <Field label="Title" name="title" defaultValue={resource.title} required />
        <Field label="File URL" name="file_url" defaultValue={resource.file_url} required />
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#666]">Type</span>
          <select name="type" defaultValue={resource.type} className="h-11 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#111]">
            <option value="pdf">pdf</option>
            <option value="template">template</option>
            <option value="cheat_sheet">cheat_sheet</option>
            <option value="source_code">source_code</option>
            <option value="architecture_doc">architecture_doc</option>
          </select>
        </label>
        <Field label="Description" name="description" defaultValue={resource.description ?? ""} />
        <button className="rounded-lg bg-[#111] px-4 py-2 text-sm font-semibold text-white hover:bg-[#222]">
          Save resource
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

