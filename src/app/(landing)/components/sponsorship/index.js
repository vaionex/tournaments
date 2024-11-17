import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { twMerge } from "tailwind-merge";

export default function Sponsorship() {
  function Section({ title, description, image, className }) {
    return (
      <div
        className={twMerge(
          "flex h-96 shrink-0 flex-grow flex-col justify-end bg-center bg-no-repeat p-7",
          className,
        )}
        style={{
          backgroundImage: `url('/images/landing/unlock-sponsorship/${image}.webp')`,
          backgroundSize: "100% 100%",
        }}
      >
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-neutral-500">{description}</div>
      </div>
    );
  }
  return (
    <Container>
      <div className="flex flex-col items-center gap-6">
        <div className="space-y-3 text-center">
          <div className="text-5xl font-bold">
            Unlock the Power of Sponsorship!
          </div>
          <div className="text-xl text-neutral-300">
            Transform Your Sponsorship Experience with Our Advanced Dashboard
          </div>
        </div>
        <Button href="mailto:sponsor@tournaments.com">Become a Sponsor</Button>
      </div>
      <div className="mt-24 flex flex-col gap-2">
        <div className="gap-inherit flex flex-col lg:flex-row">
          <Section
            title="Real-Time Analytics"
            description="Monitor viewer engagement and campaign performance with instant insights."
            image="realtime"
            className="lg:flex-[1.6]"
          />
          <div className="gap-inherit flex flex-[2] flex-col md:flex-row">
            <Section
              title="Enhanced Interaction"
              description="Engage players and viewers with interactive ad placements that connect directly to your brand."
              image="realtime"
              className="md:flex-1"
            />
            <Section
              title="Simplified Sponsor Approval"
              description="Experience a hassle-free approval process for all your sponsorship materials."
              image="realtime"
              className="md:flex-1"
            />
          </div>
        </div>
        <div className="gap-inherit flex flex-col lg:flex-row">
          <div className="gap-inherit flex flex-[2] flex-col md:flex-row">
            <Section
              title="Collaborate with Top-Rated Organizers"
              description="Partner with organizers who consistently receive high ratings for delivering successful tournaments."
              image="realtime"
              className="md:flex-1"
            />
            <Section
              title="Maximized Brand Reach"
              description="Elevate your brand with prominent placements in high-profile tournaments."
              image="realtime"
              className="md:flex-1"
            />
          </div>
          <Section
            title="Seamless Campaign Management"
            description="Easily manage all aspects of your sponsorship, from setup to execution, in one place."
            image="realtime"
            className="lg:flex-[1.6]"
          />
        </div>
      </div>
    </Container>
  );
}
