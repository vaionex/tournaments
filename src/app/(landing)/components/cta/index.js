"use client";

import Container from "@/components/ui/container";
import LogoMark from "@/components/ui/logo-mark";
import { Button } from "@/components/ui/button";
import useAuthentication from "@/hooks/auth/useAuthentication";

export default function CTA() {
  const { isAuthenticated } = useAuthentication();

  return (
    <Container
      className="mb-24 space-y-8 !py-16 text-center"
      style={{
        backgroundImage: `url(/images/cta-background.webp)`,
        backgroundSize: "cover",
      }}
    >
      <LogoMark className="mx-auto h-10" />
      <h2 className="text-4xl font-bold">Start Your Journey to Glory</h2>
      <div className="mx-auto max-w-2xl text-xl">
        Whether you&apos;re here to make your mark as a legendary organizer or
        to rise through the ranks as a champion competitor, your path begins
        with a single click.
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="white"
          href={isAuthenticated ? "/dashboard" : "/signup"}
        >
          Join a Game
        </Button>
        {/* <Button>Create a Tournament</Button> */}
      </div>
    </Container>
  );
}
