"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSubscribeToNewsletter from "@/hooks/newsletter/useSubscribeToNewsletter";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { Send01 } from "untitledui-js-base";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const {
    mutate: subscribe,
    isLoading,
    isSuccess,
  } = useSubscribeToNewsletter({
    onError: () => toast.error("Something went wrong"),
  });
  function SubscribeButton() {
    if (isSuccess)
      return <div className="text-center">You have been subscribed</div>;

    return (
      <Button className="w-full" loading={isLoading}>
        Subscribe
      </Button>
    );
  }

  function handleSubscribe(e) {
    e.preventDefault();
    subscribe({ email });
  }

  return (
    <form
      className="h-fit w-96 rounded-xl border border-white/20 p-8"
      style={{
        backgroundImage:
          "radial-gradient(circle at 10% 10%, #737373, transparent 35%)",
      }}
      onSubmit={handleSubscribe}
    >
      <div className="mb-8 flex size-14 items-center justify-center rounded-lg border border-white/10 bg-white/10">
        <Send01 className="size-5" />
      </div>
      <h2 className="mb-2 text-2xl font-semibold">Newsletter</h2>
      <p className="mb-8 text-neutral-300">
        Latest releases and tips, interesting articles, and exclusive interviews
        in your inbox every week.
      </p>
      <div className="mb-1">
        <Input
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4 text-sm text-neutral-400">
        Read about our{" "}
        <Link href="/privacy-policy" className="underline">
          privacy policy.
        </Link>
      </div>
      <SubscribeButton />
    </form>
  );
}
