import { requireAdminUser } from "@/lib/admin/require-admin";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdminUser();
  return <AdminShell user={user}>{children}</AdminShell>;
}
