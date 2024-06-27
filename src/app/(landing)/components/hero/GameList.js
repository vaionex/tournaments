import { getGames } from "@/db/game";

export default async function GameList() {
  const games = await getGames();

  return (
    <div className="flex items-center gap-4">
      {games.map(({ icon, id }) => (
        <div key={id}>
          <img
            src={icon}
            className="size-8 overflow-hidden rounded-lg object-cover"
          />
        </div>
      ))}
    </div>
  );
}
