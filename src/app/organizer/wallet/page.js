import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function WalletPage() {
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
    .select("balance")
    .eq("id", user.id)
    .single();

  const balance = userData?.balance || 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Wallet</h1>
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Current Balance</h2>
          <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
        </div>
        {/* Add more wallet functionality here */}
      </div>
    </div>
  );
}
