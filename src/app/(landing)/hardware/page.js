import { Suspense } from "react";
import Container from "@/components/ui/container";
import HardwareCategories from "./components/categories";
import LatestReviews from "./components/latest-reviews";
import TopPicks from "./components/top-picks";
import PriceComparison from "./components/price-comparison";
import Loader from "@/components/ui/loader";

export default function HardwarePage() {
  return (
    <div className="min-h-screen bg-black pt-24">
      <Container>
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">Gaming Hardware Reviews</h1>
          <p className="text-lg text-neutral-400">
            Expert reviews and recommendations for the best gaming peripherals and hardware
          </p>
        </div>

        <div className="space-y-16">
          <HardwareCategories />
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Suspense fallback={<Loader />}>
                <LatestReviews />
              </Suspense>
            </div>
            <div className="space-y-8">
              <TopPicks />
              <PriceComparison />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}