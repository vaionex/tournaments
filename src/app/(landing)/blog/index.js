import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { getAllPosts } from "@/server/blog";
import { format } from "date-fns";
import Link from "next/link";

export default async function Blog() {
  const posts = await getAllPosts({ limit: 3 });
  const firstPost = posts[0] || {};
  const otherPosts = posts.slice(1);

  if (posts.length == 0) return null;

  function FirstPost() {
    const { title, slug, date, excerpt, featuredImage, author } = firstPost;
    return (
      <div className="flex flex-1 flex-col gap-6">
        <Link href={`/news/${slug}`}>
          <img
            src={featuredImage?.node?.sourceUrl}
            className="h-92 w-full flex-1 object-cover object-center"
            alt={title}
          />
        </Link>
        <div className="space-y-2">
          <div className="text-sm font-semibold text-primary-400">
            {author?.node?.name} • {format(new Date(date), "dd MMM yyyy")}
          </div>
          <Link href={`/news/${slug}`}>
            <h2 className="text-2xl font-semibold">{title}</h2>
          </Link>
          <div
            dangerouslySetInnerHTML={{ __html: excerpt }}
            className="line-clamp-2"
          />
        </div>
      </div>
    );
  }

  return (
    <Container className="py-8 md:py-24">
      <div className="mb-12 flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-3xl">
          <h2 className="mb-3 text-5xl font-bold">In the headline</h2>
          <div className="text-xl text-supporting">
            Catch up on the most recent happenings in the world of esports. From
            tournament results to game updates, stay in the know.
          </div>
        </div>
        <Button variant="black" href="/news">
          All news
        </Button>
      </div>
      <div className="flex flex-col gap-8 lg:flex-row">
        <FirstPost />
        <div className="flex flex-1 flex-col gap-8">
          {otherPosts.map(
            ({ title, date, slug, excerpt, featuredImage, author }, i) => (
              <div className="grid min-h-52 gap-6 md:grid-cols-2" key={i}>
                <Link href={`/news/${slug}`}>
                  <img
                    src={featuredImage?.node?.sourceUrl}
                    className="mb-2 h-full w-full object-cover object-center"
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
                    className="line-clamp-5"
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
