"use client";

import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useQuery } from "react-query";
import { getArticles } from "@/db/articles";
import Loader from "@/components/ui/loader";
import FormattedTime from "@/components/ui/formatted-time";
import { getSmartOptimizedImageUrl } from "@/utils/image-optimization";

export default function TopStories() {
  const { data: articles = [], isLoading, error } = useQuery({
    queryKey: ["articles", { breaking: true, limit: 3 }],
    queryFn: () => {
      console.log('Fetching top stories');
      return getArticles({ breaking: true, limit: 3 });
    },
    onError: (error) => {
      console.error('Error in TopStories:', error);
    }
  });

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    console.error('TopStories error:', error);
    return (
      <div className="rounded-lg border border-red-500 bg-red-500/10 p-4 text-red-500">
        Failed to load top stories: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  if (!articles?.length) {
    console.log('No articles found');
    return null;
  }

  console.log('Rendering articles:', articles);

  const [mainStory, ...sideStories] = articles;
  
  // Optimize main story image
  const mainStoryImage = getSmartOptimizedImageUrl(mainStory.image_url, 1200, 800, 85);

  return (
    <section className="mb-12 grid grid-cols-12 gap-6">
      {/* Main Story */}
      <Link 
        href={`/news/${mainStory.slug}`}
        className="col-span-12 group overflow-hidden rounded-xl lg:col-span-8"
      >
        <div className="relative h-[500px] overflow-hidden rounded-xl">
          <img
            src={mainStoryImage}
            alt={mainStory.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          <div className="absolute -inset-5 bg-gradient-to-t from-black via-black/70 to-black/30 rounded-xl pointer-events-none transform scale-110"></div>
          <div className="absolute bottom-0 p-8 z-10">
            <div className="mb-4 w-fit rounded-full bg-primary px-4 py-1 text-sm font-medium">
              {mainStory.category?.name}
            </div>
            <h2 className="mb-4 text-4xl font-bold text-white">
              {mainStory.title}
            </h2>
            <p className="mb-4 text-lg text-gray-200">
              {mainStory.excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>{mainStory.author?.username}</span>
              <span>•</span>
              <FormattedTime date={mainStory.published_at} />
              <span>•</span>
              <span>{mainStory.read_time} min read</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Side Stories */}
      <div className="col-span-12 grid gap-6 lg:col-span-4">
        {sideStories.map((story) => {
          // Optimize each side story image
          const storyImage = getSmartOptimizedImageUrl(story.image_url, 600, 480, 80);
          
          return (
            <Link
              key={story.id}
              href={`/news/${story.slug}`}
              className="group overflow-hidden rounded-xl"
            >
              <div className="relative h-[240px] overflow-hidden rounded-xl">
                <img
                  src={storyImage}
                  alt={story.title}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute -inset-5 bg-gradient-to-t from-black via-black/70 to-black/30 rounded-xl pointer-events-none transform scale-110"></div>
                <div className="absolute bottom-0 p-6 z-10">
                  <div className="mb-3 w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium">
                    {story.category?.name}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">
                    {story.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span>{story.author?.username}</span>
                    <span>•</span>
                    <FormattedTime date={story.published_at} />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}