"use client";

import Avatar from "@/components/ui/avatar";
import Loader from "@/components/ui/loader";
import useArticleComments from "@/hooks/articles/useArticleComments";
import { format } from "date-fns";

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
      {comments.map(({ content, id, User, created_at }) => (
        <div className="" key={id}>
          <div className="mb-4 flex items-center gap-3">
            <Avatar {...User} />
            <div>{User.username}</div>
            <div className="text-sm text-neutral-500">
              {format(created_at, "MMM dd, yyyy")}
            </div>
          </div>
          <div>{content}</div>
        </div>
      ))}
    </div>
  );
}
