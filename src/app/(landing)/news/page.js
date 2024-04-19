import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { getAllPosts } from "@/server/blog";
import { format } from "date-fns";

export default async function News() {
  const posts = await getAllPosts();
  const firstPost = posts[0] || {};
  const otherPosts = posts.slice(1);

  if (posts.length == 0) return null;

  function FirstPost() {
    const { title, date, excerpt, featuredImage, author } = firstPost;
    return (
      <div className="flex-1 flex-col md:flex-row flex gap-6">
        <img
          src={featuredImage?.node?.sourceUrl}
          className="flex-1 h-[17.5rem] object-cover object-center"
          alt={title}
        />
        <div className="space-y-2">
          <div className="font-semibold text-sm text-primary-400">
            {author?.node?.name} • {format(new Date(date), "dd MMM yyyy")}
          </div>
          <h2 className="text-2xl font-semibold">{title}</h2>
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
      <div className="flex justify-between items-start mb-12 flex-wrap gap-6">
        <div className="max-w-3xl">
          <h2 className="text-5xl font-bold mb-3">In the headline</h2>
          <div className="text-supporting text-xl">
            Catch up on the most recent happenings in the world of esports. From
            tournament results to game updates, stay in the know.
          </div>
        </div>
      </div>
      <div className="flex gap-8 flex-col">
        <FirstPost />
        <div className="flex-1 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map(
            ({ title, date, excerpt, featuredImage, author }, i) => (
              <div className="flex flex-col gap-6 sm:gap-2" key={i}>
                <img
                  src={featuredImage?.node?.sourceUrl}
                  className="mb-2 h-48 object-cover object-center"
                  alt={title}
                />
                <div className="space-y-2 flex-1">
                  <div className="font-semibold text-sm text-primary-400">
                    {author?.node?.name} •{" "}
                    {format(new Date(date), "dd MMM yyyy")}
                  </div>
                  <h2 className="text-2xl md:text-lg font-semibold">{title}</h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: excerpt }}
                    className="line-clamp-2"
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
