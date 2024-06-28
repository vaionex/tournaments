import { formatCurrency } from "@/utils/format";
import { format } from "date-fns";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Trash } from "iconsax-react";
import TournamentStatus from "./Status";
import Dialog from "@/components/ui/dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useParticipants from "@/hooks/tournament/useParticipants";
import Loader from "@/components/ui/loader";
import { Edit03, Trash03 } from "untitledui-js-base";
import DeleteTouramentDialog from "@/components/tournament/DeleteTournamentDialog";

export default function TournamentsTableRow({
  id,
  name,
  banner,
  start,
  end,
  prize_pool,
  completed,
}) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { data: participants = [], isLoading: isLoadingParticipants } =
    useParticipants(id);
  const { push } = useRouter();

  const actions = [
    {
      icon: Edit03,
      title: "Edit",
      onClick: () => push(`/dashboard/event/${id}/edit`),
    },
    { icon: Trash03, title: "Delete", onClick: () => setOpenDeleteModal(true) },
  ];
  return (
    <>
      <tr>
        <td className="h-16 w-fit text-nowrap">{id}</td>
        <td>
          <div className="flex items-center gap-4">
            <img src={banner} className="h-10 w-16 rounded-lg object-cover" />
            <div className="line-clamp-2">{name}</div>
          </div>
        </td>
        <td>
          <TournamentStatus start={start} end={end} completed={completed} />
        </td>
        <td className="text-center text-lime-500">
          {formatCurrency(prize_pool)}
        </td>
        <td className="whitespace-nowrap text-center">
          {isLoadingParticipants ? (
            <Loader className="size-4 opacity-50" />
          ) : (
            <>{participants.length} players</>
          )}
        </td>
        <td className="text-center">
          <div className="whitespace-nowrap">{format(start, "Pp")}</div>
          <div className="whitespace-nowrap">{format(end, "Pp")}</div>
        </td>
        <td>
          <div className="flex items-center gap-1">
            {actions.map(({ icon: Icon, title, onClick }, index) => (
              <Tooltip key={index}>
                <TooltipTrigger
                  onClick={onClick}
                  className="group flex size-8 items-center justify-center hover:bg-white/10"
                >
                  <Icon className="size-5 opacity-70 group-hover:opacity-100" />
                </TooltipTrigger>
                <TooltipContent>{title}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </td>
      </tr>
      <DeleteTouramentDialog
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        id={id}
      />
    </>
  );
}
