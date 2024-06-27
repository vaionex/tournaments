import TournamentCard from "@/app/dashboard/tournaments/tournament-card";
import RankIcon from "@/components/icons/rank-icon";
import Avatar from "@/components/ui/avatar";
import Container from "@/components/ui/container";
import ShareSection from "@/components/ui/share-section";
import { getParticipationsById, getUserById } from "@/db/user";
import { notFound } from "next/navigation";
import toast from "react-hot-toast";

export const revalidate = 0;

export default async function ProfileAccount({ params: { id } }) {
  const user = await getUserById(id);
  if (!user) return notFound();

  const participations = await getParticipationsById(id);

  function Heading({ children }) {
    return <h2 className="mb-4 font-semibold">{children}</h2>;
  }

  return (
    <Container className="pt-24">
      <div className="mt-10 flex items-end justify-between border-b border-white/10 pb-12">
        <div className="flex items-end gap-6">
          <Avatar className="size-36" {...user} />
          <div>
            <div className="mb-2">
              <div className="flex w-fit items-center gap-1 rounded-full bg-neutral-800 px-3 py-1 text-neutral-400">
                <RankIcon rank={user.rank} className="size-5" />
                {user.rank}
              </div>
            </div>
            <div className="text-3xl font-semibold">{user.username}</div>
          </div>
        </div>
        <ShareSection />
      </div>
      <div className="flex flex-col gap-8 py-8 md:flex-row">
        <div className="@container flex-1">
          <Heading>Tournaments</Heading>
          <div className="@xl:grid-cols-2 grid gap-4">
            {participations.map(({ Tournament, id }) => (
              <TournamentCard {...Tournament} key={id} />
            ))}
          </div>
        </div>
        <div className="w-[25rem]">
          <div>
            <Heading>Bio</Heading>

            <div className="text-neutral-400">
              {user.bio || "User doesn't have a bio"}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
