"use client";

import { format } from "date-fns";
import { User } from "lucide-react";
import Markdown from "react-markdown";

export default function ReviewContent({ review }) {
  if (!review) return null;

  const formattedDate = review.published_at ? 
    format(new Date(review.published_at), "MMMM d, yyyy") : 
    "Not published";
  
  return (
    <div className="flex-1">
      <div className="mb-8">
        <div className="mb-2 text-sm text-primary">{review.category}</div>
        <h1 className="mb-2 text-4xl font-bold">{review.title}</h1>
        <h2 className="mb-6 text-xl text-neutral-400">{review.subtitle}</h2>
        <div className="flex items-center gap-4 text-sm text-neutral-500">
          <div className="flex items-center gap-1">
            <User className="size-4" />
            {review.author?.username || "Anonymous"}
          </div>
          <span>{formattedDate}</span>
        </div>
      </div>

      <img
        src={review.image_url}
        alt={review.title}
        className="mb-8 w-full rounded-xl"
      />

      <article className="prose prose-invert max-w-none">
        <Markdown>{review.content}</Markdown>
      </article>
    </div>
  );
}