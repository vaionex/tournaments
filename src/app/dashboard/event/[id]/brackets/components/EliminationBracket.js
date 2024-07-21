import {
  createTheme,
  DoubleEliminationBracket,
  SingleEliminationBracket,
} from "@g-loot/react-tournament-brackets";
import { partition } from "lodash";
import { memo, useCallback, useMemo } from "react";
import Match from "./Match";

const svgTheme = createTheme({
  svgBackground: "black",
});

export default memo(function EliminationBracket({ matches, tournamentId }) {
  const [lower, upper] = useMemo(
    () =>
      partition(matches, (match) =>
        matches.some((m) => m.nextLooserMatchId == match.id),
      ),
    [matches],
  );

  const CustomMatch = useCallback(
    (props) => <Match {...props} tournamentId={tournamentId} />,
    [tournamentId],
  );

  if (matches.length > 3)
    return (
      <DoubleEliminationBracket
        matches={{ lower, upper }}
        matchComponent={CustomMatch}
        svgWrapper={({ ...props }) => (
          <div
            style={{ width: "2000px", height: "100%" }}
            theme={svgTheme}
            background="black"
            SVGbackground="black"
            {...props}
            className="[&_rect]:fill-black"
          />
        )}
      />
    );

  return (
    <SingleEliminationBracket
      matches={matches}
      matchComponent={CustomMatch}
      svgWrapper={({ ...props }) => (
        <div
          style={{ width: "2000px", height: "100%" }}
          theme={svgTheme}
          background="black"
          SVGbackground="black"
          {...props}
          className="[&_rect]:fill-black"
        />
      )}
    />
  );
});
