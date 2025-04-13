"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useCreateArticleComment from "@/hooks/articles/useCreateArticleComment";
import useAuthentication from "@/hooks/auth/useAuthentication";
import { useState } from "react";
import ArticleCommentsList from "./article-comments-list";

export default function ArticleComments({ slug }) {
  const [content, setContent] = useState("");

  const { mutate: createComment, isLoading: isLoadingCreateComment } =
    useCreateArticleComment();
  const { isAuthenticated } = useAuthentication();

  function handleCreateContent() {
    if (!content) return;
    createComment(
      { slug, content },
      {
        onSuccess: () => setContent(""),
      },
    );
  }

  return (
    <div className="space-y-10">
      <div className="mt-16 text-3xl font-medium">Comments</div>
      <ArticleCommentsList slug={slug} />
      {isAuthenticated && (
        <div className="space-y-4">
          <Textarea
            placeholder="Enter a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            className="ml-auto block text-sm"
            onClick={handleCreateContent}
            loading={isLoadingCreateComment}
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
}
