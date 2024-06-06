import Rank1 from "./rank1";
import Rank2 from "./rank2";
import Rank3 from "./rank3";

export default function TournamentRank({ position }) {
  if (position == 1) return <Rank1 />;
  if (position == 2) return <Rank2 />;
  if (position == 3) return <Rank3 />;
  return null;
}
