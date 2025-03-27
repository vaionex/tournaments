import { supabase } from "./supabase";

export async function getComments(articleId) {
  const { data, error } = await supabase
    .from("comments")
    .select(`
      *,
      user:user_id (
        username,
        avatar_url
      )
    `)
    .eq("article_id", articleId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createComment({ articleId, userId, content, parentId = null }) {
  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        article_id: articleId,
        user_id: userId,
        content,
        parent_id: parentId,
      },
    ])
    .select(`
      *,
      user:user_id (
        username,
        avatar_url
      )
    `)
    .single();

  if (error) throw error;
  return data;
}

export async function deleteComment(commentId) {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) throw error;
}

export async function updateComment(commentId, content) {
  const { data, error } = await supabase
    .from("comments")
    .update({ content })
    .eq("id", commentId)
    .select(`
      *,
      user:user_id (
        username,
        avatar_url
      )
    `)
    .single();

  if (error) throw error;
  return data;
} 