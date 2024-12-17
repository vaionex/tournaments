"use client";

import { Button } from "./button";

export default function ErrorBoundary({ children, error, reset }) {
  if (!error) return children;

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-red-500 bg-red-500/10 p-8">
      <h2 className="mb-4 text-xl font-semibold text-red-500">Something went wrong!</h2>
      <p className="mb-6 text-neutral-400">{error.message}</p>
      {reset && (
        <Button onClick={reset} variant="secondary">
          Try again
        </Button>
      )}
    </div>
  );
}