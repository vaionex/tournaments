import Avatar from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getTournament } from "@/db/tournament";
import { formatCurrency } from "@/utils/format";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { ChevronRight, PieChart01 } from "untitledui-js-base";

export default async function Sponsor({ params: { id } }) {
  const tournament = await getTournament(id);
  const { Sponsorship = [], sponsorship_target } = tournament;
  const totalSponsorship = Sponsorship.reduce(
    (acc, { amount }) => acc + amount,
    0,
  );

  const progress =
    sponsorship_target > 0
      ? totalSponsorship / sponsorship_target
      : totalSponsorship > 0
        ? 1
        : 0;

  const percentage = Math.round(progress * 100);

  function Section({ label, value, children, className }) {
    return (
      <div className={twMerge("flex-1 space-y-4 p-6", className)}>
        <div>
          <div className="text-xl font-bold text-neutral-400">{label}</div>
          <div className="text-2xl font-semibold">{value}</div>
        </div>
        <div>{children}</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex divide-x divide-white/20 rounded-lg border border-white/20">
        <Section
          label="Sponsorship Progress"
          value={`${percentage}%`}
          className="flex-[2]"
        >
          <div className="rounded-full bg-neutral-800">
            <div
              className="h-2 rounded-full bg-lime-500"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between">
            {Array(50)
              .fill(0)
              .map((_, i) => (
                <div className="size-px rounded-full bg-white" />
              ))}
          </div>
        </Section>
        <Section
          label="Total Amount"
          value={formatCurrency(totalSponsorship)}
        />
        <Section label="Target" value={formatCurrency(sponsorship_target)}>
          <div className="flex w-fit items-center justify-between gap-2 rounded-full border border-lime-500 bg-lime-600/30 px-3 py-1 font-medium text-lime-500">
            <PieChart01 className="size-3.5" />
            {percentage}%
          </div>
        </Section>
      </div>
      <div className="mt-8 rounded-lg border border-white/20">
        <div>
          <div className="flex items-center justify-between px-6 py-5">
            <div className="text-2xl font-bold">Current Sponsorship</div>
            <Button variant="white" asChild>
              <Link href={`/sponsor/events/${id}`}>
                Become a sponsor
                <ChevronRight />
              </Link>
            </Button>
          </div>
        </div>

        <table className="w-full text-sm [&_td]:px-6 [&_td]:py-3 [&_th]:px-6 [&_th]:py-3">
          <thead>
            <tr className="bg-white/10">
              <th className="text-left">Name</th>
              <th className="text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {Sponsorship.map(
              ({ User: { username, profile_picture }, amount }) => (
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <Avatar src={profile_picture} />
                      {username}
                    </div>
                  </td>
                  <td>{formatCurrency(amount)}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
