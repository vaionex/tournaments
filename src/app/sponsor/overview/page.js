import {
  CurrencyDollar,
  GamingPad01,
  Play,
  Speakers02,
} from "untitledui-js-base";
import StatCard from "./components/stat-card";
import { Gamepad2, Sparkles } from "lucide-react";
import LogoMarkOutline from "@/components/icons/logo-mark-outline";
import ImpressionChart from "./components/impression-chart";
import SponsorshipsTable from "../components/sponsorships-table";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SponsorOverviewPage() {
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

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/auth/login");
  }

  const { data: userData } = await supabase
    .from("User")
    .select("rank")
    .eq("id", user.id)
    .single();

  const rank = userData?.rank || 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Sponsor Overview</h1>
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Your Rank</h2>
          <p className="text-3xl font-bold">#{rank}</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="gap-inherit flex w-full">
            <StatCard
              icon={Play}
              title="Ad Impression"
              value="0"
              unit="views"
              iconColor="text-red-600"
              iconBgColor="bg-red-600/10"
            />
            <StatCard
              icon={Gamepad2}
              title="Engagement Rate"
              value="0%"
              iconColor="text-green-600"
              iconBgColor="bg-green-600/10"
            />
            <StatCard
              icon={Sparkles}
              title="Click-through rate"
              value="0%"
              iconColor="text-yellow-600"
              iconBgColor="bg-yellow-600/10"
            />
            <StatCard
              icon={Sparkles}
              title="Conversion Rate"
              value="0%"
              iconColor="text-purple-600"
              iconBgColor="bg-purple-600/10"
            />
          </div>
          <div className="gap-inherit flex">
            <div className="h-64 flex-1">
              <ImpressionChart />
            </div>
            <div className="gap-inherit flex flex-1 flex-col">
              <StatCard
                icon={CurrencyDollar}
                title="Total Sponsorships"
                value="$0"
                iconColor="text-green-600"
                iconBgColor="bg-green-600/10"
              />

              <div className="gap-inherit flex">
                <StatCard
                  icon={GamingPad01}
                  title="Current Active Sponsorships"
                  value="0"
                  unit="events"
                  iconColor="text-primary"
                  iconBgColor="bg-primary/10"
                />
                <StatCard
                  icon={LogoMarkOutline}
                  title="Total Event"
                  value="0"
                  unit="events"
                  iconColor="text-primary"
                  iconBgColor="bg-primary/10"
                />
                <StatCard
                  icon={Speakers02}
                  title="Total Ads"
                  value="0"
                  unit="events"
                  iconColor="text-primary"
                  iconBgColor="bg-primary/10"
                />
              </div>
            </div>
          </div>
          <SponsorshipsTable />
        </div>
      </div>
    </div>
  );
}
