import { getTournaments } from "@/db/tournament";
import Carousel from "./carousel";

export default async function Hero() {
  const allTournaments = await getTournaments();
  const tournaments = allTournaments.slice(0, 3);

  return <Carousel tournaments={tournaments} />;
}
