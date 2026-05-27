import { ProjectAdminForm } from "../../../projects/ProjectAdminForm";

export const metadata = { title: "Admin - New Project" };

export default function NewProjectPage() {
  return <ProjectAdminForm mode="create" />;
}
