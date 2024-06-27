import { updateLoginChallenge } from "@/db/server/challenges/update";

export async function POST() {
  await updateLoginChallenge();
  return Response.json({ success: true });
}
