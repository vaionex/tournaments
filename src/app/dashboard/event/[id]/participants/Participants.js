"use client";
import Avatar from "@/components/ui/avatar";
import { format } from "date-fns";
import { upperFirst } from "lodash";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Users01 } from "untitledui-js-base";

export default function ParticipantsList({ participants }) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  return (
    <div>
      <div className="flex items-center border-b border-inherit p-4 text-neutral-400">
        <div className="flex flex-1 items-center gap-2">
          <Users01 />
          Participants
        </div>
        <div className="rounded border border-white/5 bg-white/5 p-1">
          {["remaining", "all"].map((filter) => (
            <button
              className={twMerge(
                "cursor-pointer rounded px-4",
                selectedFilter == filter && "bg-white/10",
              )}
              onClick={() => setSelectedFilter(filter)}
            >
              {upperFirst(filter)}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3 p-4">
        {participants.map(
          ({ id, User: { username, profile_picture }, created_at }) => (
            <div
              className="flex justify-between gap-5 rounded-lg border border-white/10 from-primary-950/50 px-4 py-2 transition hover:bg-gradient-to-l"
              key={id}
            >
              <div className="flex items-center gap-5">
                <Avatar src={profile_picture} className="size-16" />
                <div className="text-lg font-medium">{username}</div>
              </div>
              <div>
                <div className="text-xs text-neutral-400">
                  {format(created_at, "do MMM yyyy, hh:mm O")}
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
