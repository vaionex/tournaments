import Notch from "@/components/ui/notch";
import { getTournament } from "@/db/tournament";
import { formatCurrency } from "@/utils/format";
import { format } from "date-fns";
import { CalenderDate, Trophy01, Users01 } from "untitledui-js-base";
import DetailBadges from "../DetailBadges";

export const revalidate = 0;

export default async function Overview({ params: { id } }) {
  const { name, banner } = await getTournament(id);
  return (
    <div>
      <div className="flex gap-6">
        <div className="flex-[2]">
          <img src={banner} alt={name} className="object-cover" />
        </div>
        <DetailBadges id={id} />
      </div>
    </div>
  );
}
