"use client";
import { Button } from "@/components/ui/button";
import Dropzone from "@/components/ui/dropzone";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import useGames from "@/hooks/games/useGames";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useFile from "@/hooks/util/useFile";
import useTournament from "@/hooks/tournament/useTournament";
import { Image } from "lucide-react";
import useUpdateTournament from "@/hooks/tournament/useUpdateTournament";
import toast from "react-hot-toast";

export default function EditTournament() {
  const { id } = useParams();
  const { data: tournament } = useTournament(id);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner, bannerUrl] = useFile();
  const [gameId, setGameId] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [maxPlayers, setMaxPlayers] = useState(10);
  const [prizePool, setPrizePool] = useState(1000);
  const [entryFee, setEntryFee] = useState(0);

  const { data: games = [] } = useGames();
  const { mutate: update, isLoading } = useUpdateTournament({
    onSuccess: () => {
      window.location.href = "overview";
    },
    onError: () => toast.error("Something went wrong"),
  });

  useEffect(() => {
    if (!tournament) return;
    const {
      name,
      description,
      game_id,
      start,
      end,
      max_palyers,
      prize_pool,
      entry_fee,
    } = tournament;
    setName(name);
    setDescription(description);
    console.log({ game_id });
    setGameId(game_id);
    setStart(start);
    setEnd(end);
    setMaxPlayers(max_palyers);
    setPrizePool(prize_pool);
    setEntryFee(entry_fee);
  }, [tournament]);

  function handleUpdate(e) {
    e.preventDefault();
    console.log({ gameId, tournament });
    update({
      id,
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
      <form
        className="grid max-w-5xl gap-x-6 gap-y-6"
        style={{ gridTemplateColumns: "1fr 2.2fr" }}
        onSubmit={handleUpdate}
      >
        <div className="">Title</div>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="">Banner</div>
        <Dropzone
          onDrop={(files) => {
            if (files.length > 0) setBanner(files[0]);
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

        {(bannerUrl || tournament?.banner) && (
          <>
            <div />
            <img
              src={bannerUrl || tournament?.banner}
              className="h-96 w-full object-cover"
            />
          </>
        )}

        <div>Select a game</div>
        <div>
          <Select
            items={games.map(({ name, id }) => ({ label: name, value: id }))}
            placeholder="Select a game..."
            value={gameId}
            onChange={(value) => value && setGameId(value)}
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
          type="datetime-local"
          value={format(start, "yyyy-MM-dd'T'hh:mm")}
          onChange={(e) => setStart(new Date(e.target.value))}
          required
        />

        <div>End</div>
        <Input
          type="datetime-local"
          value={format(end, "yyyy-MM-dd'T'hh:mm")}
          onChange={(e) => setEnd(new Date(e.target.value))}
          required
        />
        <div>Prize Pool</div>
        <Input
          type="number"
          value={prizePool}
          onChange={(e) => setPrizePool(Number(e.target.value) || 0)}
          min={1}
          leftSection="$"
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
          leftSection="$"
          required
        />
        <div />
        <div className="mb-12 flex justify-end">
          <Button type="submit" loading={isLoading}>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
