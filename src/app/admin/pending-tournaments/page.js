import TournamentsTable from "./components/TournamentsTable";

export default function UsersPage() {
  return (
    <div>
      <h1 className="my-4 ml-4 text-4xl font-semibold">Pending Tournaments</h1>
      <TournamentsTable />
    </div>
  );
}
