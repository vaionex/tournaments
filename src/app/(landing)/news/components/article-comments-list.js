"use client";

import Loader from "@/components/ui/loader";
import useArticleComments from "@/hooks/articles/useArticleComments";
import ArticleComment from "./article-comment";

export default function ArticleCommentsList({ slug }) {
  const { data: comments = [], isLoading: isLoadingComments } =
    useArticleComments(slug);

  if (isLoadingComments) return <Loader className="mx-auto" />;

  if (comments.length == 0)
    return (
      <div className="py-6 text-center text-xl text-neutral-500">
        No comments
      </div>
    );

  return (
    <div className="mb-8 space-y-8">
      {comments.map((comment) => (
        <ArticleComment {...comment} slug={slug} key={comment.id} />
      ))}
    </div>
  );
}
