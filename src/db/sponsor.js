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
  
  // Ad banners need to be high quality and are typically wider
  // Check if URL already ends with a question mark
  if (publicUrl.endsWith('?')) {
    return publicUrl + `width=1000&height=300&quality=85`;
  } else {
    return publicUrl + `?width=1000&height=300&quality=85`;
  }
}
