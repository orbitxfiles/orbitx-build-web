import { ProjectAdminForm } from "../../../../projects/ProjectAdminForm";

type Props = {
  params: Promise<{ slug: string }>;
};

export const metadata = { title: "Admin - Edit Project" };

export default async function EditProjectPage({ params }: Props) {
  const { slug } = await params;
  return <ProjectAdminForm mode="edit" slug={slug} />;
}
