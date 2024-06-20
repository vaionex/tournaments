"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import LogoMark from "@/components/ui/logo-mark";
import toast from "react-hot-toast";
import useUpdatePassword from "@/hooks/user/useUpdatePassword";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: update, isLoading } = useUpdatePassword();
  const { push } = useRouter();

  function handleReset() {
    if (password != confirmPassword)
      return toast.error("Password do not match");
    update({ password }, { onSuccess: () => push("/dashboard") });
  }

  return (
    <div className="w-full max-w-sm">
      <LogoMark className="mx-auto size-24" />
      <h1 className="mb-2 text-center text-4xl font-semibold">
        Update Password
      </h1>
      <div className="mb-8 text-center text-neutral-300">
        Update your password
      </div>
      <div className="flex flex-col gap-4">
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your new password"
          label="New password"
        />
        <Input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Confim your new password"
          label="Confirm new Password"
        />
        <Button onClick={handleReset} loading={isLoading}>
          Update Password
        </Button>
      </div>
    </div>
  );
}
