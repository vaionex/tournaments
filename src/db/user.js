import { supabase } from "@/supabase/client";
import { getUserId } from "@/supabase/utils";
import { pickBy } from "lodash";

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
  return publicUrl + `?id=${Math.random().toString()}`;
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
  return publicUrl + `?id=${Math.random().toString()}`;
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

  const id = await getUserId();
  const data = pickBy(
    { ...user, profile_picture, banner },
    (value) => value != undefined,
  );
  await supabase.from("User").update(data).eq("id", id).throwOnError();
  return data;
}

export async function getParticipations() {
  const id = await getUserId();
  const { data } = await supabase
    .from("Participant")
    .select()
    .eq("user_id", id)
    .throwOnError();

  return data;
}
