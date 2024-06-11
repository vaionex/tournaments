import useUser from "@/hooks/auth/useUser";
import useUpdateUser from "@/hooks/user/useUpdateUser";
import { Link, Power } from "lucide-react";
import { twMerge } from "tailwind-merge";
import SocialModal from "./SocialModal";
import { useState } from "react";

export default function Social({ name, id, icon: Icon }) {
  const { data: user } = useUser();
  const { mutate: update, isLoading } = useUpdateUser();
  const [open, setOpen] = useState(false);
  const connected = Boolean(user[id]);

  function disconnect() {
    update({ [id]: "" });
  }

  function handleClick() {
    if (connected) disconnect();
    else setOpen(true);
  }
  return (
    <div className="flex w-72 items-center justify-between rounded-xl border border-white/20 p-3 text-xs">
      <div className="flex items-center">
        <Icon className="mr-2 size-6" />
        <div>{name}</div>
      </div>
      <button
        className={twMerge(
          "flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 font-medium",
          connected && "bg-red-500",
          isLoading && "opacity-50",
        )}
        onClick={handleClick}
        disabled={isLoading}
      >
        {connected ? (
          <>
            <Power className="size-3" />
            Disconnect
          </>
        ) : (
          <>
            <Link className="size-3" />
            Connect
          </>
        )}
      </button>
      <SocialModal open={open} setOpen={setOpen} name={name} id={id} />
    </div>
  );
}
