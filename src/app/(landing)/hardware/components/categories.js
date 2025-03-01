"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const categories = [
  {
    name: "Gaming Mice",
    icon: "🖱️",
    slug: "mouse",
    count: 24,
  },
  {
    name: "Keyboards",
    icon: "⌨️",
    slug: "keyboard",
    count: 18,
  },
  {
    name: "Monitors",
    icon: "🖥️",
    slug: "monitor",
    count: 15,
  },
  {
    name: "Headsets",
    icon: "🎧",
    slug: "headset",
    count: 21,
  },
  {
    name: "Controllers",
    icon: "🎮",
    slug: "controller",
    count: 12,
  },
];

export default function HardwareCategories() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const handleCategoryClick = useCallback((slug) => {
    const params = new URLSearchParams(searchParams);
    if (currentCategory === slug) {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    router.push(`?${params.toString()}`);
  }, [currentCategory, router, searchParams]);

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Categories</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((category) => (
          <div
            key={category.name}
            onClick={() => handleCategoryClick(category.slug)}
            className={`group cursor-pointer rounded-xl border bg-neutral-900 p-6 transition-colors ${
              currentCategory === category.slug 
                ? "border-primary" 
                : "border-neutral-800 hover:border-primary"
            }`}
          >
            <div className="mb-4 text-4xl">{category.icon}</div>
            <h3 className="mb-2 font-semibold text-white group-hover:text-primary">
              {category.name}
            </h3>
            <p className="text-sm text-neutral-400">{category.count} reviews</p>
          </div>
        ))}
      </div>
    </section>
  );
}