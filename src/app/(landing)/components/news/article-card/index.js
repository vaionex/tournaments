"use client";

import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Clock, User } from "lucide-react";

export default function ArticleCard({ 
  title, 
  excerpt,
  slug,
  image_url,
  category,
  published_at,
  read_time,
  author,
  layout = "vertical"
}) {
  const isHorizontal = layout === "horizontal";
  
  return (
    <Link
      href={`/news/${slug}`}
      className={`group flex outline-none ${isHorizontal ? "flex-row gap-6" : "flex-col"}`}
    >
      <div className={`overflow-hidden rounded-xl ${isHorizontal ? "h-48 w-72" : "h-64 w-full"}`}>
        <img
          src={image_url}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <div className={`${isHorizontal ? "flex-1" : "mt-4"}`}>
        <div className="mb-2 text-sm font-medium text-primary">
          {category?.name}
        </div>
        <h3 className="mb-3 text-xl font-bold text-white transition-colors duration-300 ease-out group-hover:text-neutral-400">
          {title}
        </h3>
        <p className="mb-4 text-neutral-400">{excerpt}</p>
        <div className="flex items-center gap-4 text-sm text-neutral-500">
          {author && (
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {author.username}
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {read_time} min read
          </div>
          <span>{formatDistanceToNow(new Date(published_at), { addSuffix: true })}</span>
        </div>
      </div>
    </Link>
  );
}