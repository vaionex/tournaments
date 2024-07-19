import { admin } from "@/supabase/admin";
import { isUserAdmin } from "@/supabase/server";

export async function POST(request) {
  const { id, ...data } = await request.json();
  if (!(await isUserAdmin()))
    return Response.json({ error: "Not authorized" }, { status: 401 });

  await admin.from("Match").update(data).eq("id", id).throwOnError();
  return Response.json({ success: true });
}
