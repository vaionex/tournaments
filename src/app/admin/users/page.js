import UsersTable from "./components/UserTable";

export default function UsersPage() {
  return (
    <div className="p-4">
      <h1 className="mb-4 text-4xl font-semibold">Users</h1>
      <UsersTable />
    </div>
  );
}
