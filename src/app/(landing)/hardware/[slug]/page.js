import Container from "@/components/ui/container";
import ReviewContent from "../components/review-content";
import ReviewSidebar from "../components/review-sidebar";
import { getReview } from "@/db/hardware";
import { notFound } from "next/navigation";

export default async function HardwareReviewPage({ params }) {
  const review = await getReview(params.slug);
  
  if (!review) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black pt-24">
      <Container>
        <div className="flex gap-8">
          <ReviewContent review={review} />
          <ReviewSidebar review={review} />
        </div>
      </Container>
    </div>
  );
}