"use client";
import { Scheduler } from "@bitnoi.se/react-scheduler";
import "@bitnoi.se/react-scheduler/dist/style.css";
import "./Timeline.css";

export default function Timeline({ tournaments }) {
  return (
    <Scheduler
      config={{
        defaultTheme: "dark",
        isFiltersButtonVisible: false,
        showTooltip: false,
        theme: {
          dark: {
            primary: "#1A1A1A",
            gridBackground: "#141414",
            secondary: "#141414",
            border: "#242424",
            accent: "#004EEB",
          },
        },
      }}
      data={tournaments.map((tournament) => ({
        id: tournament.id,
        label: {
          icon: tournament.banner,
          title: tournament.name,
        },
        data: [
          {
            id: tournament.id,
            startDate: new Date(tournament.start),
            endDate: new Date(tournament.end),
            occupancy: tournament.max_players,
            title: tournament.name,
            bgColor: "rgb(254,165,177)",
          },
        ],
      }))}
    />
  );
}
