"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getComments, createComment, deleteComment, updateComment } from "@/db/comments";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, Trash2, Edit2, Send, X } from "lucide-react";
import toast from "react-hot-toast";

/**
 * @typedef {Object} Comment
 * @property {string} id
 * @property {string} content
 * @property {string} article_id
 * @property {string} user_id
 * @property {string} parent_id
 * @property {string} created_at
 * @property {Object} user
 * @property {string} user.username
 * @property {string} user.avatar_url
 * @property {Comment[]} [replies]
 */

/**
 * @typedef {Object} CommentInput
 * @property {string} articleId
 * @property {string} userId
 * @property {string} content
 * @property {string} [parentId]
 */

/**
 * @param {Object} props
 * @param {string} props.articleId
 */
export default function Comments({ articleId }) {
  const { data: user, isLoading: isLoadingUser } = useUser();
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState("");
  /** @type {[Comment | null, (comment: Comment | null) => void]} */
  const [editingComment, setEditingComment] = useState(null);
  const [replyTo, setReplyTo] = useState(null);

  // If Supabase is not configured, show a message
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return (
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-white">Comments</h2>
        <div className="rounded-lg bg-neutral-900 p-4 text-center">
          <p className="text-neutral-400">
            Comments are currently disabled. Please check back later.
          </p>
        </div>
      </div>
    );
  }

  const { data: comments = [], isLoading } = useQuery(
    ["comments", articleId],
    () => getComments(articleId)
  );

  const createCommentMutation = useMutation(
    /** @param {CommentInput} commentData */
    async (commentData) => {
      const result = await createComment(commentData);
      return result;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", articleId]);
        setNewComment("");
        setReplyTo(null);
        toast.success("Comment posted successfully!");
      },
      onError: (error) => {
        toast.error("Failed to post comment. Please try again.");
        console.error("Error posting comment:", error);
      },
    }
  );

  const deleteCommentMutation = useMutation(
    /** @param {string} commentId */
    async (commentId) => {
      await deleteComment(commentId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", articleId]);
        toast.success("Comment deleted successfully!");
      },
      onError: (error) => {
        toast.error("Failed to delete comment. Please try again.");
        console.error("Error deleting comment:", error);
      },
    }
  );

  const updateCommentMutation = useMutation(
    /** @param {{ commentId: string, content: string }} params */
    async ({ commentId, content }) => {
      const result = await updateComment(commentId, content);
      return result;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", articleId]);
        setEditingComment(null);
        toast.success("Comment updated successfully!");
      },
      onError: (error) => {
        toast.error("Failed to update comment. Please try again.");
        console.error("Error updating comment:", error);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    createCommentMutation.mutate({
      articleId,
      userId: user.id,
      content: newComment.trim(),
      parentId: replyTo,
    });
  };

  const handleDelete = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteCommentMutation.mutate(commentId);
    }
  };

  const handleUpdate = (commentId, content) => {
    updateCommentMutation.mutate({ commentId, content });
  };

  /** @param {Comment} comment */
  const renderComment = (comment) => {
    const isEditing = editingComment?.id === comment.id;
    const isAuthor = user?.id === comment.user_id;

    return (
      <div key={comment.id} className="mb-6">
        <div className="flex items-start gap-4">
          <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
            {comment.user?.avatar_url ? (
              <img
                src={comment.user.avatar_url}
                alt={comment.user.username}
                className="aspect-square h-full w-full"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-neutral-800 text-sm font-medium text-white">
                {comment.user?.username?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-white">{comment.user?.username}</span>
                <span className="ml-2 text-sm text-neutral-400">
                  {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                </span>
              </div>
              {isAuthor && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 hover:bg-neutral-800 h-9 px-3 py-2"
                    onClick={() => setEditingComment(comment)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 hover:bg-neutral-800 h-9 px-3 py-2"
                    onClick={() => handleDelete(comment.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            {isEditing ? (
              <div className="mt-2">
                <textarea
                  value={editingComment.content}
                  onChange={(e) =>
                    setEditingComment({ ...editingComment, content: e.target.value })
                  }
                  className="flex min-h-[80px] w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white ring-offset-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-2"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 hover:bg-neutral-800 h-9 px-3 py-2"
                    onClick={() => setEditingComment(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 py-2"
                    onClick={() => handleUpdate(comment.id, editingComment.content)}
                  >
                    Update
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-2 text-neutral-300">{comment.content}</p>
            )}
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 hover:bg-neutral-800 h-9 px-3 py-2"
                onClick={() => setReplyTo(comment.id)}
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Reply
              </button>
            </div>
          </div>
        </div>
        {comment.replies?.map((reply) => (
          <div key={reply.id} className="ml-14 mt-4">
            {renderComment(reply)}
          </div>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Comments ({comments.length})
      </h2>
      
      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex items-start gap-4">
            <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.username}
                  className="aspect-square h-full w-full"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-neutral-800 text-sm font-medium text-white">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex min-h-[100px] w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white ring-offset-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {replyTo && (
                <div className="mt-2 flex items-center gap-2 text-sm text-neutral-400">
                  <span>Replying to a comment</span>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 hover:bg-neutral-800 h-9 px-3 py-2"
                    onClick={() => setReplyTo(null)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 py-2"
                  disabled={!newComment.trim() || createCommentMutation.isLoading}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 rounded-lg bg-neutral-900 p-4 text-center">
          <p className="text-neutral-400">
            Please <a href="/signin" className="text-primary hover:underline">sign in</a> to comment
          </p>
        </div>
      )}

      <div className="space-y-6">
        {comments.map((comment) => renderComment(comment))}
      </div>
    </div>
  );
} 
