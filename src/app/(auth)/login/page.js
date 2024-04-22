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

export default function Login() {
  const { push } = useRouter();
  const { mutate: login, isLoading } = useLoginWithPassword({
    onError: () => toast.error("Invalid Email/Password"),
    onSuccess: () => push("/"),
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
    <Container className="py-36">
      <div className="mx-auto max-w-sm">
        <h1 className="mb-8 text-center text-4xl font-semibold">Login</h1>
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
    </Container>
  );
}
