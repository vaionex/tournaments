import Container from "@/components/ui/container";
import { getPostBySlug } from "@/server/blog";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import ShareSection from "./share-section";
import CTA from "../../components/cta";
import SignupSidebar from "./SignupSidebar";

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

  const { title, content, featuredImage, date } = post;

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
          <img src={featuredImage?.node?.sourceUrl} className="mt-8" />
          <Info />
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="prose prose-invert max-w-7xl"
          />
          <Info />
        </div>
        <SignupSidebar />
      </div>

      <CTA />
    </Container>
  );
}
