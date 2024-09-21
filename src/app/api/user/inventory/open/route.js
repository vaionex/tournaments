import { admin } from "@/supabase/admin";
import { GIFT_CARD_BUCKET } from "@/supabase/buckets";

export async function POST(req) {
  const { id } = await req.json();
  const { data: item } = await admin
    .from("Inventory")
    .select("*")
    .eq("id", id)
    .single()
    .throwOnError();

  const {
    data: { signedUrl },
  } = await admin.storage
    .from(GIFT_CARD_BUCKET)
    .createSignedUrl(item.file, 15 * 60);

  await admin.from("Inventory").update({ opened: true }).eq("id", id);

  return Response.json(signedUrl);
}
