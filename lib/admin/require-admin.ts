import { redirect } from "next/navigation";
import { getMe, isAdminRole } from "@/lib/api/auth";
import { getAccessToken } from "@/lib/admin/session";

export type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export async function requireAdminUser(): Promise<AdminUser> {
  const token = await getAccessToken();
  if (!token) {
    redirect("/admin/login");
  }

  try {
    const me = await getMe(token);
    if (!isAdminRole(me.role)) {
      redirect("/admin/login?error=forbidden");
    }
    return me;
  } catch {
    redirect("/admin/login?error=session");
  }
}
