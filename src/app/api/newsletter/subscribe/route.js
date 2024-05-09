import { subscribeToNewsletter } from "@/sendgrid";

export async function POST(req) {
  const { email } = await req.json();
  await subscribeToNewsletter(email);
  return Response.json({ success: true });
}
