import { admin } from "@/supabase/admin";

export async function POST(req) {
  const { id } = await req.json();
  const {
    data: {
      user: { email },
    },
    error,
  } = await admin.auth.admin.getUserById(id);
  if (error)
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  return Response.json(email);
}
