"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSubscribeToNewsletter from "@/hooks/newsletter/useSubscribeToNewsletter";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const { mutate: subscribe, isLoading } = useSubscribeToNewsletter({
    onSuccess: () => {
      toast.success("Successfully subscribed to newsletter!");
      setEmail("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    subscribe({ email });
  };

  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-8 text-center">
      <h2 className="mb-4 text-2xl font-bold text-white">
        Stay Updated with Esports News
      </h2>
      <p className="mb-6 text-neutral-400">
        Subscribe to our newsletter and never miss important updates about your
        favorite games and tournaments.
      </p>
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-md gap-4">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" loading={isLoading}>
          Subscribe
        </Button>
      </form>
    </section>
  );
}