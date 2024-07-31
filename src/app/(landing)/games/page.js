import Container from "@/components/ui/container";
import { ArrowUpRight, HourGlass03 } from "untitledui-js-base";
import CTA from "../components/cta";
import BadgeTitle from "../BadgeTitle";

const games = [
  { name: "Fortnite" },
  { name: "CS2" },
  { name: "Valorant", comingSoon: true },
  { name: "EA FC 24", comingSoon: true },
  { name: "Apex", comingSoon: true },
  { name: "Dota 2", comingSoon: true },
];

export default function Games() {
  return (
    <div
      style={{
        backgroundImage: `url('/images/landing/games/background.webp')`,
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <Container className="pt-48">
        <div className="text-center">
          <div className="mx-auto mb-3 w-fit">
            <BadgeTitle>Games</BadgeTitle>
          </div>
          <h1 className="mb-6 text-5xl font-semibold">Our Games Library</h1>
          <h2 className="mb-24 text-xl text-gray-300">
            Browse and Select from Our Growing Collection of Competitive Games.
          </h2>
        </div>
        <div className="mb-12">
          <div className="text-3xl font-bold">Browse Our Games Selection</div>
          <h2 className="text-xl text-gray-300">
            Dive into the Heat of Competition or Get Ready to Join Upcoming
            Battles.
          </h2>
        </div>
        <div className="mb-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {games.map(({ name, comingSoon }) => (
            <div
              className="relative h-[31.5rem] overflow-hidden rounded-lg border  border-gray-600 bg-cover bg-center"
              style={{
                backgroundImage: `url('/images/landing/games/${name.toLowerCase()}.webp')`,
              }}
              key={name}
            >
              <div className="absolute inset-x-0 bottom-0 flex h-24 flex-col items-center justify-center border-t border-white/20 bg-black/40 p-4 text-center backdrop-blur-xl">
                <span className="text-2xl font-bold">{name}</span>
                <div className="mx-auto mt-1 flex w-fit items-center gap-1 rounded border border-white/10 bg-white/5 px-2.5 py-0.5 text-sm">
                  {comingSoon ? (
                    <>
                      <HourGlass03 className="size-3" />
                      Coming Soon
                    </>
                  ) : (
                    <>
                      <ArrowUpRight className="size-3" />
                      Play Now
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <CTA />
      </Container>
    </div>
  );
}
