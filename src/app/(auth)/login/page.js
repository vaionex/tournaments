"use client";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import useLoginWithPassword from "@/hooks/auth/useLoginWithPassword";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import GoogleSignInButton from "../GoogleSignInButton";
import LogoMark from "@/components/ui/logo-mark";

export default function Login() {
  const { replace, push } = useRouter();
  const { mutate: login, isLoading } = useLoginWithPassword({
    onError: (e) => {
      if (e.message == "Email not confirmed") {
        push("/verification-email-sent");
      } else {
        toast.error("Invalid Email/Password");
      }
    },
    onSuccess: () => replace("/dashboard"),
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleLogin() {
    login({
      email,
      password,
    });
  }
  return (
    <div className="w-full max-w-sm">
      <LogoMark className="mx-auto size-24" />
      <h1 className="mb-2 text-center text-4xl font-semibold">Welcome Back!</h1>
      <div className="mb-8 text-center text-neutral-300">
        Your path begins with a single click
      </div>
      <div className="flex flex-col gap-4">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email"
          label="Email"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
          label="Password"
        />
        <div className="text-right text-sm text-neutral-300">
          <Link href="/forgot-password">Forgot Password</Link>
        </div>
        <Button onClick={handleLogin} loading={isLoading}>
          Login
        </Button>
        <GoogleSignInButton />
      </div>

      <div className="mt-10 text-center text-sm text-neutral-400">
        Don&apos;t have an account?
        <Link className="font-medium text-primary" href="/signup">
          {" "}
          Sign up
        </Link>
      </div>
    </div>
  );
}
