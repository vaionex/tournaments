"use client";
import { Button } from "@/components/ui/button";
import Dropzone from "@/components/ui/dropzone";
import { Input } from "@/components/ui/input";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import Select from "@/components/ui/select";
import useGames from "@/hooks/games/useGames";
import { format } from "date-fns";
import { add } from "lodash";
import { Image } from "lucide-react";
import toast from "react-hot-toast";

export default function TournamentForm({
  tournament = {},
  setTournament,
  onSubmit,
  bannerUrl,
  children,
}) {
  const {
    name,
    description,
    banner,
    game_id,
    start = new Date(),
    end = new Date(),
    max_players,
    prize_pool,
    prize_pool_tiers = [100],
    entry_fee,
  } = tournament;

  function setValue(property, value) {
    setTournament({ ...tournament, [property]: value });
  }

  function addPrizePoolTier() {
    setTournament({
      ...tournament,
      prize_pool_tiers: [...prize_pool_tiers, 0],
    });
  }

  function updatePrizePoolTier(value, index) {
    if (index >= prize_pool_tiers.length) return;
    const temp = [...prize_pool_tiers];
    temp[index] = value;
    setTournament({
      ...tournament,
      prize_pool_tiers: temp,
    });
  }

  const { data: games = [] } = useGames();

  function handleSubmit(e) {
    e.preventDefault();
    if (!game_id) return toast.error("Game is required");
    if (prize_pool_tiers.reduce(add) != 100)
      return toast.error("Prize Pool Tiers must add to 100");
    onSubmit?.();
  }

  return (
    <form
      className="grid max-w-3xl gap-x-6 gap-y-6"
      style={{ gridTemplateColumns: "1fr 2.2fr" }}
      onSubmit={handleSubmit}
    >
      <div className="">Title</div>
      <Input
        value={name}
        onChange={(e) => setValue("name", e.target.value)}
        required
      />

      <div className="">Banner</div>
      <Dropzone
        onDrop={(files) => {
          if (files.length > 0) setValue("banner", files[0]);
        }}
        accept={{
          "image/png": [".png"],
          "image/svg": [".svg"],
          "image/jpg": [".jpg", ".jpeg"],
          "image/gif": [".gif"],
        }}
        files={[banner]}
        icon={Image}
      />

      {bannerUrl && (
        <>
          <div />
          <img src={bannerUrl} className="h-96 w-full object-cover" />
        </>
      )}

      <div>Select a game</div>
      <div>
        <Select
          items={games.map(({ name, id }) => ({ label: name, value: id }))}
          placeholder="Select a game..."
          value={game_id}
          onChange={(value) => setValue("game_id", value)}
        />
      </div>
      <div>Description</div>
      <Input
        value={description}
        onChange={(e) => setValue("description", e.target.value)}
        type="textarea"
        className="h-24"
        required
      />
      <div>Start</div>

      <Input
        type="datetime-local"
        value={format(start, "yyyy-MM-dd'T'hh:mm")}
        onChange={(e) => setValue("start", new Date(e.target.value))}
        required
      />

      <div>End</div>
      <Input
        type="datetime-local"
        value={format(end, "yyyy-MM-dd'T'hh:mm")}
        onChange={(e) => setValue("end", new Date(e.target.value))}
        required
      />
      <div>Prize Pool</div>
      <div>
        <Input
          type="number"
          value={prize_pool}
          onChange={(e) => setValue("prize_pool", Number(e.target.value) || 0)}
          min={1}
          leftSection="$"
          required
        />
        <div className="mt-2.5 border p-4">
          <table className="w-full">
            <thead>
              <tr className="">
                <th className="pb-3 text-left">Position</th>
                <th className="pb-3 text-left">Prize (%)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {prize_pool_tiers.map((tier, index) => (
                <tr>
                  <td className="h-11 w-20 rounded-xl bg-white/10 text-center">
                    {index + 1}
                  </td>
                  <td className="px-2">
                    <Input
                      className="w-20"
                      value={tier}
                      type="number"
                      min="0"
                      max="100"
                      onChange={(e) =>
                        updatePrizePoolTier(Number(e.target.value), index)
                      }
                    />
                  </td>
                  <td>
                    <Input
                      value={Math.round((tier / 100) * prize_pool)}
                      leftSection="$"
                      readOnly
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button
            onClick={addPrizePoolTier}
            type="button"
            variant="black"
            className="mt-2"
          >
            Add Tier
          </Button>
        </div>
      </div>
      <div>Max Players</div>
      <Input
        type="number"
        value={max_players}
        onChange={(e) => setValue("max_players", Number(e.target.value) || 0)}
        min={1}
        required
      />
      <div>Entry Fee</div>
      <div className="space-y-4">
        <RadioGroup
          value={entry_fee == 0 ? "free" : "paid"}
          onValueChange={(value) =>
            value == "free"
              ? setValue("entry_fee", 0)
              : setValue("entry_fee", 100)
          }
        >
          <Radio value="free" label="Free entry" />
          <Radio value="paid" label="With entry fee" />
        </RadioGroup>
        {entry_fee != 0 && (
          <Input
            type="number"
            value={entry_fee}
            onChange={(e) => setValue("entry_fee", Number(e.target.value) || 0)}
            min={0}
            leftSection="$"
            required
          />
        )}
      </div>
      {children}
    </form>
  );
}
