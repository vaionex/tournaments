"use client";

import "./DateTimePicker.css";
import { Button } from "@/components/ui/button";
import Dropzone from "@/components/ui/dropzone";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import useGames from "@/hooks/games/useGames";
import { Image, Swords } from "lucide-react";
import toast from "react-hot-toast";
import RuleDescriptionEditor from "./rule-description-editor";
import { Ranks } from "@/utils/rank";
import { Target03 } from "untitledui-js-base";
import { Crown1 } from "iconsax-react";
import Bracket from "@/components/icons/bracket";
import DateTimePicker from "react-datetime-picker";
import PrizesSection from "./prizes-section";

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
    server_ip = "",
    start = new Date(),
    end = new Date(),
    max_players,
    min_rank = "Bronze",
    max_rank = "Grandmaster",
    prizes = [],
    rules = [],
  } = tournament;

  const min_rank_index = Ranks.findIndex(({ name }) => name == min_rank);
  const max_rank_index = Ranks.findIndex(({ name }) => name == max_rank);

  function setValue(property, value) {
    setTournament((tournament) => ({ ...tournament, [property]: value }));
  }

  function addPrizeTier() {
    setTournament({
      ...tournament,
      prizes: [...prizes, {}],
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

  const { requires_matchmaking_key = false, requires_server_ip } =
    games.find(({ id }) => id == game_id) || {};

  function handleSubmit(e) {
    e.preventDefault();
    if (!bannerUrl && !banner)
      return toast.error("Tournament banner is required");
    if (!game_id) return toast.error("Game is required");
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
          items={games.map(({ name, id, icon }) => ({
            label: (
              <div className="flex items-center gap-2">
                <img
                  src={icon}
                  className="size-6 overflow-hidden rounded-lg object-cover"
                />
                {name}
              </div>
            ),
            value: id,
          }))}
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

      {requires_server_ip && (
        <>
          <div>Server IP</div>
          <div>
            <Input
              value={server_ip}
              onChange={(e) => setValue("server_ip", e.target.value)}
              placeholder="129.119.108.181"
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
        value={new Date(start)}
        onChange={(value) => setValue("start", value)}
        minDate={new Date()}
        required
      />

      <div>End</div>
      <DateTimePicker
        value={new Date(end)}
        onChange={(value) => setValue("end", value)}
        minDate={new Date(start)}
        required
      />

      <div>Prizes</div>
      <div>
        <div className="">
          <PrizesSection
            prizes={prizes}
            onChange={(v) => setValue("prizes", v)}
            disableAddPrize={prizes?.length >= max_players}
          />
        </div>
      </div>
      <div>Max Players</div>
      <Input
        type="number"
        value={max_players}
        onChange={(e) => {
          const players = Number(e.target.value) || 1;
          setValue("max_players", players);
          setValue("prizes", prizes.slice(0, players));
        }}
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
      <div className="space-y-4 py-4">
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
