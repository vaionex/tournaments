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
  
  // Add default optimization parameters for news images
  // Check if URL already ends with a question mark
  if (publicUrl.endsWith('?')) {
    return publicUrl + `width=800&height=600&quality=80&id=${Math.random().toString()}`;
  } else {
    return publicUrl + `?width=800&height=600&quality=80&id=${Math.random().toString()}`;
  }
}
