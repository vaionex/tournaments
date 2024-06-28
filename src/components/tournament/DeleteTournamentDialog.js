"use client";
import useDeleteTournament from "@/hooks/tournament/useDeleteTournament";
import Dialog from "../ui/dialog";
import { Trash } from "iconsax-react";
import toast from "react-hot-toast";
import useTournament from "@/hooks/tournament/useTournament";
import { Swords } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteTouramentDialog({ open, setOpen, id }) {
  const { data: tournament = {} } = useTournament(id);
  const { mutate: deleteTournament, isLoading } = useDeleteTournament();
  const inProgress = new Date() > new Date(tournament.start);
  const { push } = useRouter();

  function close() {
    setOpen(false);
  }

  if (tournament.completed)
    return (
      <Dialog
        title="Tournament Complete"
        subtitle="Event Deletion Restricted"
        content="This tournament has been completed. You cannot delete this tournament."
        icon={Swords}
        variant="warning"
        open={open}
        setOpen={setOpen}
        actions={[
          {
            children: "Close",
            onClick: close,
          },
        ]}
      />
    );

  if (inProgress)
    return (
      <Dialog
        title="Tournament in Progress"
        subtitle="Event Deletion Restricted"
        content="This tournament is currently in progress. You cannot delete this event until a winner has been declared and all rewards have been distributed. Thank you for ensuring a fair and complete competition for all participants."
        icon={Swords}
        variant="warning"
        open={open}
        setOpen={setOpen}
        actions={[
          {
            children: "Close",
            onClick: close,
          },
        ]}
      />
    );

  return (
    <Dialog
      title="Delete Tournament"
      content="Are you sure you want to permanently delete this tournament?"
      actions={[
        {
          children: "Confirm",
          variant: "danger",
          loading: isLoading,
          onClick: () =>
            deleteTournament(
              { id },
              {
                onSettled: () => setOpen(false),
                onError: (e) =>
                  toast.error(
                    e?.response?.data?.error || "Something went wrong",
                  ),
                onSuccess: () => {
                  toast.success("Tournament Deleted");
                  setOpen(false);
                  push("/dashboard/tournaments");
                },
              },
            ),
        },
      ]}
      variant="danger"
      icon={Trash}
      open={open}
      setOpen={setOpen}
    />
  );
}
