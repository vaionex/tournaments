import { getArticles } from "@/db/articles";

export default async function sitemap() {
  const articles = await getArticles({ limit: 1000 });
  
  const articleUrls = articles.map((article) => ({
    url: `https://tournaments.com/news/${article.slug}`,
    lastModified: article.updated_at,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  return [
    {
      url: 'https://tournaments.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://tournaments.com/news',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    ...articleUrls,
  ];
}