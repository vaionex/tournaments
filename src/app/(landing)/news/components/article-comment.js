import Avatar from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useArticleComments from "@/hooks/articles/useArticleComments";
import useCreateArticleComment from "@/hooks/articles/useCreateArticleComment";
import useAuthentication from "@/hooks/auth/useAuthentication";
import { format } from "date-fns";
import { useState } from "react";

export default function ArticleComment({
  slug,
  content,
  id,
  User,
  created_at,
  parent_id,
}) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const { mutate: createComment, isLoading: isLoadingCreateComment } =
    useCreateArticleComment();
  const { data: comments } = useArticleComments(slug);
  const { isAuthenticated } = useAuthentication();
  const parentComment = comments.find((comment) => comment.id === parent_id);

  function handleCreateComment() {
    if (!content) return;
    createComment(
      { slug, content: replyContent, parent_id: id },
      {
        onSuccess: () => {
          setReplyContent("");
          setShowReplyBox(false);
        },
      },
    );
  }
  return (
    <div className="scroll-mt-40" key={id} id={id}>
      <div className="mb-4 flex items-center gap-3">
        <Avatar {...User} />
        <div>{User.username}</div>
        <div className="text-sm text-neutral-500">
          {format(created_at, "MMM dd, yyyy")}
        </div>
      </div>
      <div>
        {parentComment && (
          <a
            className="mb-2 border-l-4 border-white/50 pl-3"
            href={`#${parentComment.id}`}
          >
            {parentComment.content}
          </a>
        )}
        <div>{content}</div>
      </div>
      {isAuthenticated && (
        <button
          className="ml-auto block text-primary-400"
          onClick={() => setShowReplyBox(true)}
        >
          Reply
        </button>
      )}
      {showReplyBox && (
        <div className="mt-4">
          <Textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a reply..."
          />
          <Button
            size="sm"
            className="ml-auto mt-2 block"
            onClick={handleCreateComment}
            loading={isLoadingCreateComment}
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
}
