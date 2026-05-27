import { createVideoAction } from "@/lib/admin/actions";

export const metadata = { title: "Admin - New Video" };

export default function NewVideoPage() {
  return (
    <div className="max-w-2xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#666]">
        Videos
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-[#111]">Create video entry</h1>
      <form action={createVideoAction} className="mt-8 space-y-4 rounded-xl border border-[#e5e7eb] bg-white p-6">
        <Field label="Title" name="title" required />
        <Field label="Video URL" name="video_url" required />
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#666]">Platform</span>
          <select name="platform" className="h-11 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#111] outline-none">
            <option value="youtube">youtube</option>
            <option value="instagram">instagram</option>
            <option value="loom">loom</option>
            <option value="local">local</option>
          </select>
        </label>
        <button className="rounded-lg bg-[#111] px-4 py-2 text-sm font-semibold text-white hover:bg-[#222]">
          Create video
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

