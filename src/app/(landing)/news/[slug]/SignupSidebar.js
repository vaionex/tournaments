"use client";
import Signup from "@/app/(auth)/signup/page";
import useAuthentication from "@/hooks/auth/useAuthentication";

export default function SignupSidebar() {
  const { isUnauthenticated } = useAuthentication();

  if (!isUnauthenticated) return <div className="w-96" />;

  return (
    <div className="mx-auto flex h-fit max-w-96 rounded-xl border border-neutral-700 bg-gradient-to-b from-white/10 p-8 md:w-96">
      <Signup showLogo />
    </div>
  );
}
