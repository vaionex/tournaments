"use client";
import { useState } from "react";
import TournamentsTable from "./components/TournamentsTable";
import useTournaments from "@/hooks/tournament/useTournaments";
import TournamentFilterSection from "./components/TournamentFilterSection";

const limit = 15;
export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const { data: { tournaments = [], total = 0 } = {}, isLoading } =
    useTournaments({
      limit,
      page,
      ...filters,
    });

  const pages = Math.ceil(total / limit);

  return (
    <div>
      <h1 className="my-4 ml-4 text-4xl font-semibold">Tournaments</h1>
      <div className="flex justify-end p-4">
        <TournamentFilterSection filters={filters} onChange={setFilters} />
      </div>
      <TournamentsTable
        loading={isLoading}
        tournaments={tournaments}
        pages={pages}
        page={page}
        onPageChange={setPage}
      />
    </div>
  );
}
