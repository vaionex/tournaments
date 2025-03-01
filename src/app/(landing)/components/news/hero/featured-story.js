"use client";

import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FeaturedStory() {
  return (
    <div className="max-w-2xl">
      <div className="mb-4 rounded-full bg-primary px-4 py-1 text-sm font-medium text-white">
        Breaking News
      </div>
      <h1 className="mb-6 text-5xl font-bold leading-tight text-white">
        CS2 Major Championship Finals: Team Liquid vs Navi in Epic Showdown
      </h1>
      <p className="mb-4 text-lg text-gray-200">
        Watch history unfold as two legendary teams battle for the $1,000,000 prize pool and eternal glory in the most anticipated match of the year.
      </p>
      <div className="mb-8 flex items-center gap-4 text-sm text-gray-300">
        <span>By John Smith</span>
        <span>•</span>
        <span>{formatDistanceToNow(new Date(), { addSuffix: true })}</span>
        <span>•</span>
        <span>5 min read</span>
      </div>
      <Link href="/news/cs2-major-finals">
        <Button className="group">
          Read Full Story
          <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </div>
  );
}