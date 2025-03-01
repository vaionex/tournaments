import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const articles = [
  {
    title: "Valorant Champions Tour 2024: Everything You Need to Know",
    excerpt: "Get ready for the biggest Valorant tournament of the year with our comprehensive guide to teams, schedule, and prize pool.",
    image: "/images/landing/games/valorant.webp",
    category: "Valorant",
    date: "2024-03-20",
  },
  {
    title: "EA Sports FC 24: Major Gameplay Updates Coming in Next Patch",
    excerpt: "EA announces significant changes to gameplay mechanics and introduces new competitive features.",
    image: "/images/landing/games/ea fc 24.webp",
    category: "EA FC 24",
    date: "2024-03-19",
  },
];

export default function FeaturedArticles() {
  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Featured Articles</h2>
        <Button variant="ghost">
          View All <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {articles.map((article, index) => (
          <Link
            key={index}
            href={`/news/${article.title.toLowerCase().replace(/ /g, "-")}`}
            className="group"
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src={article.image}
                alt={article.title}
                className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <div className="mb-2 text-sm text-primary">{article.category}</div>
              <h3 className="mb-2 text-xl font-bold text-white group-hover:text-primary">
                {article.title}
              </h3>
              <p className="text-neutral-400">{article.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}