import { admin } from "@/supabase/admin";

export async function POST(req) {
  const { id } = await req.json();
  await admin
    .from("WithdrawRequest")
    .update({ completed: true })
    .eq("id", id)
    .throwOnError();

  return Response.json({ success: true });
}
