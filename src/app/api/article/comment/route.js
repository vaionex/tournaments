import { admin } from "@/supabase/admin";
import { getUser } from "@/supabase/server";

export async function POST(req) {
  const { content, slug, parent_id = null } = await req.json();
  const { id: user_id } = await getUser();
  const {
    data: { id },
  } = await admin
    .from("articles")
    .select("id")
    .eq("slug", slug)
    .limit(1)
    .single()
    .throwOnError();

  await admin
    .from("comments")
    .insert({
      article_id: id,
      content,
      user_id,
      parent_id,
    })
    .throwOnError();

  return Response.json({ success: true });
}
