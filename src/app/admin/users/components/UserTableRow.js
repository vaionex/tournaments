import Avatar from "@/components/ui/avatar";
import { formatCurrency } from "@/utils/format";
import { getRank } from "@/utils/rank";
import { CheckIcon, Mail } from "lucide-react";
import RankPill from "./RankPill";
import { format } from "date-fns";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import toast from "react-hot-toast";
import useGetUserEmail from "@/hooks/admin/useGetUserEmail";

export default function UserTableRow({
  id,
  profile_picture,
  username,
  xp,
  balance,
  created_at,
}) {
  const { mutateAsync } = useGetUserEmail();

  function handleCopyEmail() {
    const promise = mutateAsync({ id });
    promise.then((email) => navigator.clipboard.writeText(email));

    toast.promise(promise, {
      loading: "Loading",
      success: "Copied",
      error: "An unexpected error occurred",
    });
  }
  const actions = [
    { icon: Mail, title: "Copy Email", onClick: handleCopyEmail },
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
        <div className="flex items-center gap-2 text-green-500">
          <CheckIcon className="size-4" />
          Active
        </div>
      </td>
      <td>
        <RankPill rank={getRank(xp)} />
      </td>
      <td>{formatCurrency(balance)}</td>
      <td className="text-nowrap">
        {format(new Date(created_at), "dd MMM yy")}
      </td>
      <td>
        {actions.map(({ icon: Icon, title, onClick }, index) => (
          <Tooltip>
            <TooltipTrigger>
              <button
                className="flex size-8 items-center justify-center hover:bg-white/10"
                key={index}
              >
                <Icon onClick={onClick} className="size-5 opacity-70" />
              </button>
            </TooltipTrigger>
            <TooltipContent>{title}</TooltipContent>
          </Tooltip>
        ))}
      </td>
    </tr>
  );
}
