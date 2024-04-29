import { getTournament } from "@/db/tournament";

export default async function Tournament({ params: { id } }) {
  const { name } = await getTournament(id);
  return (
    <div>
      <h1 className="text-3xl font-semibold">{name}</h1>
    </div>
  );
}
