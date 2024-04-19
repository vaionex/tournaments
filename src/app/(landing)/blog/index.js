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
      <div className="flex-1 flex flex-col gap-6">
        <img
          src={featuredImage?.node?.sourceUrl}
          className="flex-1 h-92 object-cover object-center"
          alt={title}
        />
        <div className="space-y-2">
          <div className="font-semibold text-sm text-primary-400">
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
    <Container className="md:py-24 py-8">
      <div className="flex justify-between items-start mb-12 flex-wrap gap-6">
        <div className="max-w-3xl">
          <h2 className="text-5xl font-bold mb-3">In the headline</h2>
          <div className="text-supporting text-xl">
            Catch up on the most recent happenings in the world of esports. From
            tournament results to game updates, stay in the know.
          </div>
        </div>
        <Button variant="black" href="/news">
          All news
        </Button>
      </div>
      <div className="flex gap-8 flex-col lg:flex-row">
        <FirstPost />
        <div className="flex-1 flex flex-col gap-8">
          {otherPosts.map(
            ({ title, date, slug, excerpt, featuredImage, author }, i) => (
              <div className="grid md:grid-cols-2 gap-6 min-h-52" key={i}>
                <img
                  src={featuredImage?.node?.sourceUrl}
                  className="mb-2 h-full object-cover object-center"
                  alt={title}
                />
                <div className="space-y-2 flex-1">
                  <div className="font-semibold text-sm text-primary-400">
                    {author?.node?.name} •{" "}
                    {format(new Date(date), "dd MMM yyyy")}
                  </div>
                  <Link href={`/news/${slug}`}>
                    <h2 className="text-2xl md:text-lg font-semibold hover:underline">
                      {title}
                    </h2>
                  </Link>
                  <div
                    dangerouslySetInnerHTML={{ __html: excerpt }}
                    className="line-clamp-5"
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </Container>
  );
}
