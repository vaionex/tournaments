import { createClient, getUserDetails } from "@/supabase/server";

export async function POST(req) {
  const supabase = createClient();
  const tournamentData = await req.json();
  const { admin } = await getUserDetails();

  const status = admin ? "Approved" : "Pending";

  const { data } = await supabase
    .from("Tournament")
    .insert({ ...tournamentData, status })
    .select()
    .throwOnError();

  return data[0];
}
