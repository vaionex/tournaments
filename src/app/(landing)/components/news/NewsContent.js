"use client";

import { useNews } from "./NewsContext";
import TopStories from "./top-stories";
import LatestNews from "./latest-news";
import { Suspense } from "react";
import Loader from "@/components/ui/loader";
import ErrorBoundary from "@/components/ui/error-boundary";

export default function NewsContent() {
  const { searchQuery, selectedTopic } = useNews();
  const isFiltering = searchQuery || selectedTopic;

  return (
    <div className="space-y-12">
      <ErrorBoundary>
        {!isFiltering && (
          <Suspense fallback={<Loader />}>
            <div className="mx-auto max-w-[1200px]">
              <TopStories />
            </div>
          </Suspense>
        )}
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <div className="mx-auto max-w-[1200px]">
            <LatestNews />
          </div>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}