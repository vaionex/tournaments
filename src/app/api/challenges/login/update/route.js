import { LoginChallenge } from "@/db/server/challenges/login";

export async function POST() {
  await LoginChallenge.update();
  return Response.json({ success: true });
}
