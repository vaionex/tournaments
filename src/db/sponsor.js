const { supabase } = require("@/supabase/client");
const { v4 } = require("uuid");

export async function uploadAdBanner(file) {
  const path = `ad/${v4()}`;
  const { data, error } = await supabase.storage
    .from("public-images")
    .upload(path, file, { upsert: true });

  if (error) throw error;
  const { path: filePath } = data;
  const {
    data: { publicUrl },
  } = supabase.storage.from("public-images").getPublicUrl(filePath);
  return publicUrl;
}
