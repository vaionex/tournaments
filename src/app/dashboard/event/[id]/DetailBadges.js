import Notch from "@/components/ui/notch";
import { getTournament } from "@/db/tournament";
import { formatCurrency } from "@/utils/format";
import { format } from "date-fns";
import { CalenderDate, Trophy01, Users01 } from "untitledui-js-base";

export default async function DetailBadges({ id }) {
  const { prize_pool, entry_fee, start, end } = await getTournament(id);
  function Container({ title, children, icon: Icon = () => null }) {
    return (
      <Notch className="bg-neutral-900 p-3.5">
        <div className="mb-2 flex items-center gap-2 text-xs text-neutral-500">
          <Icon className="size-4" />
          <div className="text-sm">{title}</div>
        </div>
        <div>{children}</div>
      </Notch>
    );
  }
  return (
    <div className="w-96 space-y-4">
      <Container title="Duration" icon={CalenderDate}>
        {format(start, "dd/MM/yyyy")} - {format(end, "dd/MM/yyyy")}
      </Container>
      <Container title="Prize Pool" icon={Trophy01}>
        {formatCurrency(prize_pool)}
      </Container>
      <Container title="Entry Fee" icon={Users01}>
        {formatCurrency(entry_fee)}
      </Container>
    </div>
  );
}
