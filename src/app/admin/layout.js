import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminNavigation from "./components/AdminNavigation";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

  const { data: { user }, error } = await supabase.auth.getUser();

  if (!user || error) {
    redirect("/login");
  }

  const { data: users, error: userError } = await supabase
    .from("User")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!users?.is_admin || userError) {
    redirect("/dashboard");
  }

  return (
    <div className="relative flex">
      <AdminNavigation />
      <div className="flex-1">{children}</div>
    </div>
  );
}
