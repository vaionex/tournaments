import Container from "@/components/ui/container";
import { getPostBySlug } from "@/server/blog";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import ShareSection from "./share-section";
import CTA from "../../cta";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send01 } from "untitledui-js-base";

export async function generateMetadata({ params: { slug } }) {
  const { title } = await getPostBySlug(slug);

  return {
    title,
    description: title,
  };
}

export default async function BlogPost({ params: { slug } }) {
  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  const { title, content, author, date } = post;

  function Info() {
    return (
      <div className="my-8 flex max-w-4xl items-center justify-between">
        <div>
          <div className="text-sm text-primary">Published on</div>
          <div className="text-lg">{format(new Date(date), "dd MMM yyyy")}</div>
        </div>
        <ShareSection title={title} />
      </div>
    );
  }

  return (
    <Container className="py-36">
      <div className="mb-24 flex flex-col gap-24 lg:flex-row">
        <div className="flex-1">
          <h1 className="text-6xl font-bold">{title}</h1>
          <Info />
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="prose-invert prose"
          />
          <Info />
        </div>
        <div
          className="h-fit w-96 rounded-xl border border-white/20 p-8"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 10%, #737373, transparent 35%)",
          }}
        >
          <div className="mb-8 flex size-14 items-center justify-center rounded-lg border border-white/10 bg-white/10">
            <Send01 className="size-5" />
          </div>
          <h2 className="mb-2 text-2xl font-semibold">Newsletter</h2>
          <p className="mb-8 text-neutral-300">
            Latest releases and tips, interesting articles, and exclusive
            interviews in your inbox every week.
          </p>
          <div className="mb-1">
            <Input placeholder="Enter your email" />
          </div>
          <div className="mb-4 text-sm text-neutral-400">
            Read about our privacy policy.
          </div>
          <Button className="w-full">Subscribe</Button>
        </div>
      </div>

      <CTA />
    </Container>
  );
}
