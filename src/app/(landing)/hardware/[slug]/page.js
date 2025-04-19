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
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="flex-1">
            <ReviewContent review={review} />
          </div>
          <div className="hidden md:block md:w-80">
            <ReviewSidebar review={review} />
          </div>
        </div>
      </Container>
    </div>
  );
}