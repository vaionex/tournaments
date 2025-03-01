"use client";

import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import LogoMark from "@/components/ui/logo-mark";
import toast from "react-hot-toast";
import useSignupWithEmailAndPassword from "@/hooks/auth/useSignupWithEmailAndPassword";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GoogleSignInButton from "../GoogleSignInButton";

export default function Signup({ showLogo }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupContent showLogo={showLogo} />
    </Suspense>
  );
}

function SignupContent({ showLogo }) {
  const { push } = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const { mutate: signup, isLoading } = useSignupWithEmailAndPassword({
    onError: (e) => toast.error(e.message ?? "Could not signup"),
    onSuccess: () => push("/verification-email-sent"),
  });

  async function handleSignup() {
    if (!username) return toast.error("Please provide a username");
    if (!acceptedTerms)
      return toast.error("Please accept the terms and conditions");

    signup({
      username,
      email,
      password,
    });
  }

  return (
    <div className="w-full max-w-sm">
      <div className="hidden sm:block">
        {showLogo && <LogoMark className="mx-auto hidden size-24 xl:block" />}
        <h1 className="mb-2 text-center text-4xl font-semibold">
          Start your journey
        </h1>
        <div className="mb-8 text-center text-neutral-300">
          Your path begins with a single click
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          label="Your username"
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          label="Email"
          type="email"
          autoComplete={false}
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          label="Password"
          type="password"
          autoComplete={false}
        />
        <Checkbox
          label={
            <>
              I agree to the{" "}
              <Link className="underline" href="#">
                Terms and Conditions
              </Link>
            </>
          }
          checked={acceptedTerms}
          onCheckedChange={setAcceptedTerms}
          id="terms"
        />
        <Button onClick={handleSignup} loading={isLoading}>
          Get Started
        </Button>
        <GoogleSignInButton />
      </div>

      <div className="mt-10 text-center text-sm text-neutral-400">
        Already have an account?{" "}
        <Link className="font-medium text-primary" href="/login">
          Log In
        </Link>
      </div>
    </div>
  );
}