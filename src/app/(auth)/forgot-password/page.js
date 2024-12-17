"use client";

import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import LogoMark from "@/components/ui/logo-mark";
import toast from "react-hot-toast";
import useSendResetPasswordLink from "@/hooks/auth/useSendResetPasswordLink";
import Link from "next/link";

export default function ForgotPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotPasswordContent />
    </Suspense>
  );
}

function ForgotPasswordContent() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const { mutate: reset, isLoading } = useSendResetPasswordLink();

  function handleReset(e) {
    e.preventDefault();
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
        <div className="text-center">
          <h2 className="mb-2 text-3xl font-semibold">Success</h2>
          <div className="text-neutral-400">
            If you have an account with us, a reset mail will be sent to the
            given email address
          </div>
        </div>
      ) : (
        <div>
          <form className="flex flex-col gap-4" onSubmit={handleReset}>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              label="Email"
              required
            />
            <Button loading={isLoading} type="submit">
              Send Reset Link
            </Button>
          </form>
          <div className="mt-2 flex justify-start">
            <Link className="text-left text-sm text-neutral-300" href="/login">
              Back to login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}