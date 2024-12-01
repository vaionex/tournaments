import { admin } from "@/supabase/admin";
import { isUserAdmin } from "@/supabase/server";

export async function GET() {
  const is_admin = await isUserAdmin();
  if (!is_admin) return Response.json([]);

  const { data: transactions } = await admin
    .from("Transaction")
    .select(
      "*, user:User!user_id(username), withdraw_request:WithdrawRequest!inner(*))",
    )
    .eq("withdraw_request.completed", false)
    .not("withdraw_request.id", "is", null)
    .order("created_at", { ascending: false })
    .throwOnError();
  return Response.json(
    transactions.map((transaction) => ({
      ...transaction.withdraw_request,
      amount: transaction.amount,
      user: transaction.user,
    })),
  );
}
