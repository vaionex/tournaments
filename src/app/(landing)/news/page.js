import Container from "@/components/ui/container";
import { getAllPosts } from "@/server/blog";
import { format } from "date-fns";
import Link from "next/link";
import CTA from "../cta";
import BadgeTitle from "../BadgeTitle";
import Post from "./Post";

export default async function News() {
  const posts = await getAllPosts();
  const firstPost = posts[0] || {};
  const otherPosts = posts.slice(1);

  if (posts.length == 0) return null;

  return (
    <div
      style={{
        backgroundImage: `url('/images/landing/news/background.webp')`,
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <Container className="pt-48">
        <div className="text-center">
          <div className="mx-auto mb-3 w-fit">
            <BadgeTitle>News</BadgeTitle>
          </div>
          <h1 className="mb-6 text-5xl font-semibold">
            Unveiling Tournament Insights
          </h1>
          <h2 className="mb-24 text-xl text-gray-300">
            Explore In-Depth News, Strategies, and Exciting Reveals from the
            Gaming World!
          </h2>
        </div>
        <div className="mb-24">
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="flex-1">
              <Post {...firstPost} />
            </div>
            <div className="flex flex-1 flex-col gap-8">
              {otherPosts.map((post, i) => (
                <Post {...post} row key={i} />
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <div className="h-96">
                <Post {...post} key={i} />
              </div>
            ))}
          </div>
        </div>
        <CTA />
      </Container>
    </div>
  );
}
