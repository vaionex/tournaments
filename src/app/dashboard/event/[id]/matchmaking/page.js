import { Input } from "@/components/ui/input";
import { getTournament } from "@/db/tournament";
import { format } from "date-fns";

export const revalidate = 0;

export default async function Matchmaking({ params: { id } }) {
  const { start, matchmaking_key, server_ip, Game } = await getTournament(id);

  const instructions = {
    Fortnite: (
      <>
        <ul className="mb-4 ml-4 list-disc">
          <li>In Fortnite, select &apos;Game Mode&apos;</li>
          <li>Choose &apos;Custom Match&apos; and input your key</li>
          <li>Ready up and join the lobby by {format(start, "hh:mm O")} </li>
        </ul>
        Keep this key confidential. For assistance, visit the
        &apos;Support&apos; section.
      </>
    ),

    CS2: (
      <>
        <ul className="mb-4 ml-4 list-disc">
          <li>In CS2, open &apos;Console&apos;</li>
          <li>
            In console, type
            <span className="font-mono"> connect {server_ip}</span>
          </li>
          <li>Ready up and join the server by {format(start, "hh:mm O")} </li>
        </ul>
        Keep this server IP confidential. For assistance, visit the
        &apos;Support&apos; section.
      </>
    ),
  };

  function Section({ children, title, description }) {
    return (
      <div className="flex gap-8 text-sm">
        <div className="w-72">
          <div>{title}</div>
          <div className="text-neutral-400">{description}</div>
        </div>
        <div className="w-full max-w-lg">{children}</div>
      </div>
    );
  }
  return (
    <div className="space-y-4 p-4">
      {matchmaking_key && (
        <Section
          title="Custom Matchmaking Key"
          description="Unique code provided to registered players for accessing private tournament games."
        >
          <div className="space-y-4">
            <Input
              value={matchmaking_key}
              label="Key"
              className="bg-primary"
              readOnly
            />
          </div>
        </Section>
      )}

      {server_ip && (
        <Section
          title="Server IP"
          description="Server IP provided to registered players for accessing private tournament games."
        >
          <div className="space-y-4">
            <Input
              value={server_ip}
              label="Server IP"
              className="bg-primary"
              readOnly
            />
          </div>
        </Section>
      )}
      <Section>
        <div className="space-y-4">
          <Input
            value={format(start, "PPP")}
            label="Your match date"
            readOnly
          />
          <Input value={format(start, "p")} label="Your match time" readOnly />
        </div>
      </Section>
      <Section
        title="Instructions"
        description="Step-by-step guidance on how to enter the tournament lobby."
      >
        {instructions[Game.name]}
      </Section>
    </div>
  );
}
