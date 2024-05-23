import { getTournament } from "@/db/tournament";
import { formatCurrency } from "@/utils/format";
import { format } from "date-fns";
import { DollarCircle } from "iconsax-react";
import Markdown from "react-markdown";
import { twMerge } from "tailwind-merge";
import { File06, List, Trophy01 } from "untitledui-js-base";
import rehypeRaw from "rehype-raw";

export default async function Details({ params: { id } }) {
  const {
    name,
    start,
    end,
    prize_pool,
    Game,
    prize_pool_tiers = [100],
    rules = [],
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
        <div className={twMerge("mb-2.5 px-4 py-3", highlighted)}>
          <div
            className={twMerge("mb-2 flex items-center gap-2 text-neutral-400")}
          >
            <Trophy01 className="size-4" />
            Prize Pool
          </div>
          <div className="text-3xl font-semibold">
            {formatCurrency(prize_pool)}
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left font-normal">
              <th className="w-20 py-2">Position</th>
              <th className="w-20 py-2">Prize</th>
            </tr>
          </thead>
          <tbody>
            {prize_pool_tiers.map((tier, index) => (
              <tr key={index}>
                <td>
                  <div
                    className={twMerge(
                      "w-full py-2.5 text-center",
                      highlighted,
                    )}
                  >
                    {index + 1}
                  </div>
                </td>
                <td>
                  <div
                    className={twMerge(
                      "m-1 w-full py-2.5 text-center",
                      highlighted,
                    )}
                  >
                    {tier}%
                  </div>
                </td>
                <td>
                  <div
                    className={twMerge(
                      "ml-2 w-full py-2.5 text-center",
                      highlighted,
                    )}
                  >
                    {formatCurrency((tier / 100) * prize_pool)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
