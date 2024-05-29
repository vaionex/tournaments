"use client";
import { Button } from "@/components/ui/button";
import useAuthentication from "@/hooks/auth/useAuthentication";

export default function CreateTournamentButton() {
  const { isAuthenticated } = useAuthentication();
  return (
    <Button
      href={isAuthenticated ? "/dashboard/tournaments/create" : "/signup"}
    >
      Create a Tournament
    </Button>
  );
}
