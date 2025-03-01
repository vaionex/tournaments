import { admin } from "@/supabase/admin";
import { isUserAdmin } from "@/supabase/server";

export async function POST(req) {
  const { id } = await req.json();
  const is_admin = await isUserAdmin();
  if (!is_admin)
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  await admin
    .from("WithdrawRequest")
    .update({ completed: true })
    .eq("id", id)
    .throwOnError();

  return Response.json({ success: true });
}
