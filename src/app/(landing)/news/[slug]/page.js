import { getArticleBySlug } from "@/db/articles";
import { notFound } from "next/navigation";
import Container from "@/components/ui/container";
import ArticleContent from "../components/article-content";
import ArticleSidebar from "../components/article-sidebar";
import Script from "next/script";
import ArticleComments from "../components/article-comments";
import CommentSection from "../components/comment-section";

// Generate metadata for SEO and Google News
export async function generateMetadata({ params }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  const title = article.meta_title || article.title;
  const description = article.meta_description || article.excerpt;
  const keywords = article.meta_keywords?.join(", ");
  const url = `https://tournaments.com/news/${article.slug}`;
  const image = article.image_url;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
      authors: [article.author?.username],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: "Tournaments.com",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@Tournaments",
    },
    alternates: {
      canonical: article.canonical_url || url,
    },
    robots: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    // Google News specific meta tags
    news_keywords: keywords,
    "article:published_time": article.published_at,
    "article:modified_time": article.updated_at,
    "article:author": article.author?.username,
    "article:section": article.category?.name,
  };
}

export default async function ArticlePage({ params }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  // Format the article data for structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [article.image_url],
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: [
      {
        "@type": "Person",
        name: article.author?.username,
        url: `https://tournaments.com/author/${article.author?.username}`,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Tournaments.com",
      logo: {
        "@type": "ImageObject",
        url: "https://tournaments.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://tournaments.com/news/${article.slug}`,
    },
    articleSection: article.category?.name,
    keywords: article.meta_keywords?.join(", "),
  };

  return (
    <>
      <Script
        id="article-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-black pt-24">
        <Container className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:gap-8">
            <div className="flex-1">
              <ArticleContent article={article} />
              <CommentSection articleId={article.id} />
            </div>
            <div className="hidden md:block md:w-80">
              <ArticleSidebar currentArticle={article} />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
