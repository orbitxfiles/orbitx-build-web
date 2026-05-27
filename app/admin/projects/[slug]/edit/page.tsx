import { ProjectAdminForm } from "../../ProjectAdminForm";

type Props = {
  params: { slug: string };
};

export const metadata = { title: "Admin - Edit Project" };

export default function EditProjectPage({ params }: Props) {
  return <ProjectAdminForm mode="edit" slug={params.slug} />;
}

