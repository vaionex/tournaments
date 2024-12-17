"use client";

import { formatDistanceToNow } from "date-fns";
import { Clock, User } from "lucide-react";
import Markdown from "react-markdown";

export default function ArticleContent({ article }) {
  if (!article) return null;

  return (
    <div className="flex-1">
      {/* Article Header */}
      <div className="mb-8">
        <div className="mb-2 text-sm text-primary">{article.category?.name}</div>
        <h1 className="mb-4 text-4xl font-bold" itemProp="headline">{article.title}</h1>
        <div className="flex items-center gap-6 text-sm text-neutral-400">
          <div className="flex items-center gap-2" itemProp="author">
            <User className="size-4" />
            {article.author?.username || "Anonymous"}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4" />
            <time itemProp="datePublished" dateTime={article.published_at}>
              {formatDistanceToNow(new Date(article.published_at), { addSuffix: true })}
            </time>
          </div>
          <div itemProp="timeRequired">{article.read_time} min read</div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative mb-8 h-[300px] w-full overflow-hidden rounded-xl">
        <img
          src={article.image_url}
          alt={article.title}
          className="h-full w-full object-cover"
          itemProp="image"
        />
      </div>

      {/* Article Content */}
      <article 
        className="prose prose-invert max-w-none"
        itemScope
        itemType="http://schema.org/Article"
      >
        <meta itemProp="dateModified" content={article.updated_at} />
        <meta itemProp="description" content={article.excerpt} />
        <Markdown>{article.content}</Markdown>
      </article>
    </div>
  );
}