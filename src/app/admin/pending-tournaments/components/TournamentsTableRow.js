import { format } from "date-fns";
import { useState } from "react";
import DeleteTouramentDialog from "@/components/tournament/DeleteTournamentDialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import useUpdateTournament from "@/hooks/tournament/useUpdateTournament";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";

export default function TournamentsTableRow({ id, name, banner, start, end }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { mutate: update, isLoading } = useUpdateTournament();
  const queryClient = useQueryClient();

  function remove() {
    queryClient.setQueryData(["tournaments", "pending"], (tournaments = []) =>
      tournaments.filter((tournament) => tournament.id != id),
    );
  }

  function updateStatus(status) {
    update(
      { id, status },
      {
        onSuccess: remove,
        onError: (e) =>
          toast.error(
            e?.response?.data?.error ?? "An unexpected error occurred",
          ),
      },
    );
  }

  function approve() {
    updateStatus("Approved");
  }

  function deny() {
    updateStatus("Denied");
  }

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
        <td className="text-center">
          <div className="whitespace-nowrap">{format(start, "Pp")}</div>
          <div className="whitespace-nowrap">{format(end, "Pp")}</div>
        </td>
        <td>
          <div className="flex items-center gap-4">
            <Button onClick={approve} disabled={isLoading}>
              Approve
            </Button>
            <Button onClick={deny} variant="danger" disabled={isLoading}>
              Deny
            </Button>
            <Button variant="black">
              <a
                href={`/dashboard/event/${id}`}
                target="_blanck"
                className="flex items-center gap-2"
              >
                <ExternalLink className="size-4" /> View
              </a>
            </Button>
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
