import { supabase } from "./client";

export async function getUserId(access_token = undefined) {
  if (access_token) return await getUserIdFromAccessToken(access_token);

  const {
    data: {
      user: { id },
    },
    error,
  } = await supabase.auth.getUser();
  if (error) throw error;
  return id;
}

export async function getUserIdFromAccessToken(access_token) {
  const {
    data: {
      user: { id },
    },
  } = await supabase.auth.getUser(access_token);
  return id;
}

export async function getAccessToken() {
  const {
    data: {
      session: { access_token },
    },
    error,
  } = await supabase.auth.getSession();
  if (error) throw error;
  return access_token;
}
