import { admin } from "@/supabase/admin";

export async function GET() {
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
