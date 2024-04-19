import Container from "@/components/ui/container";
import { getPostBySlug } from "@/server/blog";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import ShareSection from "./share-section";

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
          <div className="text-primary">{author?.node?.name}</div>
          <div>{format(new Date(date), "dd MMM yyyy")}</div>
        </div>
        <ShareSection title={title} />
      </div>
    );
  }

  return (
    <Container className="py-36">
      <h1 className="text-5xl font-bold">{title}</h1>
      <Info />
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="prose-invert prose lg:prose-xl"
      />
      <Info />
    </Container>
  );
}
