import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { XIcon } from "lucide-react";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

const variants = {
  default: "bg-primary",
  danger: "bg-red-500",
  warning: "bg-orange-500",
};

export default function Dialog({
  open,
  setOpen,
  icon: Icon = () => null,
  title = "",
  subtitle = "",
  content = "",
  actions = [],
  variant = "default",
}) {
  const iconContainerClassName = variants[variant];

  return (
    <Modal
      className="w-full max-w-xl rounded-xl border border-white/20 bg-neutral-900 p-8"
      {...{ open, setOpen }}
    >
      <div className="mb-9 flex items-center gap-4">
        <div
          className={twMerge(
            "flex size-12 items-center justify-center rounded-lg",
            iconContainerClassName,
          )}
        >
          <Icon className="size-5" />
        </div>
        <div className="flex-1">
          <div className="text-xl font-semibold">{title}</div>
          <div className="text-neutral-400">{subtitle}</div>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="self-start opacity-50 transition hover:opacity-100"
        >
          <XIcon className="size-5" />
        </button>
      </div>
      <div className="mb-4 text-neutral-400">{content}</div>
      <div className="flex gap-2">
        {actions.map((action, index) => (
          <Button className="flex-1" {...action} key={index} />
        ))}
      </div>
    </Modal>
  );
}
