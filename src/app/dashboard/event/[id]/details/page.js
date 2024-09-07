import { getTournament } from "@/db/tournament";
import { formatCurrency } from "@/utils/format";
import { format } from "date-fns";
import { DollarCircle } from "iconsax-react";
import Markdown from "react-markdown";
import { twMerge } from "tailwind-merge";
import { File06, GamingPad01, List, Trophy01 } from "untitledui-js-base";
import rehypeRaw from "rehype-raw";
import RewardPill from "@/app/dashboard/components/RewardPill";
import ordinal from "ordinal";
import PositionIcon from "@/app/dashboard/components/PositionIcon";

export default async function Details({ params: { id } }) {
  const {
    name,
    start,
    end,
    prize_pool,
    Game,
    prizes = [],
    rules = [],
    min_rank,
    max_rank,
  } = await getTournament(id);

  const highlighted = "bg-white/5 border border-white/10 rounded-lg";

  function Section({ title, icon: Icon, children, className = "" }) {
    return (
      <div className={twMerge("rounded-lg border border-white/20", className)}>
        <div className="flex items-center gap-2.5 border-b border-inherit pb-4 pl-6 pt-6 text-xl font-bold">
          <Icon />
          {title}
        </div>
        <div className="p-6 pb-4">{children}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      <Section title="Prizes" icon={DollarCircle}>
        <div className="space-y-6">
          {prizes.map(({ xp, cash, giftCard }, index) => {
            return (
              <div className="flex gap-4" key={index}>
                <PositionIcon position={index + 1} />
                <div>
                  <div className="mb-1 font-semibold">
                    {ordinal(index + 1)} Position
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cash && <RewardPill type="cash" value={cash} />}
                    {xp && <RewardPill type="xp" value={xp} />}
                    {giftCard?.file && (
                      <RewardPill
                        type="gift-card"
                        value={giftCard.label || "Gift Card"}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section icon={File06} title="Rules" className="row-span-2">
        <div className="space-y-4">
          {rules.map(({ title, description }, index) => (
            <div key={index}>
              <div className="text-neutral-400">{title}</div>
              <Markdown rehypePlugins={[rehypeRaw]}>{description}</Markdown>
            </div>
          ))}
        </div>
      </Section>
      <Section icon={List} title="Details">
        <div className="space-y-4">
          {[
            { name: "Event Details", details: name },
            { name: "Game", details: Game?.name },
            { name: "Skill Level", details: `${min_rank} - ${max_rank}` },
            {
              name: "Date",
              details: `${format(start, "dd/MM/yyyy")} - ${format(end, "dd/MM/yyyy")}`,
            },
          ].map(({ name, details }) => (
            <div key={name}>
              <div className="text-neutral-400">{name}</div>
              <div className="font-medium">{details}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
