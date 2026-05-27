import { notFound } from "next/navigation";
import { apiFetch } from "@/lib/api/client";
import type { Video } from "@/lib/types";
import { updateVideoAction } from "@/lib/admin/actions";

export const metadata = { title: "Admin - Edit Video" };

export default async function EditVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const videoId = Number(id);
  const videos = await apiFetch<Video[]>("/videos", { cache: "no-store" }).catch(() => []);
  const video = videos.find((v) => v.id === videoId);
  if (!video) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-white">Edit video</h1>
      <form action={updateVideoAction} className="mt-8 space-y-4 rounded-xl border border-white/15 bg-[#18364c]/70 p-6">
        <input type="hidden" name="id" value={String(video.id)} />
        <Field label="Title" name="title" defaultValue={video.title} required />
        <Field label="Video URL" name="video_url" defaultValue={video.video_url} required />
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#9ac0d7]">Platform</span>
          <select name="platform" defaultValue={video.platform} className="h-11 w-full rounded-lg border border-white/15 bg-[#0e2535] px-3 text-sm text-white">
            <option value="youtube">youtube</option>
            <option value="instagram">instagram</option>
            <option value="loom">loom</option>
            <option value="local">local</option>
          </select>
        </label>
        <button className="rounded-lg bg-[#1a7a5e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1f8e6e]">
          Save video
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

