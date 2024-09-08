import Avatar from "@/components/ui/avatar";

const MAX_PARTICIPANTS_DISPLAYED = 3;
export default function Participants({ participants = [] }) {
  const extra = participants.length - MAX_PARTICIPANTS_DISPLAYED;
  return (
    <div className="-space-x-2">
      {participants
        .slice(0, MAX_PARTICIPANTS_DISPLAYED)
        .map(({ id, User: { profile_picture } }, index) => (
          <div className="inline-block" key={index}>
            <Avatar
              profile_picture={profile_picture}
              className="size-8 rounded-full border"
            />
          </div>
        ))}
      {extra > 0 && (
        <div className="relative inline-flex size-8 items-center justify-center rounded-full border bg-black align-top text-xs text-neutral-400">
          +{extra}
        </div>
      )}
    </div>
  );
}
