import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { getAllPosts } from "@/server/blog";
import { format } from "date-fns";
import Link from "next/link";

export default async function News() {
  const posts = await getAllPosts();
  const firstPost = posts[0] || {};
  const otherPosts = posts.slice(1);

  if (posts.length == 0) return null;

  function FirstPost() {
    const { title, date, slug, excerpt, featuredImage, author } = firstPost;
    return (
      <div className="flex flex-1 flex-col gap-6 md:flex-row">
        <Link href={`/news/${slug}`} className="flex-1">
          <img
            src={featuredImage?.node?.sourceUrl}
            className="h-[17.5rem] w-full  object-cover object-center"
            alt={title}
          />
        </Link>
        <div className="flex-1 space-y-2">
          <div className="text-sm font-semibold text-primary-400">
            {author?.node?.name} • {format(new Date(date), "dd MMM yyyy")}
          </div>
          <Link href={`/news/${slug}`}>
            <h2 className="text-2xl font-semibold hover:underline">{title}</h2>
          </Link>
          <div
            dangerouslySetInnerHTML={{ __html: excerpt }}
            className="line-clamp-4"
          />
        </div>
      </div>
    );
  }

  return (
    <Container className="py-36">
      <div className="mb-12 flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-3xl">
          <h2 className="mb-3 text-5xl font-bold">In the headline</h2>
          <div className="text-xl text-supporting">
            Catch up on the most recent happenings in the world of esports. From
            tournament results to game updates, stay in the know.
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <FirstPost />
        <div className="grid flex-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {otherPosts.map(
            ({ title, date, slug, excerpt, featuredImage, author }, i) => (
              <div className="flex flex-col gap-6 sm:gap-2" key={i}>
                <Link href={`/news/${slug}`}>
                  <img
                    src={featuredImage?.node?.sourceUrl}
                    className="mb-2 h-48 w-full object-cover object-center"
                    alt={title}
                  />
                </Link>
                <div className="flex-1 space-y-2">
                  <div className="text-sm font-semibold text-primary-400">
                    {author?.node?.name} •{" "}
                    {format(new Date(date), "dd MMM yyyy")}
                  </div>
                  <Link href={`/news/${slug}`}>
                    <h2 className="text-2xl font-semibold hover:underline md:text-lg">
                      {title}
                    </h2>
                  </Link>
                  <div
                    dangerouslySetInnerHTML={{ __html: excerpt }}
                    className="line-clamp-2"
                  />
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </Container>
  );
}
