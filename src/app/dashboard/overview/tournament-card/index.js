import DurationTag from "@/components/ui/duration-tag";
import { Trophy01, Users01 } from "untitledui-js-base";

export default function TournamentCard() {
  return (
    <div
      style={{ backgroundImage: "url(/images/fortnite.webp)" }}
      className="h-80 rounded border border-neutral-700 bg-cover bg-center"
    >
      <div className="flex h-full flex-1 flex-col justify-between">
        <div className="p-8">
          <DurationTag startDate={new Date()} endDate={new Date()} />
        </div>
        <div className="bg-gradient-to-t from-black from-30% p-8">
          <h2 className="mb-2 text-2xl font-bold">
            Fortnite Zero Build – $10 Prize Pool!
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex w-fit items-center gap-2 bg-neutral-800 px-2 py-1">
              <Users01 className="size-5 text-neutral-400" />
              32
            </div>
            <div className="flex w-fit items-center gap-2 bg-neutral-800 px-2 py-1">
              <Trophy01 className="size-5 text-neutral-400" />
              $50,000
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
