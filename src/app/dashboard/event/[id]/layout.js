import { getTournament } from "@/db/tournament";
import MenuLink from "./MenuLink";

const links = [
  { name: "Overview", href: "overview" },
  { name: "Edit", href: "edit" },
];
export default async function TournamentLayout({ children, params: { id } }) {
  const { name } = await getTournament(id);
  return (
    <div>
      <h1 className="text-3xl font-semibold">{name}</h1>
      <div className="my-6 flex rounded border border-neutral-700 p-1 text-sm font-semibold">
        {links.map((link) => (
          <MenuLink {...link} key={link.href} />
        ))}
      </div>
      {children}
    </div>
  );
}
