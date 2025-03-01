"use client";

import { Search } from "lucide-react";
import { useNews } from "../NewsContext";

export default function NewsSearch() {
  const { searchQuery, setSearchQuery } = useNews();

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search news..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 pl-10 text-white placeholder-neutral-500 focus:border-primary focus:outline-none"
      />
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
    </div>
  );
}