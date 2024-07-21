import Party from "./Party";

export default function Match({
  bottomParty,
  topParty,
  tournamentId,
  match,
  onMouseEnter,
  onMouseLeave,
  isAdmin,
  ...props
}) {
  const bothPartiesAvailable = bottomParty.id && topParty.id;
  const matchCompleted = bottomParty.isWinner || topParty.isWinner;

  const parties = [topParty, bottomParty];
  return (
    <div className="space-y-1">
      {parties.map((party, index) => (
        <div
          onMouseEnter={() => onMouseEnter(party.id ?? undefined)}
          onMouseLeave={onMouseLeave}
          key={index}
        >
          <Party
            {...{
              tournamentId,
              bothPartiesAvailable,
              matchCompleted,
              matchId: match.id,
              onMouseEnter,
              onMouseLeave,
            }}
            {...party}
          />
        </div>
      ))}
    </div>
  );
}
