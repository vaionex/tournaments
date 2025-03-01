import { supabase } from "@/supabase/client";

export async function getGameReviews({
  limit = 10,
  offset = 0,
  category = null,
  featured = false
} = {}) {
  let query = supabase
    .from('game_reviews')
    .select(`
      *,
      author:author_id(username)
    `)
    .order('published_at', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  if (featured) {
    query = query.eq('is_featured', true);
  }

  const { data, error } = await query
    .range(offset, offset + limit - 1)
    .throwOnError();

  return data;
}

export async function getGameReviewBySlug(slug) {
  const { data, error } = await supabase
    .from('game_reviews')
    .select(`
      *,
      author:author_id(username)
    `)
    .eq('slug', slug)
    .single()
    .throwOnError();

  return data;
}

export async function getGameCategories() {
  const { data, error } = await supabase
    .from('game_reviews')
    .select('category')
    .distinct()
    .throwOnError();

  return data.map(item => item.category);
}