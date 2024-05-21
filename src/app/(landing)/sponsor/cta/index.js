import Container from "@/components/ui/container";
import LogoMark from "@/components/ui/logo-mark";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <Container
      className="mb-24 space-y-8 !py-16 text-center"
      style={{
        backgroundImage: `url(/images/cta-background.webp)`,
        backgroundSize: "cover",
      }}
    >
      <LogoMark className="mx-auto h-10" />
      <h2 className="mx-auto max-w-sm text-4xl font-bold">
        Elevate Your Brand in the Esports Arena
      </h2>
      <div className="mx-auto max-w-2xl text-xl">
        Capitalize on premier esports events to connect and grow. Join us to
        transform the gaming world.
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button variant="white" asChild>
          <a href="mailto:sponsor@tournaments.com">Become a sponsor</a>
        </Button>
      </div>
    </Container>
  );
}
