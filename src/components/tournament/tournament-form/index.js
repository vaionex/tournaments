"use client";
import { Button } from "@/components/ui/button";
import Dropzone from "@/components/ui/dropzone";
import { Input } from "@/components/ui/input";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import Select from "@/components/ui/select";
import useGames from "@/hooks/games/useGames";
import { format as formatDate } from "date-fns";
import { add } from "lodash";
import { Image, Swords } from "lucide-react";
import toast from "react-hot-toast";
import RuleDescriptionEditor from "./rule-description-editor";
import { Ranks } from "@/utils/rank";
import { Target03 } from "untitledui-js-base";
import { Crown1 } from "iconsax-react";
import Bracket from "@/components/icons/bracket";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "./DateTimePicker.css";

const Formats = [
  {
    name: "Bracket",
    icon: Bracket,
  },
  {
    name: "Kill Race",
    icon: Target03,
  },
  {
    name: "Victory Royal Race",
    icon: Crown1,
  },
  {
    name: "Battle Royal",
    icon: Swords,
  },
];

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
    format,
    game_id,
    matchmaking_key = "",
    start = new Date(),
    end = new Date(),
    max_players,
    min_rank = "Bronze",
    max_rank = "Grandmaster",
    prize_pool,
    prize_pool_tiers = [100],
    entry_fee,
    rules = [],
  } = tournament;

  const min_rank_index = Ranks.findIndex(({ name }) => name == min_rank);
  const max_rank_index = Ranks.findIndex(({ name }) => name == max_rank);

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

  function addRuleSection() {
    setTournament({
      ...tournament,
      rules: [...rules, { title: "", description: "" }],
    });
  }

  function updateRuleSection(value, property, index) {
    const temp = [...rules];
    temp[index][property] = value;
    setTournament({
      ...tournament,
      rules: temp,
    });
  }

  const { data: games = [] } = useGames();

  const { requires_matchmaking_key = false } =
    games.find(({ id }) => id == game_id) || {};

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
          value={game_id || ""}
          onChange={(value) => value && setValue("game_id", value)}
        />
      </div>

      {requires_matchmaking_key && (
        <>
          <div>Matchmaking Key</div>
          <div>
            <Input
              value={matchmaking_key}
              onChange={(e) => setValue("matchmaking_key", e.target.value)}
              required
            />
          </div>
        </>
      )}
      <div>Format</div>
      <div>
        <Select
          items={Formats.map(({ name, icon: Icon }) => ({
            value: name,
            label: (
              <div className="flex items-center gap-2">
                <Icon className="size-4" /> {name}
              </div>
            ),
          }))}
          placeholder="Select a format..."
          value={format || ""}
          onChange={(value) => value && setValue("format", value)}
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
      <DateTimePicker
        value={start}
        onChange={(value) => setValue("start", value)}
        required
      />

      <div>End</div>
      <DateTimePicker
        value={end}
        onChange={(value) => setValue("end", value)}
        required
      />

      <div>Prize Pool</div>
      <div>
        <Input
          type="number"
          value={Number(prize_pool / 100).toString()}
          onChange={(e) =>
            setValue("prize_pool", Number(e.target.value * 100) || 0)
          }
          min={1}
          leftSection="$"
          required
        />
        <div className="mt-2.5 rounded-lg border border-neutral-700 p-4">
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="">
                <th className="pb-3 text-left">Position</th>
                <th className="pb-3 text-left">Prize (%)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {prize_pool_tiers.map((tier, index) => (
                <tr key={index}>
                  <td>
                    <div className="flex h-11 w-20 w-full items-center justify-center rounded-xl bg-white/10 text-center align-middle">
                      <div>{index + 1}</div>
                    </div>
                  </td>
                  <td className="px-2">
                    <Input
                      className="w-20"
                      value={Number(tier).toString()}
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
                      value={(
                        Math.round((tier / 100) * prize_pool) / 100
                      ).toFixed(2)}
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
      <div>Skill Level</div>
      <div className="flex items-center gap-8">
        <Select
          items={Ranks.slice(0, max_rank_index + 1).map(({ name }) => ({
            label: name,
            value: name,
          }))}
          value={min_rank}
          onChange={(value) => value && setValue("min_rank", value)}
        />
        <div> - </div>
        <Select
          items={Ranks.slice(min_rank_index).map(({ name }) => ({
            label: name,
            value: name,
          }))}
          value={max_rank}
          onChange={(value) => value && setValue("max_rank", value)}
        />
      </div>

      {/* <div>Entry Fee</div>
      <div className="space-y-4">
        <RadioGroup
          value={entry_fee == 0 ? "free" : "paid"}
          onValueChange={(value) =>
            value == "free"
              ? setValue("entry_fee", 0)
              : setValue("entry_fee", 10000)
          }
        >
          <Radio value="free" label="Free entry" />
          <Radio value="paid" label="With entry fee" />
        </RadioGroup>
        {entry_fee != 0 && (
          <Input
            type="number"
            value={entry_fee / 100}
            onChange={(e) => setValue("entry_fee", Number(e.target.value * 100) || 0)}
            min={0}
            leftSection="$"
            required
          />
        )}
      </div> */}

      <div>Rules</div>
      <div className="space-y-4 p-4">
        {rules.map(({ title, description }, index) => (
          <div className="rounded-lg border border-white/20 p-4" key={index}>
            <div className="mb-2">
              <Input
                value={title}
                placeholder="Title"
                onChange={(e) =>
                  updateRuleSection(e.target.value, "title", index)
                }
              />
            </div>
            <RuleDescriptionEditor
              value={description}
              onChange={(value) =>
                updateRuleSection(value, "description", index)
              }
              placeholder="Details"
            />
          </div>
        ))}
        <Button variant="black" type="button" onClick={addRuleSection}>
          Add Section
        </Button>
      </div>
      {children}
    </form>
  );
}
