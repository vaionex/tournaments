import { supabase } from "@/supabase/client";

export async function getLatestReviews({ category = null, page = 1, pageSize = 6 } = {}) {
  try {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from('hardware_reviews')
      .select(`
        *,
        author:author_id(username)
      `, { count: 'exact' })
      .order('published_at', { ascending: false })
      .range(from, to);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error, count } = await query;

    if (error) throw error;
    return { 
      data: data || [], 
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize)
    };
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
      .eq('is_featured', true)
      .order('published_at', { ascending: false })
      .limit(5);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching featured hardware:', error);
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