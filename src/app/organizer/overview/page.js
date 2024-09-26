import { Cup } from "iconsax-react";
import Card from "../components/Card";
import {
  Airplay,
  Award04,
  BarChartSquare01,
  CurrencyDollar,
  Target01,
  Users02,
} from "untitledui-js-base";
import { twMerge } from "tailwind-merge";
import TournamentCard from "@/components/tournament/tournament-card";
import LogoMarkOutline from "@/components/icons/logo-mark-outline";
import { getUser } from "@/supabase/server";
import { getOverview } from "@/db/organizer";
import IconLabel from "../components/IconLabel";
import Timeline from "./components/Timeline";
import RookieOrganizer from "@/components/icons/organizer-achievements/RookieOrganizer";
import EventPieChart from "./components/EventPieChart";

export default async function OverviewPage() {
  const { id: user_id } = await getUser();
  const {
    upcomingTournament,
    numberOfPlayers,
    numberOfTournaments,
    tournaments,
  } = await getOverview(user_id);

  return (
    <div className="flex gap-4">
      <div className="flex flex-1 flex-col gap-[inherit]">
        <div className="flex gap-[inherit]">
          <Card className="flex-1">
            <IconLabel label="Upcoming" icon={LogoMarkOutline} />
            {upcomingTournament ? (
              <TournamentCard className="h-44" {...upcomingTournament} />
            ) : (
              <div className="h-44">No Upcoming Tournament</div>
            )}
          </Card>
          <div className="grid grid-cols-2 gap-[inherit]">
            {[
              {
                label: "Hosted Events",
                icon: Cup,
                iconContainerClassName: "bg-green-500/10",
                iconClassName: "text-green-500",
                value: numberOfTournaments,
              },
              {
                label: "Events Rating",
                icon: Award04,
                iconContainerClassName: "bg-yellow-500/10",
                iconClassName: "text-yellow-500",
                value: 0,
              },
              {
                label: "Sponsorship Secured",
                icon: CurrencyDollar,
                iconContainerClassName: "bg-purple-500/10",
                iconClassName: "text-purple-500",
                value: 0,
              },
              {
                label: "Players Involved",
                icon: Users02,
                iconContainerClassName: "bg-primary/10",
                iconClassName: "text-primary",
                value: numberOfPlayers,
              },
            ].map(
              ({
                label,
                icon: Icon,
                iconContainerClassName,
                iconClassName,
                value,
              }) => (
                <Card className="flex flex-col justify-between" key={label}>
                  <div className="flex gap-2">
                    <div
                      className={twMerge(
                        iconContainerClassName,
                        "flex size-8 items-center justify-center",
                      )}
                    >
                      <Icon className={twMerge(iconClassName, "size-4")} />
                    </div>
                    <div className="text-xs text-neutral-400">{label}</div>
                  </div>
                  <div className="text-3xl font-bold text-white">{value}</div>
                </Card>
              ),
            )}
          </div>
        </div>
        <Card className="relative h-96 w-full">
          <Timeline tournaments={tournaments} />
        </Card>
      </div>
      <div className="flex w-[25rem] flex-col gap-[inherit]">
        <Card>
          <IconLabel label="Ad performance" icon={Airplay} />
          <div className="flex items-end gap-2">
            <div className="text-3xl font-bold">0</div>
            <div className="mb-1 text-xs text-neutral-500">Impressions</div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-sm font-semibold">
            {[
              { label: "ER", value: "0" },
              { label: "CTR", value: "0" },
              { label: "CR", value: "0" },
            ].map(({ label, value }) => (
              <div className="flex items-center gap-2" key={label}>
                <div className="text-neutral-400">{label}</div>
                <div className="text-green-500">{value}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="flex h-72 flex-col">
          <IconLabel label="Most popular events" icon={BarChartSquare01} />
          <EventPieChart tournaments={tournaments} />
        </Card>

        <Card>
          <IconLabel label="Achievements" icon={Target01} />
          <div>
            {[
              {
                name: "Rookie Organizer",
                description:
                  "Successfully host your first tournament on Tournaments.com with at least 50 participants.",
              },
            ].map(({ name, description }) => (
              <div
                className="flex items-center justify-center rounded-xl bg-white/5"
                key={name}
              >
                <div className="flex size-20 items-center justify-center">
                  <RookieOrganizer className="size-11" />
                </div>
                <div className="flex flex-1 flex-col gap-1 p-4 pl-0">
                  <div className="text-lg font-medium">{name}</div>
                  <div className="text-sm text-neutral-400">{description}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
