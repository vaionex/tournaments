"use client";

import ArticleCard from "../article-card";
import { useNews } from "../NewsContext";
import { useQuery } from "react-query";
import { getArticles } from "@/db/articles";
import Loader from "@/components/ui/loader";
import ErrorBoundary from "@/components/ui/error-boundary";

export default function LatestNews() {
  const { searchQuery, selectedTopic } = useNews();

  const { data: articles = [], isLoading, error } = useQuery({
    queryKey: ["articles", { search: searchQuery, category: selectedTopic }],
    queryFn: () => getArticles({ 
      search: searchQuery,
      category: selectedTopic,
      limit: 10
    })
  });

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorBoundary error={error}>
        <div>Failed to load latest news</div>
      </ErrorBoundary>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="py-12 text-center text-neutral-400">
        No articles found matching your criteria
      </div>
    );
  }

  const isFiltering = searchQuery || selectedTopic;

  return (
    <section>
      <h2 className="mb-8 text-2xl font-bold text-white">
        {isFiltering ? "Search Results" : "Latest News"}
      </h2>
      <div className="divide-y divide-neutral-800">
        {articles.map((article) => (
          <div key={article.id} className="py-8 first:pt-0 last:pb-0">
            <ArticleCard 
              {...article}
              category={article.category}
              image={article.image_url}
              date={article.published_at}
              readTime={`${article.read_time} min read`}
              layout="horizontal" 
            />
          </div>
        ))}
      </div>
    </section>
  );
}