import TournamentCard from "../tournament-card";

export default function TournamentGrid({ tournaments = [] }) {
  return (
    <div className="@container">
      <div className="grid gap-6 @3xl:grid-cols-2 @6xl:grid-cols-3">
        {tournaments.map((tournament) => (
          <TournamentCard {...tournament} key={tournament.id} />
        ))}
      </div>
    </div>
  );
}
