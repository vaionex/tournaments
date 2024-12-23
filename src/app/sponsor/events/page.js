"use client";
import Card from "@/app/dashboard/components/Card";
import Avatar from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import useUpcomingTournaments from "@/hooks/tournament/useUpcomingTournaments";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { Star01 } from "untitledui-js-base";

export default function Events() {
  const { data: tournaments = [], isLoading } = useUpcomingTournaments();
  const [search, setSearch] = useState("");
  const searchedTournaments = tournaments.filter(
    (tournament) =>
      tournament.name.toLowerCase().includes(search.toLowerCase()) ||
      search == "",
  );

  if (isLoading)
    return (
      <div className="py-24">
        <Loader />
      </div>
    );

  if (tournaments.length == 0)
    return (
      <div className="py-24 text-center text-2xl font-medium text-neutral-400">
        No upcoming tournaments
      </div>
    );

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="text-neutral-300">
          <div className="text-xl font-bold">Recommended Tournaments</div>
          <div className="text-lg">
            Boost your brand and connect with gamers worldwide
          </div>
        </div>
        <Input
          className="bg-transparent"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          search
        />
      </div>
      <div className="mt-8 grid grid-cols-3 gap-4">
        {searchedTournaments.map(
          ({ id, name, start, end, Game, banner, User, rating }) => (
            <Card key={id} className="space-y-4 p-2">
              <div
                className="flex h-40 items-start rounded-lg bg-cover bg-center p-2.5"
                style={{ backgroundImage: `url('${banner}')` }}
              >
                <div className="flex items-center gap-4">
                  <div>
                    <Avatar
                      profile_picture={User?.profile_picture}
                      className="size-10 rounded-lg"
                    />
                  </div>
                  {typeof rating[0]?.avg == "number" && (
                    <div className="flex items-center gap-1 rounded-lg border border-yellow-600 bg-black/70 px-2 py-1.5 text-xs">
                      <Star01 className="size-4 text-yellow-600" />
                      {rating[0]?.avg?.toFixed?.(1)}
                    </div>
                  )}
                </div>
              </div>
              <div></div>
              <div className="space-y-1">
                <div className="text-lg font-bold">{name}</div>
                <div className="text-sm font-medium text-neutral-400">
                  {format(start, "dd MMM yyyy")} - {format(end, "dd MMM yyyy")}-
                  {Game.name}
                </div>
              </div>
              <Button variant="green" size="sm" asChild>
                <Link href={`/sponsor/events/${id}`}>Become Sponsor</Link>
              </Button>
            </Card>
          ),
        )}
      </div>
    </Card>
  );
}
