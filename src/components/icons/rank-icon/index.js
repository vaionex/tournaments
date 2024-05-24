export default function RankIcon({ rank = "Bronze", ...props }) {
  return (
    <img
      {...props}
      src={`/images/ranks/${rank.toLowerCase()}.webp`}
      onError={(e) => (e.target.style.opacity = "0")}
      alt={rank}
    />
  );
}
