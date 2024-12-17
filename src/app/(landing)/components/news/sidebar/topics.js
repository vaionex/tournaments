"use client";

import { Button } from "@/components/ui/button";
import { useNews } from "../NewsContext";
import { useQuery } from "react-query";
import { getCategories } from "@/db/articles";
import Loader from "@/components/ui/loader";

export default function TopicsList() {
  const { selectedTopic, setSelectedTopic } = useNews();
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["article-categories"],
    queryFn: getCategories
  });

  if (isLoading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-white">Topics</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedTopic === category.name ? "default" : "secondary"}
            className="rounded-full px-4 py-1 text-sm"
            onClick={() => setSelectedTopic(category.name === selectedTopic ? "" : category.name)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}