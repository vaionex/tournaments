import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardMenu from "@/components/ui/dashboard-menu";
import LandingLayout from "../(landing)/layout";
import { Compass03, Grid01, Wallet03 } from "untitledui-js-base";
import Container from "@/components/ui/container";

const links = [
  { name: "Overview", href: "overview", icon: Grid01 },
  { name: "Events", href: "events", icon: Compass03 },
  { name: "Wallet", href: "wallet", icon: Wallet03 },
];

export const dynamic = "force-dynamic";

export default async function SponsorLayout({ children }) {
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
    <div
      style={{
        backgroundImage: 'url("/images/dashboard-bg.webp")',
        backgroundSize: "100% 1500px",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <LandingLayout>
        <Container className="py-24">
          <DashboardMenu links={links} />
          {children}
        </Container>
      </LandingLayout>
    </div>
  );
}
