import Card from "@/app/dashboard/components/Card";
import { format } from "date-fns";

export default function SponsorshipsTable() {
  const sponsorships = [];
  if (sponsorships.length == 0)
    return (
      <div className="flex w-full items-center justify-center pt-36 text-2xl">
        No Sponsorships
      </div>
    );
  return (
    <Card className="p-0">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-white/5 font-semibold">
            <td className="h-11 pl-6">Event</td>
            <td className="text-center">Status</td>
            <td className="text-center">Organizer</td>
            <td className="text-center">Participants</td>
          </tr>
        </thead>
        <tbody>
          {[].map(({ id, Tournament, created_at, position }) => (
            <tr key={id}>
              <td className="h-16 pl-6">
                <div className="flex items-center gap-2">
                  <img className="size-10" src={Tournament.Game.icon} />
                  {Tournament.Game.name}
                </div>
              </td>
              <td className="text-center">
                {format(created_at, "dd-MM-yyyy")}
              </td>
              <td className="text-center">{Tournament.name}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
