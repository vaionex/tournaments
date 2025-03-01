"use client";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";

export default function Error({ error, reset }) {
  console.error('Application error:', error);

  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold">Something went wrong!</h2>
      <p className="mb-8 text-neutral-400">{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </Container>
  );
}