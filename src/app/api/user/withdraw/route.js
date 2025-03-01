import { createTransaction } from "@/db/server/user";
import { updateUser } from "@/db/user";
import { admin } from "@/supabase/admin";
import { getUserDetails } from "@/supabase/server";
import { z } from "zod";

export async function POST(req) {
  const user = await getUserDetails();

  const { paypal, amount } = z
    .object({
      amount: z.number().min(0).max(user.balance),
      paypal: z.string().email(),
    })
    .parse(await req.json());

  const { data: { id: withdraw_request_id } = {} } = await admin
    .from("WithdrawRequest")
    .insert({
      paypal,
    })
    .select("id")
    .limit(1)
    .single()
    .throwOnError();

  await admin.from("User").update({ paypal }).eq("id", user.id).throwOnError();
  await createTransaction(user.id, -amount, {
    withdraw_request_id,
  });

  return Response.json({ success: true });
}
