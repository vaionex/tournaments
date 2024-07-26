import { admin } from "@/supabase/admin";
import { getUserDetails, isUserAdmin } from "@/supabase/server";

export async function POST(req) {
  const { id, ...data } = await req.json();
  const user = await getUserDetails();
  const is_admin = await isUserAdmin();
  const canUpdate = user.id === id || is_admin;

  if (!canUpdate)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  if (!is_admin) {
    delete data.is_banned;
  }

  await admin.from("User").update(data).eq("id", id).throwOnError();
  return Response.json({ success: true });
}
