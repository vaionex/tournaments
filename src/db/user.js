import { supabase } from "@/supabase/client";
import { getUserId } from "@/supabase/utils";
import { api } from "@/utils/api";
import { getNextRank, getRank, getRankProgressPercentage } from "@/utils/rank";
import { pickBy } from "lodash";
import { getPayouts } from "./payouts";
import { getInventory } from "./inventory";

async function uploadProfilePicture(file) {
  const id = await getUserId();
  const path = `${id}/profile-picture`;
  const { data, error } = await supabase.storage
    .from("user-public-images")
    .upload(path, file, { upsert: true });

  if (error) throw error;
  const { path: filePath } = data;
  const {
    data: { publicUrl },
  } = supabase.storage.from("user-public-images").getPublicUrl(filePath);
  
  // Profile pictures are typically used in smaller dimensions
  // Check if URL already ends with a question mark
  if (publicUrl.endsWith('?')) {
    return publicUrl + `width=200&height=200&quality=80&id=${Math.random().toString()}`;
  } else {
    return publicUrl + `?width=200&height=200&quality=80&id=${Math.random().toString()}`;
  }
}

async function uploadBanner(file) {
  const id = await getUserId();
  const path = `${id}/banner`;
  const { data, error } = await supabase.storage
    .from("user-public-images")
    .upload(path, file, { upsert: true });

  if (error) throw error;
  const { path: filePath } = data;
  const {
    data: { publicUrl },
  } = supabase.storage.from("user-public-images").getPublicUrl(filePath);
  
  // Banners are displayed in a larger format
  // Check if URL already ends with a question mark
  if (publicUrl.endsWith('?')) {
    return publicUrl + `width=1200&height=400&quality=80&id=${Math.random().toString()}`;
  } else {
    return publicUrl + `?width=1200&height=400&quality=80&id=${Math.random().toString()}`;
  }
}

export async function updateUser({
  profile_picture: profilePictureFile,
  banner: bannerFile,
  ...user
}) {
  const profile_picture = profilePictureFile
    ? await uploadProfilePicture(profilePictureFile)
    : undefined;

  const banner = bannerFile ? await uploadBanner(bannerFile) : undefined;

  const data = pickBy(
    { ...user, profile_picture, banner },
    (value) => value != undefined,
  );
  await api.post("user/update", data);
  return data;
}

export async function getParticipationsById(id) {
  const { data } = await supabase
    .from("Participant")
    .select("*, Tournament (*, Game (*))")
    .eq("user_id", id)
    .throwOnError();

  return data;
}

export async function getParticipations() {
  const id = await getUserId();
  return await getParticipationsById(id);
}

export async function getUserById(id) {
  const { data } = await supabase
    .from("User")
    .select()
    .eq("id", id)
    .throwOnError();

  const user = data[0];
  if (!user) return;

  const { xp = 0 } = user;
  return {
    ...user,
    rank: getRank(xp),
    nextRank: getNextRank(xp),
    rankProgress: getRankProgressPercentage(xp),
  };
}

export async function getXpRewards({
  start = new Date(0),
  end = new Date(),
  limit = 1000,
  select = "amount, xp, created_at",
} = {}) {
  const user_id = await getUserId();
  const { data } = await supabase
    .from("UserXP")
    .select(select)
    .eq("user_id", user_id)
    .gte("created_at", start.toISOString())
    .lte("created_at", end.toISOString())
    .order("created_at", { ascending: true })
    .limit(limit)
    .throwOnError();
  return data;
}

export async function getRecentRewards() {
  const payouts = (await getPayouts({ limit: 10 })).map((item) => ({
    ...item,
    reward_type: "payout",
  }));
  const xps = (
    await getXpRewards({
      select: "*, Participant(Tournament(name)), Challenge(description)",
      limit: 10,
    })
  ).map((item) => ({
    ...item,
    reward_type: "xp",
  }));
  const inventory = (await getInventory({ limit: 10 })).map((item) => ({
    ...item,
    reward_type: "inventory",
  }));
  return [...payouts, ...xps, ...inventory].sort(
    (a, b) =>
      new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf(),
  );
}

export async function getUpcomingParticipations() {
  const id = await getUserId();
  const { data } = await supabase
    .from("Participant")
    .select("*, Tournament!inner(name, banner, start, Game (*))")
    .eq("user_id", id)
    .order("Tournament(start)", { ascending: true })
    .gt("Tournament.start", new Date().toISOString())
    .throwOnError();
  return data;
}
