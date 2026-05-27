import { notFound } from "next/navigation";
import { getTheme } from "@/lib/api/themes";
import { updateThemeAction } from "@/lib/admin/actions";

export const metadata = { title: "Admin - Edit Theme" };

export default async function EditThemePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const themeId = Number(id);
  const theme = await getTheme(themeId).catch(() => null);
  if (!theme) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-[#111]">Edit theme</h1>
      <form action={updateThemeAction} className="mt-8 space-y-4 rounded-xl border border-[#e5e7eb] bg-white p-6">
        <input type="hidden" name="id" value={String(theme.id)} />
        <Field label="Name" name="name" defaultValue={theme.name} required />
        <Field label="Slug" name="slug" defaultValue={theme.slug} required />
        <Field label="Primary color" name="primary_color" defaultValue={theme.primary_color} />
        <Field label="Secondary color" name="secondary_color" defaultValue={theme.secondary_color} />
        <Field label="Accent color" name="accent_color" defaultValue={theme.accent_color} />
        <button className="rounded-lg bg-[#111] px-4 py-2 text-sm font-semibold text-white hover:bg-[#222]">
          Save theme
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

