export default function GameRating({ score }) {
  const getColor = (score) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-blue-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className={`flex size-12 items-center justify-center rounded-lg ${getColor(score)} font-bold text-white`}>
      {score}
    </div>
  );
}