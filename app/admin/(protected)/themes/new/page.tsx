import { createThemeAction } from "@/lib/admin/actions";

export const metadata = { title: "Admin - New Theme" };

export default function NewThemePage() {
  return (
    <div className="max-w-2xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9ac0d7]">
        Themes
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-white">Create theme</h1>
      <form action={createThemeAction} className="mt-8 space-y-4 rounded-xl border border-white/15 bg-[#18364c]/70 p-6">
        <Field label="Name" name="name" required />
        <Field label="Slug" name="slug" required />
        <Field label="Primary color" name="primary_color" defaultValue="#0a3450" />
        <Field label="Secondary color" name="secondary_color" defaultValue="#0d4366" />
        <Field label="Accent color" name="accent_color" defaultValue="#1a7a5e" />
        <button className="rounded-lg bg-[#1a7a5e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1f8e6e]">
          Create theme
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  required = false,
  defaultValue,
}: {
  label: string;
  name: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#9ac0d7]">{label}</span>
      <input
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="h-11 w-full rounded-lg border border-white/15 bg-[#0e2535] px-3 text-sm text-white outline-none focus:border-[#6da6c9]"
      />
    </label>
  );
}

