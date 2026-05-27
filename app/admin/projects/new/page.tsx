import { ProjectAdminForm } from "../ProjectAdminForm";

export const metadata = { title: "Admin - New Project" };

export default function NewProjectPage() {
  return <ProjectAdminForm mode="create" />;
}

