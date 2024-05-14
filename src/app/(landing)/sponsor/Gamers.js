import { Globe01 } from "untitledui-js-base";

export default function Gamers() {
  const features = [
    {
      title: "Elevate Your Brand in Major Esports Competitions",
      description:
        "Become a prominent presence in premier esports tournaments. Gain global exposure and enhance your brand's visibility through live and online event coverage.",
      icon: Globe01,
    },
    {
      title: "Connect Directly with an Enthusiastic Gaming Audience",
      description:
        "Engage the esports community with interactive engagements and promotions. Our sponsorship opportunities create meaningful connections and increase brand loyalty.",
      icon: Globe01,
    },
    {
      title: "Reach an Expanding, Passionate Fanbase",
      description:
        "Access a broad, engaged audience of gamers. Utilize targeted promotions to captivate and expand your customer base.",
      icon: Globe01,
    },
    {
      title: "Customize Your Impact in the Esports Ecosystem",
      description:
        "Tailor your sponsorship to meet your goals. Whether it's headline events or regular match streams, choose the option that best suits your needs.",
      icon: Globe01,
    },
  ];
  return (
    <div
      style={{
        backgroundImage: `url('/images/landing/sponsor/gamers.webp')`,
        backgroundPosition: "bottom right",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
      className="mb-24 pb-24"
    >
      <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center">
        <div className="mb-5 flex-1 text-5xl font-bold leading-tight">
          Empower Gamers and Shape the Future of Esports
        </div>
        <div className="flex-1 text-xl text-gray-300">
          Partner with Tournaments.com to boost your brand&apos;s visibility,
          engage directly with gamers, and harness the growing esports market.
        </div>
      </div>
      <div className="grid max-w-2xl gap-8 sm:grid-cols-2">
        {features.map(({ title, description, icon: Icon }) => (
          <div className="border border-white/10 bg-white/5 p-4" key={title}>
            <div
              className="mb-5 flex size-12 items-center justify-center rounded-lg"
              style={{
                background:
                  "radial-gradient(at 10% 10%, #ffffff33 0%, #ffffff1f 80%)",
              }}
            >
              <Icon className="size-6" />
            </div>
            <div className="mb-2 text-lg font-semibold">{title}</div>
            <div className="text-neutral-200">{description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
