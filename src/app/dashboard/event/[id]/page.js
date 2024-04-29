import { getTournament } from "@/db/tournament";
import { formatCurrency } from "@/utils/format";
import { format } from "date-fns";
import { CalenderDate, Trophy01, Users01 } from "untitledui-js-base";

export default async function Tournament({ params: { id } }) {
  const { name, banner, prize_pool, entry_fee, start, end } =
    await getTournament(id);

  function Container({ title, children, icon: Icon = () => null }) {
    return (
      <div className="relative bg-neutral-900 p-3.5">
        <div className="mb-2 flex items-center gap-2 text-xs text-neutral-500">
          <Icon className="size-4" />
          <div className="text-sm">{title}</div>
        </div>
        <div>{children}</div>
        <svg
          width="26"
          height="12"
          viewBox="0 0 26 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 right-0"
        >
          <path d="M0 27.2L26 0.199951V27.2H0Z" fill="#004EEB" />
        </svg>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold">{name}</h1>
      <div className="flex gap-6">
        <div className="flex-[2]">
          <img src={banner} alt={name} className="object-cover" />
        </div>
        <div className="flex-1 shrink-0 space-y-4">
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
      </div>
    </div>
  );
}
