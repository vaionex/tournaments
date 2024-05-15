import { ArrowRight, Gamepad2 } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { BarChart02, LightBulb01 } from "untitledui-js-base";

export default function Gamers() {
  const features = [
    {
      title: "Create Meaningful Interactions with Gamers",
      description:
        "Partner with Tournaments.com to deliver custom activations and interactive content that engages and entertains gamers globally.",
      icon: Gamepad2,
      iconClassName: "border-green-700 text-green-700 bg-green-700/30",
    },
    {
      title: "Harness Analytics for Strategic Engagement",
      description:
        "Access detailed analytics from Tournaments.com to refine your  strategies, target ads effectively, and measure campaign impacts in  real-time.",
      icon: BarChart02,
      iconClassName: "border-indigo-700 text-indigo-700 bg-indigo-700/30",
    },
    {
      title: "Drive Industry Innovation",
      description:
        "Support leading tournaments to advance gaming technology and create  exceptional esports experiences. Shape the future of competitive gaming.",
      icon: LightBulb01,
      iconClassName: "border-yellow-700 text-yellow-700 bg-yellow-700/30",
    },
  ];
  return (
    <div>
      <div
        style={{
          backgroundImage: `url('/images/landing/sponsor/community.webp')`,
          backgroundPosition: "bottom left",
          backgroundRepeat: "no-repeat",
          backgroundSize: "75%",
        }}
        className="mb-24 w-full pb-24"
      >
        <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center">
          <div className="mb-5 flex-1 text-5xl font-bold leading-tight">
            Driving Engagement, Visibility, and Community Growth
          </div>
          <div className="flex-1 text-xl text-gray-300">
            Leverage our platform to connect your brand directly with a
            passionate global audience, enhancing visibility and fostering
            community engagement in the competitive gaming landscape.
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-xl border border-white/10 bg-white/5 p-12 backdrop-blur-lg">
            <div className="mb-4 flex w-fit items-center gap-4 rounded border border-white/20 bg-white/10 p-0.5 pr-2.5">
              <div className="bg-primary-950/50 rounded-sm border border-primary px-2.5 py-0.5">
                Elevate Your Brand Presence
              </div>
              Become a sponsor <ArrowRight />
            </div>
            <div className="mb-2 text-4xl font-semibold">
              Maximize Exposure in High-Stakes Competitions
            </div>
            <div className="mb-4 text-neutral-100">
              Harness the Power of Esports for Unmatched Brand Exposure and
              Community Interaction
            </div>
            <div className="text-neutral-300">
              Sponsorship with Tournaments.com puts your brand front and center
              in major esports events, offering prime visibility in streamed
              matches, event spaces, and related content. Gain extensive
              exposure through branded game integrations and promotional events
              that resonate with gamers worldwide.
            </div>
          </div>
        </div>
      </div>
      <div className="mb-24 grid divide-y divide-white/20 md:grid-cols-3 md:divide-x md:divide-y-0">
        {features.map(({ title, description, icon: Icon, iconClassName }) => (
          <div className="py-6 md:px-6 md:py-0" key={title}>
            <div
              className={twMerge(
                "mb-5 flex size-14 items-center justify-center rounded-xl border",
                iconClassName,
              )}
            >
              <Icon />
            </div>
            <div className="mb-2 text-2xl font-semibold">{title}</div>
            <div className="text-neutral-300">{description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
