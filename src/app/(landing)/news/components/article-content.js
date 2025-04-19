"use client";

import { format, formatDistanceToNow } from "date-fns";
import { Clock, User } from "lucide-react";
import Markdown from "react-markdown";
import { getSmartOptimizedImageUrl } from "@/utils/image-optimization";
import Avatar from "@/components/ui/avatar";

export default function ArticleContent({ article }) {
  if (!article) return null;

  // Always apply optimization parameters if the URL exists
  const imageUrl = getSmartOptimizedImageUrl(article.image_url, 1200, 600, 85);

  return (
    <div className="flex-1">
      {/* Article Header */}
      <div className="mb-8 max-w-3xl mx-auto">
        <div className="mb-2 text-sm text-primary">
          {article.category?.name}
        </div>
        <h1 className="mb-4 text-4xl font-bold" itemProp="headline">
          {article.title}
        </h1>
        <div className="flex items-center gap-6 text-sm text-neutral-400">
          <div className="flex items-center gap-2" itemProp="author">
            <User className="size-4" />
            {article.author?.username || "Anonymous"}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4" />
            <time itemProp="datePublished" dateTime={article.published_at}>
              {formatDistanceToNow(new Date(article.published_at), {
                addSuffix: true,
              })}
            </time>
          </div>
          <div itemProp="timeRequired">{article.read_time} min read</div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative mb-8 max-w-3xl mx-auto overflow-hidden rounded-xl">
        <img
          src={imageUrl}
          alt={article.title}
          className="h-[300px] w-full object-cover"
          itemProp="image"
        />
      </div>

      {/* Article Content */}
      <article
        className="prose prose-invert max-w-3xl mx-auto"
        itemScope
        itemType="http://schema.org/Article"
      >
        <meta itemProp="dateModified" content={article.updated_at} />
        <meta itemProp="description" content={article.excerpt} />
        <Markdown>{article.content}</Markdown>
      </article>
      <div className="mt-5 flex items-center gap-2 max-w-3xl mx-auto">
        <Avatar src={article.author.avatar_url} />
        <div>
          <div>{article.author.username}</div>
          <div className="text-sm text-neutral-400">
            {format(article.created_at, "do MMMM, yyyy")}
          </div>
        </div>
      </div>
    </div>
  );
}
