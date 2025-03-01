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
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <NewsContent />
              <div className="mx-auto max-w-[1200px]">
                <NewsletterSignup />
              </div>
            </div>

            {/* Sidebar */}
            <Suspense
              fallback={
                <div className="flex h-[80vh] w-80 items-center justify-center">
                  <Loader />
                </div>
              }
            >
              <NewsSidebar />
            </Suspense>
          </div>
        </Container>
      </NewsProvider>
    </div>
  );
}