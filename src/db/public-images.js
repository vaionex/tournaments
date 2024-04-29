const { supabase } = require("@/supabase/client");

export async function uploadPublicImage(file, path) {
  const { data, error } = await supabase.storage
    .from("public-images")
    .upload(path, file, { upsert: true });

  if (error) throw error;
  const { path: filePath } = data;
  const {
    data: { publicUrl },
  } = supabase.storage.from("public-images").getPublicUrl(filePath);
  return publicUrl + `?id=${Math.random().toString()}`;
}
