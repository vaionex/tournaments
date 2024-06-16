import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import DurationTag from "@/components/ui/duration-tag";

export default async function Hero() {
  return (
    <div
      style={{
        backgroundImage: `url('/images/landing/hero-bg.webp')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        backgroundSize: "cover",
      }}
      className="mx-auto mb-24 max-w-[1920px]"
    >
      <div className="backdrop-blurmd relative isolate overflow-hidden lg:backdrop-blur-none">
        <Container className="relative px-6 py-32 pb-0 sm:pb-32 lg:flex lg:px-8 lg:py-56">
          <div className="z-10 mx-auto mt-12 flex-shrink-0 lg:mx-0 lg:max-w-3xl lg:pt-8">
            <DurationTag startDate={new Date()} endDate={new Date()} />

            <h1
              className="mt-10 text-4xl font-bold leading-normal tracking-tight text-white sm:text-6xl md:leading-[4.8rem]"
              style={{
                textShadow: "0 0 15px #ffffff63",
              }}
            >
              Compete with the Best <br /> and Earn Cash Rewards
            </h1>
            <p className="mt-4 text-lg leading-8">
              Earn Money and Improve Your Rank in Our Weekly Competitions!
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Button href="/tournaments">Explore Tournaments</Button>
            </div>
          </div>
          <img
            src="/images/landing/hero-element.webp"
            className="absolute right-0 top-1/2 z-0 hidden w-2/3 -translate-y-1/2 translate-x-12 lg:block"
            alt="Hero Image"
          />
        </Container>
        {/* <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {tournaments.map(({ start, end, name }, index) => (
              <div
                className={twMerge(
                  "relative rounded-lg border border-neutral-800 bg-white/5  px-4 py-3",
                  index == selectedIndex && "border-primary bg-primary-950",
                )}
                key={index}
              >
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.625 8.25L6.50245 13.8085L8.86699 15.5129L10 14.625L11.1176 15.5129L13.4822 13.8085L16.375 8.25"
                      stroke="#737373"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.99245 9.29829L1.06543 2.47089L3.23721 7.80805L9.99243 12.6777L16.7474 7.80805L18.9193 2.47089L9.99245 9.29829Z"
                      stroke="#737373"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <div>
                    {" "}
                    {format(start, "MMM dd")} – {format(end, "MMM dd")},{" "}
                    {start.getFullYear()}
                  </div>
                </div>
                <div className="mt-2 text-sm">{name}</div>
              </div>
            ))}
          </div>
        </Container> */}
      </div>
    </div>
  );
}
