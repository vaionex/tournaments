import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard/overview";

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) {
            return cookieStore.get(name)?.value;
          },
          set(name, value, options) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name, options) {
            cookieStore.set({ name, value: "", ...options });
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Check if the user exists in the User table
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userData, error: userError } = await supabase
          .from("User")
          .select("*")
          .eq("id", user.id)
          .single();

        if (userError || !userData) {
          // If user doesn't exist in User table, redirect to login
          return NextResponse.redirect(new URL("/login", request.url));
        }
      }

      // If everything is good, redirect to the next page
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  // Return the user to an error page with some instructions
  return NextResponse.redirect(new URL("/auth/auth-error", request.url));
} 