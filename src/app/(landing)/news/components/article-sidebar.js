"use client";

import { useQuery } from "react-query";
import { getArticles } from "@/db/articles";
import ArticleCard from "../../components/news/article-card";
import Loader from "@/components/ui/loader";

export default function ArticleSidebar({ currentArticle }) {
  // Fetch related articles based on same category
  const { data: relatedArticles = [], isLoading } = useQuery({
    queryKey: ["related-articles", currentArticle.category?.id],
    queryFn: () => getArticles({ 
      limit: 3,
      category: currentArticle.category?.name,
    }),
    select: (articles) => articles.filter(a => a.id !== currentArticle.id)
  });

  // Fetch trending articles
  const { data: trendingArticles = [], isLoading: isTrendingLoading } = useQuery({
    queryKey: ["trending-articles"],
    queryFn: () => getArticles({ 
      limit: 3,
      trending: true 
    }),
    select: (articles) => articles.filter(a => a.id !== currentArticle.id)
  });

  if (isLoading || isTrendingLoading) {
    return (
      <div className="flex h-96 w-80 items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <aside className="w-80 space-y-8">
      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold">Related Articles</h2>
          <div className="space-y-6">
            {relatedArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </div>
      )}

      {/* Trending Articles */}
      {trendingArticles.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold">Trending Now</h2>
          <div className="space-y-6">
            {trendingArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}