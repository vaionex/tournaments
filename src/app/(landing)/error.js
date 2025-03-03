"use client";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { AlertTriangle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function Error({ error, reset }) {
  console.error('Application error:', error);

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10">
        <AlertTriangle className="h-12 w-12 text-red-500" />
      </div>
      
      <h1 className="mb-2 text-4xl font-bold">Oops! Something went wrong</h1>
      <h2 className="mb-6 text-xl text-neutral-300">We encountered an unexpected error</h2>
      
      <div className="mb-8 max-w-md rounded-lg border border-white/10 bg-white/5 p-4 text-left text-sm text-neutral-400">
        <p className="font-medium text-white">Error details:</p>
        <p className="mt-1 font-mono">{error.message || "Unknown error occurred"}</p>
      </div>
      
      <div className="flex gap-4">
        <Button 
          onClick={reset} 
          className="flex items-center gap-2 bg-primary hover:bg-primary/90"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
        
        <Link href="/dashboard">
          <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10">
            Return to dashboard
          </Button>
        </Link>
      </div>
      
      <p className="mt-8 text-sm text-neutral-500">
        If this problem persists, please contact our support team.
      </p>
    </Container>
  );
}