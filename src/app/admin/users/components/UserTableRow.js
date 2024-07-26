import Avatar from "@/components/ui/avatar";
import { formatCurrency } from "@/utils/format";
import { getRank } from "@/utils/rank";
import { Ban, CheckIcon, CircleCheckBig, Mail } from "lucide-react";
import RankPill from "./RankPill";
import { format } from "date-fns";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import toast from "react-hot-toast";
import useGetUserEmail from "@/hooks/admin/useGetUserEmail";
import useUpdateUserById from "@/hooks/admin/useUpdateUserById";
import Status from "./Status";

export default function UserTableRow({
  id,
  profile_picture,
  username,
  xp,
  balance,
  created_at,
  is_banned,
}) {
  const { mutateAsync: getEmail } = useGetUserEmail();
  const { mutate: updateUserById, isLoading: isLoadingUpdate } =
    useUpdateUserById();

  function updateUser(data) {
    updateUserById({ id, ...data });
  }

  function handleCopyEmail() {
    const promise = getEmail({ id });
    promise.then((email) => navigator.clipboard.writeText(email));

    toast.promise(promise, {
      loading: "Loading",
      success: "Copied",
      error: "An unexpected error occurred",
    });
  }

  function handleBanUser() {
    updateUser({ is_banned: true });
  }

  function handleUnbanUser() {
    updateUser({ is_banned: false });
  }

  const actions = [
    { icon: Mail, title: "Copy Email", onClick: handleCopyEmail },
    is_banned
      ? {
          icon: CircleCheckBig,
          title: "Unban User",
          onClick: handleUnbanUser,
          isLoading: isLoadingUpdate,
        }
      : {
          icon: Ban,
          title: "Ban User",
          onClick: handleBanUser,
          isLoading: isLoadingUpdate,
        },
  ];

  return (
    <tr>
      <td className="h-16 w-fit text-nowrap">{id}</td>
      <td>
        <div className="flex items-center gap-4">
          <Avatar src={profile_picture} />
          {username}
        </div>
      </td>
      <td>
        <Status status={is_banned ? "banned" : "active"} />
      </td>
      <td>
        <RankPill rank={getRank(xp)} />
      </td>
      <td>{formatCurrency(balance)}</td>
      <td className="text-nowrap">
        {format(new Date(created_at), "dd MMM yy")}
      </td>
      <td>
        <div className="flex items-center gap-1">
          {actions.map(({ icon: Icon, title, onClick, isLoading }, index) => (
            <Tooltip key={index}>
              <TooltipTrigger
                onClick={onClick}
                className="group flex size-8 items-center justify-center rounded-lg transition hover:bg-white/20 disabled:opacity-50"
                disabled={isLoading}
              >
                <Icon className="size-4 opacity-70 group-hover:opacity-100" />
              </TooltipTrigger>
              <TooltipContent>{title}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </td>
    </tr>
  );
}
