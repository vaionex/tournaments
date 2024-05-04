import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import DurationTag from "@/components/ui/duration-tag";

const tournaments = [
  {
    startDate: "1st May 2024",
    endDate: "2nd May 2024",
    name: "Fortnite Zero Build – $10 Prize Pool!",
  },
  {
    startDate: new Date(),
    endDate: new Date(),
    name: "Fortnite Battle Royale – $10 Prize Pool!",
  },
  {
    startDate: new Date(),
    endDate: new Date(),
    name: "Fortnite Race – $5 Prize Pool!",
  },
];

export default function Hero() {
  return (
    <div
      style={{
        backgroundImage: `url('/images/fortnitebattle.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundSize: "cover",
      }}
      className="mb-24"
    >
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto mt-12 max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-3xl lg:pt-8">
            <DurationTag startDate={new Date()} endDate={new Date()} />

            <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Earn Cash Rewards in eSports Tournaments
            </h1>
            <p className="mt-6 text-lg leading-8">
              Sign up now to get access to our first tournaments!
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Button variant="white" href="/signup">
                Join the Game
              </Button>
              {/* <Button>Create a Tournament</Button> */}
            </div>
          </div>
        </div>
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {tournaments.map(({ startDate, endDate, name }, index) => (
              <div className="relative bg-neutral-900 px-4 py-3" key={index}>
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

                  <div>May 1 – May 2, 2024</div>
                </div>
                <div className="mt-2 text-sm">{name}</div>
                <svg
                  width="26"
                  height="27"
                  viewBox="0 0 26 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute bottom-0 right-0"
                >
                  <path d="M0 27L26 0V27H0Z" fill="#004EEB" />
                </svg>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
