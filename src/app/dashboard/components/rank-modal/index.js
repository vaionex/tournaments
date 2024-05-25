import LogoMarkOutline from "@/components/icons/logo-mark-outline";
import RankIcon from "@/components/icons/rank-icon";
import LogoMark from "@/components/ui/logo-mark";
import Modal from "@/components/ui/modal";
import useUser from "@/hooks/auth/useUser";
import { Ranks } from "@/utils/rank";
import { Rank } from "iconsax-react";
import { Swords } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Trophy01, X } from "untitledui-js-base";
import RankBG from "./rank-bg";
import { formatValue } from "@/utils/format";

export default function RankModal(props) {
  const {
    data: { xp, rank: currentRank, nextRank, rankProgress },
  } = useUser();
  return (
    <Modal
      className="relative w-screen max-w-6xl rounded-xl border border-white/20 bg-black bg-contain bg-center bg-no-repeat"
      style={{ backgroundImage: `url(/images/dashboard/rank-modal-bg.webp)` }}
      {...props}
    >
      <button
        className="absolute right-4 top-4 opacity-50"
        onClick={() => props.setOpen?.(false)}
      >
        <X />
      </button>
      <div className="p-8">
        <div className="mb-16 flex items-center gap-4  text-xl font-semibold">
          <div className="flex size-12 items-center justify-center rounded-lg border border-yellow-500 bg-yellow-800">
            <Rank className="size-6" />
          </div>
          XP Rank Details
        </div>
        <div className="flex gap-4 text-center">
          {Ranks.map(({ rank, startXP, endXP }) => (
            <div className={twMerge("relative flex-1 p-4")} key={rank}>
              <div className="relative z-10">
                <div className="font-bold">{rank}</div>
                <RankIcon rank={rank} className="mx-auto my-5 block size-24" />
                <div className="whitespace-nowrap text-xs">
                  {endXP ? (
                    <span>
                      {formatValue(startXP)} - {formatValue(endXP)}
                    </span>
                  ) : (
                    <span>{formatValue(startXP)}+</span>
                  )}{" "}
                  XP
                </div>
                <LogoMark
                  className="mx-auto mt-2.5 size-12"
                  color={rank != currentRank && "#444"}
                />
              </div>

              {rank == currentRank && (
                <div className="absolute inset-x-0 top-0 z-10 h-2 bg-gradient-to-b from-neutral-600 to-neutral-400" />
              )}
              <RankBG active={rank == currentRank} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center divide-x border-t border-inherit">
        <div className="flex-1 border-inherit px-8 py-4">
          <div className="mb-6 text-xl font-semibold">Current Rank</div>
          <div className="text-sm">
            <span className="text-neutral-400">XP Earned:</span>{" "}
            <span className="font-semibold">{xp}</span>
          </div>
          <div className="mt-2">
            <div className="flex justify-between text-sm">
              <div className="mb-2 flex items-center gap-2">
                Current:
                <RankIcon rank={currentRank} className="size-4" />
                <span className="font-semibold">{currentRank}</span>
              </div>
              <div className="flex items-center gap-2">
                Next:
                <RankIcon rank={nextRank} className="size-4" />
                <span className="font-semibold">{nextRank}</span>
              </div>
            </div>
            <div className="h-2 w-full rounded-full bg-gradient-to-b from-black to-gray-600">
              <div
                className="h-full  rounded-full bg-gradient-to-b from-gray-700 to-white"
                style={{ width: `${rankProgress}%` }}
              />
            </div>
            <div className="mt-2.5 flex justify-between">
              {Array(90)
                .fill(0)
                .map((_, index) => (
                  <div className="size-0.5 bg-white" key={index} />
                ))}
            </div>
          </div>
        </div>
        <div className="flex-1 border-inherit px-8 py-4 pb-8">
          <div className="mb-6 text-xl font-semibold">How to Earn XP:</div>
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center gap-2">
              <LogoMarkOutline className="size-5" />
              <span className="font-bold">Compete</span> in tournaments: Gain XP
              based on your standings.
            </div>
            <div className="flex items-center gap-2">
              <Trophy01 className="size-5 text-green-500" />
              <span className="font-bold">Achieve Victories: </span>
              Extra XP for each win.
            </div>
            <div className="flex items-center gap-2">
              <Swords className="size-5 text-yellow-500" />
              <span className="font-bold">Complete Challenges: </span>
              Fulfill daily and weekly challenges for bonus XP.
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
