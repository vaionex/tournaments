import { Suspense } from "react";
import Container from "@/components/ui/container";
import Loader from "@/components/ui/loader";
import NewsSidebar from "./components/news/sidebar";
import NewsletterSignup from "./components/news/newsletter-signup";
import { NewsProvider } from "./components/news/NewsContext";
import NewsContent from "./components/news/NewsContent";

export const revalidate = 0;

export default function Home() {
  return (
    <div className="min-h-screen bg-black pt-24">
      <NewsProvider>
        <Container>
          <div className="relative">
            {/* Main content area - full width on mobile, partial width on desktop */}
            <div className="lg:pr-[340px]">
              <NewsContent />
              <div className="mx-auto max-w-[1200px]">
                <NewsletterSignup />
              </div>
            </div>
            
            {/* Sidebar - absolutely positioned on desktop, hidden on mobile */}
            <div className="hidden lg:block lg:absolute lg:top-0 lg:right-0 lg:w-[320px]">
              <Suspense
                fallback={
                  <div className="h-[80vh] flex items-center justify-center">
                    <Loader />
                  </div>
                }
              >
                <NewsSidebar />
              </Suspense>
            </div>
          </div>
        </Container>
      </NewsProvider>
    </div>
  );
}