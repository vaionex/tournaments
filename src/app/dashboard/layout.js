import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Container from "@/components/ui/container";
import Header from "../(landing)/header";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }) {
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

  const { data: userData, error: userError } = await supabase
    .from("User")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!userData || userError) {
    redirect("/login");
  }

  return (
    <Container className="mt-36">
      <Header />
      {children}
    </Container>
  );
}
