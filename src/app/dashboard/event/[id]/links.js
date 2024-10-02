import Bracket from "@/components/icons/bracket";
import LogoSimple from "@/components/icons/logo-simple";
import { Crown1 } from "iconsax-react";
import { Key01, List, Users01, BarChart01, Star01 } from "untitledui-js-base";

export const links = [
  { name: "Overview", href: "overview", icon: LogoSimple },
  { name: "Event Details", href: "details", icon: List },
  { name: "Participants", href: "participants", icon: Users01 },
  { name: "Brackets", href: "brackets", icon: Bracket },
  { name: "Leaderboard", href: "leaderboard", icon: Crown1 },
  { name: "Results", href: "results", icon: BarChart01 },
  { name: "Matchmaking Key", href: "matchmaking", icon: Key01 },
  { name: "Event Feedback", href: "reviews", icon: Star01 },
];
