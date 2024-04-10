import Container from "@/components/container";
import Logo from "@/components/logo";
import LogoMark from "@/components/logo-mark";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <Container
      className="text-center space-y-8 !py-16 mb-24"
      style={{
        backgroundImage: `url(/images/cta-background.webp)`,
        backgroundSize: "cover",
      }}
    >
      <LogoMark className="h-10 mx-auto" />
      <h2 className="text-4xl font-bold">Start Your Journey to Glory</h2>
      <div className="max-w-2xl mx-auto text-xl">
        Whether you&apos;re here to make your mark as a legendary organizer or
        to rise through the ranks as a champion competitor, your path begins
        with a single click.
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button>Create a Tournament</Button>
        <Button variant="white">Join a Game</Button>
      </div>
    </Container>
  );
}
