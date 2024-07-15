import { CoinsStacked03 } from "untitledui-js-base";

export default function Benefits() {
  function Details({ title, description }) {
    return (
      <div>
        <h2 className="mb-5 text-4xl font-semibold leading-[60px]">{title}</h2>
        <div className="text-lg leading-[30px] text-gray-200">
          {description}
        </div>
      </div>
    );
  }
  return (
    <div className="py-24">
      <div className="text-center">
        <h1 className="mb-5 text-5xl font-bold leading-[60px]">
          Premium Membership{" "}
          <span className="inline-block bg-gradient-to-r from-[#155EEF] to-[#09C4FF] bg-clip-text text-transparent">
            Benefits
          </span>
        </h1>
        <h2 className="mb-12 text-xl leading-[30px] text-gray-300">
          Elevate your tournament experience with exclusive perks and
          privileges!
        </h2>
      </div>
      <div>
        <div className="mb-12 grid grid-cols-2 gap-8">
          <div className="relative h-[43rem] rounded-lg bg-primary px-8 py-14">
            <Details
              title="Unrestricted Participation"
              description="Join multiple teams and enter numerous competitions without restrictions. Our premium membership affords you the freedom to explore various tournaments and maximize your potential."
            />
            <img
              src="/images/landing/subscription/team.webp"
              className="absolute inset-x-0 bottom-0"
            />
          </div>
          <div className="flex flex-col justify-end bg-neutral-800 px-8 py-14">
            <Details
              title="Priority Access"
              description="Benefit from priority team placement and reduced waiting times. Our premium users are always positioned optimally to compete, ensuring a smoother and more efficient tournament experience."
            />
          </div>
        </div>

        <div className="rounded-xl bg-neutral-800 px-8 py-14">
          <div className="max-w-sm">
            <div className="mb-8 flex size-12 items-center justify-center rounded-lg border border-white/50 bg-white/10">
              <CoinsStacked03 />
            </div>
            <Details
              title="Expedited Rewards"
              description="Enjoy faster payout processes after winning. Premium users receive their rewards promptly, allowing them to benefit from their victories without delay."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
