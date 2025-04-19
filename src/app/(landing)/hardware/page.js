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
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="mb-4 text-3xl md:text-4xl font-bold">Gaming Hardware Reviews</h1>
          <p className="text-base md:text-lg text-neutral-400">
            Expert reviews and recommendations for the best gaming peripherals and hardware
          </p>
        </div>

        <div className="space-y-8 md:space-y-16">
          {/* Hide categories on mobile */}
          <div className="hidden md:block">
            <HardwareCategories />
          </div>
          
          {/* Responsive grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main content area */}
            <div className="md:col-span-2 w-full">
              <Suspense fallback={<Loader />}>
                <LatestReviews />
              </Suspense>
            </div>
            
            {/* Sidebar */}
            <div className="hidden md:block space-y-8">
              <TopPicks />
              {/* <PriceComparison /> */}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}