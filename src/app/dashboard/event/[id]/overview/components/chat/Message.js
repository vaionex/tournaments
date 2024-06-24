import Avatar from "@/components/ui/avatar";
import useParticipants from "@/hooks/tournament/useParticipants";
import { format, formatDistance } from "date-fns";

export default function TournamentChatMessage({
  tournamentId,
  message,
  user_id,
  created_at,
}) {
  const { data: participants = [] } = useParticipants(tournamentId);
  const { User: { username = "User", profile_picture } = {} } =
    participants.find((participant) => participant.User.id == user_id) || {};

  return (
    <div className="flex gap-3">
      <Avatar
        className="size-10 rounded-full"
        profile_picture={profile_picture}
      />
      <div className="flex-1 text-sm">
        <div className="mb-1.5 flex items-center justify-between text-neutral-400">
          <div className="font-medium">{username}</div>
          <div>
            {formatDistance(created_at, new Date(), { addSuffix: true })}
          </div>
        </div>
        <div className="rounded-lg border border-white/5 bg-white/10 px-3.5 py-2.5">
          {message}
        </div>
      </div>
    </div>
  );
}
