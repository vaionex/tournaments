import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const topics = [
  {
    title: "CS2 Pro League Season 19",
    image: "/images/landing/games/cs2.webp",
    articles: 45,
  },
  {
    title: "Valorant Champions Tour",
    image: "/images/landing/games/valorant.webp", 
    articles: 38,
  },
  {
    title: "Fortnite Chapter 5",
    image: "/images/landing/games/fortnite.webp",
    articles: 32,
  },
  {
    title: "EA FC 24 Ultimate Team",
    image: "/images/landing/games/ea fc 24.webp",
    articles: 29,
  }
];

export default function TrendingTopics() {
  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Trending Topics</h2>
        <Button variant="ghost">
          View All <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {topics.map((topic, index) => (
          <Link
            key={index}
            href={`/news/topic/${topic.title.toLowerCase().replace(/ /g, "-")}`}
            className="group relative overflow-hidden rounded-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            <img
              src={topic.image}
              alt={topic.title}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 p-4">
              <h3 className="mb-1 text-lg font-bold text-white group-hover:text-primary">
                {topic.title}
              </h3>
              <p className="text-sm text-neutral-300">{topic.articles} articles</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}