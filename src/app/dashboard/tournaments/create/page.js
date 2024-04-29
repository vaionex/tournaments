"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import useGames from "@/hooks/games/useGames";
import useCreateTournament from "@/hooks/tournament/useCreateTournament";
import { addDays, format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreateTournament() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState();
  const [gameId, setGameId] = useState();
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(addDays(new Date(), 2));
  const [maxPlayers, setMaxPlayers] = useState(10);
  const [prizePool, setPrizePool] = useState(1000);
  const [entryFee, setEntryFee] = useState(1000);
  const { push } = useRouter();

  const { data: games = [] } = useGames();
  const { mutate: create, isLoading } = useCreateTournament({
    onSuccess: ({ id }) => push(`/dashboard/event/${id}`),
  });

  function handleCreate(e) {
    e.preventDefault();
    if (!gameId) return toast.error("Game is required");
    create({
      name,
      description,
      banner,
      game_id: gameId,
      start,
      end,
      max_players: maxPlayers,
      prize_pool: prizePool,
      entry_fee: entryFee,
    });
  }

  return (
    <div>
      <h2 className="mb-4 text-3xl font-semibold">Create Tournament</h2>
      <form
        className="grid max-w-3xl gap-x-6 gap-y-6"
        style={{ gridTemplateColumns: "1fr 1.4fr" }}
        onSubmit={handleCreate}
      >
        <div className="">Title</div>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="">Banner</div>
        <Input
          type="file"
          onChange={(e) => setBanner(e.target.files[0])}
          required
        />

        <div>Select a game</div>
        <div>
          <Select
            items={games.map(({ name, id }) => ({ label: name, value: id }))}
            placeholder="Select a game..."
            value={gameId}
            onChange={setGameId}
          />
        </div>

        <div>Description</div>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="textarea"
          className="h-24"
          required
        />

        <div>Start</div>
        <Input
          type="date"
          value={format(start, "yyyy-MM-dd")}
          onChange={(e) => setStart(new Date(e.target.value))}
          required
        />

        <div>End</div>
        <Input
          type="date"
          value={format(end, "yyyy-MM-dd")}
          onChange={(e) => setEnd(new Date(e.target.value))}
          required
        />

        <div>Prize Pool</div>
        <Input
          type="number"
          value={prizePool}
          onChange={(e) => setPrizePool(Number(e.target.value) || 0)}
          min={1}
          required
        />

        <div>Max Players</div>
        <Input
          type="number"
          value={maxPlayers}
          onChange={(e) => setMaxPlayers(Number(e.target.value) || 0)}
          min={1}
          required
        />

        <div>Entry Fee</div>
        <Input
          type="number"
          value={entryFee}
          onChange={(e) => setEntryFee(Number(e.target.value) || 0)}
          min={1}
          required
        />

        <div />
        <div className="flex justify-end">
          <Button type="submit" loading={isLoading}>
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}
