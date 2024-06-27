import Container from "@/components/ui/container";
import { getPostBySlug } from "@/server/blog";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import ShareSection from "../../../../components/ui/share-section";
import CTA from "../../components/cta";
import SignupSidebar from "./SignupSidebar";

export async function generateMetadata({ params: { slug } }) {
  const { title, featuredImage } = await getPostBySlug(slug);
  const image = featuredImage?.node?.sourceUrl;

  return {
    title,
    description: title,
    openGraph: {
      url: `https://tournaments.com/news/${slug}`,
      title,
      description: title,
      images: [
        {
          url: image,
          width: 1200,
          height: 615,
          alt: "Tournaments.com",
        },
      ],
      siteName: "Tournaments.com",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: title,
      creator: "@Tournaments.com",
      images: [image],
    },
  };
}

export default async function BlogPost({ params: { slug } }) {
  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  const { title, content, featuredImage, date } = post;

  function Info() {
    return (
      <div className="my-8 flex max-w-4xl flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
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
