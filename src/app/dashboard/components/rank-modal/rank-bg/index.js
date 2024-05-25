import RankBgActive from "./RankBGActive";
import RankBGInactive from "./RankBGInactive";

export default function RankBG({ active }) {
  if (active) return <RankBgActive />;

  return <RankBGInactive />;
}
