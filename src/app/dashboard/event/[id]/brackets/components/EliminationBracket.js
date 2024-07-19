import {
  createTheme,
  DoubleEliminationBracket,
  SVGViewer,
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

  return (
    <DoubleEliminationBracket
      matches={{ lower, upper }}
      matchComponent={CustomMatch}
      svgWrapper={({ children, ...props }) => (
        <SVGViewer
          width={1600}
          height={1000}
          theme={svgTheme}
          background="black"
          SVGbackground="black"
          {...props}
          className="[&_rect]:fill-black"
        >
          {children}
        </SVGViewer>
      )}
    />
  );
});
