import { getResources } from "@/lib/api/resources";
import { ResourcesPage } from "@/components/resources/resources-page";

export const metadata = {
  title: "Resources",
  description:
    "Architecture templates, prompt kits, and MCP starters from the OrbitX lab.",
};

export default async function ResourcesRoute() {
  const resources = await getResources().catch(() => []);
  return <ResourcesPage resources={resources} />;
}
