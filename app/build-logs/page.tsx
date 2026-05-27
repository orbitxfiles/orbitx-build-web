import { BuildLogsPage } from "@/components/build-logs/build-logs-page";

export const metadata = {
  title: "Build Logs",
  description:
    "Week-by-week engineering decisions, shipped features, and lessons from the OrbitX lab.",
};

export default function BuildLogsRoute() {
  return <BuildLogsPage />;
}
