import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ClientLayout from "./layout";

export default async function ServerLayout({ children }) {
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

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    redirect("/auth/login");
  }

  const { data: userData, error: userError } = await supabase
    .from("User")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (userError || !userData) {
    // If there's an error or no user data, redirect to login
    redirect("/auth/login");
  }

  // Check if is_admin exists and is true
  if (!userData.is_admin) {
    redirect("/dashboard");
  }

  return <ClientLayout>{children}</ClientLayout>;
} 