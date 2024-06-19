"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import LogoMark from "@/components/ui/logo-mark";
import toast from "react-hot-toast";
import useSendResetPasswordLink from "@/hooks/auth/useSendResetPasswordLink";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const { mutate: reset, isLoading } = useSendResetPasswordLink();

  function handleReset() {
    reset(
      { email },
      {
        onSuccess: () => setSent(true),
        onError: () => toast.error("An unexpected error occurred"),
      },
    );
  }

  return (
    <div className="w-full max-w-sm">
      <LogoMark className="mx-auto size-24" />
      <h1 className="mb-2 text-center text-4xl font-semibold">
        Forgot Password
      </h1>
      <div className="mb-8 text-center text-neutral-300">
        Send a password reset link to your email
      </div>
      {sent ? (
        <h2 className="text-center text-2xl font-semibold text-neutral-400">
          Reset link sent
        </h2>
      ) : (
        <div className="flex flex-col gap-4">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            label="Email"
          />
          <Button onClick={handleReset} loading={isLoading}>
            Send Reset Link
          </Button>
        </div>
      )}
    </div>
  );
}
