import { Crown } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Cube02, Ticket01 } from "untitledui-js-base";

const perks = [
  {
    name: "Priority Access",
    description:
      "Secure your spot before anyone else in popular tournaments with Priority Registration.",
    icon: Crown,
  },
  {
    name: "Zero Entry Fees",
    description:
      "Enjoy zero fees for entering any tournaments, making competition more accessible.",
    icon: Ticket01,
    highlight: true,
  },
  {
    name: "Exclusive Content",
    description:
      "Get insider access to expert game strategies, tips, and behind-the-scenes content.",
    icon: Cube02,
  },
];
export default function Perks() {
  return (
    <div>
      <div className="mb-12">
        <h2 className="mb-5 text-4xl font-semibold">Subscription Perks</h2>
        <div className="max-w-xl text-neutral-200">
          Unleash your competitive spirit with access to exclusive tournaments,
          waived entry fees, and more!
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {perks.map(({ name, description, highlight = false, icon: Icon }) => (
          <div
            className={twMerge(
              "rounded-2xl border border-white/20 bg-black p-6",
              highlight && "bg-gradient-to-b from-black from-50% to-primary",
            )}
          >
            <div
              className={twMerge(
                "flex size-12 items-center justify-center rounded-lg border bg-white/10",
                highlight &&
                  "border-none bg-gradient-to-b from-primary/30 to-primary",
              )}
            >
              <Icon className="size-5" />
            </div>
            <div className="my-16">
              <div className="mb-2 text-2xl font-semibold">{name}</div>
              <div className="text-neutral-200">{description}</div>
            </div>
            <div className="mb-6 h-px bg-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
}
