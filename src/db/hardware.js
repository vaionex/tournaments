import { supabase } from "@/supabase/client";

export async function getLatestReviews({ category = null } = {}) {
  try {
    let query = supabase
      .from('hardware_reviews')
      .select(`
        *,
        author:author_id(username)
      `)
      .order('published_at', { ascending: false })
      .limit(6);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching latest reviews:', error);
    throw error;
  }
}

export async function getTopPicks() {
  try {
    const { data, error } = await supabase
      .from('hardware_reviews')
      .select(`
        *,
        author:author_id(username)
      `)
      .eq('is_top_pick', true)
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching top picks:', error);
    throw error;
  }
}

export async function getReview(slug) {
  try {
    const { data, error } = await supabase
      .from('hardware_reviews')
      .select(`
        *,
        author:author_id(username)
      `)
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching review:', error);
    throw error;
  }
}