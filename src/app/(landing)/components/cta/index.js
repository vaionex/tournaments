import Container from "@/components/ui/container";
import Logo from "@/components/ui/logo";
import LogoMark from "@/components/ui/logo-mark";
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
        <Button variant="white" href="/signup">Join a Game</Button>
        {/* <Button>Create a Tournament</Button> */}
      </div>
    </Container>
  );
}
