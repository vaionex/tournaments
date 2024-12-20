import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { admin } from "./admin";

export const createClient = () => {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {}
        },
        remove(name, options) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {}
        },
      },
    },
  );
};

export async function getUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getUserById(id) {
  const {
    data: { user },
    error,
  } = await admin.auth.admin.getUserById(id);
  if (error) throw error;
  const { data: users } = await admin.from("User").select().eq("id", id);
  return { ...user, ...users[0] };
}

export async function getUserDetails() {
  const supabase = createClient();
  const user = await getUser();
  const { data: users } = await supabase
    .from("User")
    .select()
    .eq("id", user.id)
    .throwOnError();
  return { ...user, ...users[0] };
}

export async function isUserAdmin() {
  const { is_admin } = await getUserDetails();
  return is_admin;
}
