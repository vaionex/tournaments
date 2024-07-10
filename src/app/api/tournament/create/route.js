import { admin } from "@/supabase/admin";
import { getUserDetails } from "@/supabase/server";

export async function POST(req) {
  const tournamentData = await req.json();
  const { admin: isAdmin, id: user_id } = await getUserDetails();

  const status = isAdmin ? "Approved" : "Pending";

  const { data } = await admin
    .from("Tournament")
    .insert({ ...tournamentData, status, user_id })
    .select()
    .throwOnError();

  return Response.json(data[0]);
}
