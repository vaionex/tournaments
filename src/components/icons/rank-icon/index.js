import Bronze from "./bronze";
import Silver from "./silver";

export default function RankIcon({ rank = "bronze", ...props }) {
  switch (rank.toLowerCase()) {
    case "bronze":
      return <Bronze {...props} />;
    case "silver":
      return <Silver {...props} />;
  }
}
