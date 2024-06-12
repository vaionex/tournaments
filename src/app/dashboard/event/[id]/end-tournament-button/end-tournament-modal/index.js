import Avatar from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Select from "@/components/ui/select";
import useEndTournament from "@/hooks/tournament/useEndTournament";
import useParticipants from "@/hooks/tournament/useParticipants";
import useTournament from "@/hooks/tournament/useTournament";
import { formatCurrency } from "@/utils/format";
import { add } from "lodash";
import ordinal from "ordinal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trophy01 } from "untitledui-js-base";

export default function EndTournamentModal({ open, setOpen, tournamentId }) {
  const [reviewed, setReviewed] = useState(false);
  const [winners, setWinners] = useState([]);
  const { data: { prize_pool_tiers = [100], prize_pool = 0 } = {} } =
    useTournament(tournamentId);
  const { data: participants = [] } = useParticipants(tournamentId);
  const { mutate: end, isLoading } = useEndTournament();

  useEffect(() => {
    setWinners(
      prize_pool_tiers.map((tier) => ({ participant_id: undefined, tier })),
    );
  }, [prize_pool_tiers]);

  function handleEnd() {
    const tierSum = winners.map(({ tier }) => tier).reduce(add, 0);
    if (tierSum != 100) return toast.error("Percentages must add up to 100");
    if (winners.some(({ participant_id }) => !participant_id))
      toast.error("Please fill all tiers");

    end(
      { tournament_id: tournamentId, winners },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success("Tournament Completed");
        },
        onError: (e) => {
          console.log(e);
          toast.error(
            e?.response?.data?.error ?? "An unexpected error occurred",
          );
        },
      },
    );
  }

  return (
    <Modal
      className="max-w-xl rounded-lg border border-white/20 bg-neutral-900 p-8"
      {...{ open, setOpen }}
    >
      <div className="mb-9 flex items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-lg border border-lime-400 bg-lime-600">
          <Trophy01 className="size-5" />
        </div>
        <div>
          <div className="text-lg font-semibold">Award Prizes to Winners</div>
          <div className="text-neutral-400">
            Distribute the prize pool to the winning team.
          </div>
        </div>
      </div>
      <div>
        <div className="mb-2 font-bold">Attention</div>
        <div className="text-neutral-300">
          Review and confirm the prize allocations for each winning team. Adjust
          the amounts if necessary before finalizing the payments.
        </div>
        <div className="text-red-500">This action cannot be undone.</div>
      </div>
      <div className="my-3 space-y-4">
        {winners.map(({ participant_id, tier }, index) => (
          <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-black p-4 text-xl">
            <div className="w-10 font-medium opacity-50">
              {ordinal(index + 1)}
            </div>
            <div className="flex flex-1 items-center gap-2">
              <Select
                items={participants.map(
                  ({ id, User: { username, profile_picture } }) => ({
                    label: (
                      <div className="flex items-center gap-2">
                        <Avatar src={profile_picture} className="size-6" />
                        {username}
                      </div>
                    ),
                    value: id,
                  }),
                )}
                value={participant_id}
                onChange={(value) => {
                  const temp = [...winners];
                  temp[index].participant_id = value;
                  setWinners(temp);
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16">
                <Input
                  value={`${tier}%`}
                  onChange={(e) => {
                    const temp = [...winners];
                    temp[index].tier = Number(
                      e.target.value.replaceAll("%", ""),
                    );
                    setWinners(temp);
                  }}
                />
              </div>
              <div className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-base font-normal">
                {formatCurrency(prize_pool * (tier / 100))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-4 space-y-3">
        <Checkbox
          label="I have reviewed the prize distribution and confirm it is accurate."
          checked={reviewed}
          onCheckedChange={setReviewed}
          id="reviewed"
        />
        <Checkbox label="Notify the winners." id="notify" />
      </div>
      <Button
        className="w-full"
        disabled={!reviewed || isLoading}
        onClick={handleEnd}
      >
        Pay
      </Button>
    </Modal>
  );
}
