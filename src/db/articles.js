import { supabase } from "@/supabase/client";
import { api } from "@/utils/api";

export async function getArticles({
  limit = 10,
  offset = 0,
  category = null,
  search = "",
  featured = false,
  breaking = false,
  trending = false,
} = {}) {
  try {
    let query = supabase
      .from("articles")
      .select(
        `
        *,
        category:article_categories(*),
        author:author_id(
          id,
          username,
          avatar_url
        )
      `,
      )
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (category) {
      query = query.eq("category.name", category);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }

    if (featured) {
      query = query.eq("is_featured", true);
    }

    if (breaking) {
      query = query.eq("is_breaking", true);
    }

    if (trending) {
      query = query.eq("is_trending", true);
    }

    const { data, error } = await query.range(offset, offset + limit - 1);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
}

export async function getCategories() {
  try {
    const { data, error } = await supabase
      .from("article_categories")
      .select("*")
      .order("name");

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export async function getArticleBySlug(slug) {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select(
        `
        *,
        category:article_categories(*),
        author:author_id(
          id,
          username,
          avatar_url
        )
      `,
      )
      .eq("slug", slug)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
}

export async function getArticleCommentsBySlug(slug) {
  const article = await getArticleBySlug(slug);
  try {
    const { data } = await supabase
      .from("comments")
      .select("*, User(*)")
      .eq("article_id", article.id)
      .throwOnError();

    return data;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
}

export async function createArticleComment(content, slug, parent_id) {
  await api.post("/article/comment", { content, slug, parent_id });
}
