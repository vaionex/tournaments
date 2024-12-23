"use client";
import useOpenInventory from "@/hooks/inventory/useOpenInventory";
import { Button } from "../button";
import Modal from "../modal";
import Spline from "@splinetool/react-spline";
import { Inbox02, X } from "untitledui-js-base";

export default function OpenItemModal({ id, ...props }) {
  const { mutate: openInventory, isLoading } = useOpenInventory();
  return (
    <Modal {...props} className="max-w-sm bg-black">
      <div
        className="relative flex flex-col items-center justify-center gap-4 p-8 pt-24 text-center"
        style={{
          backgroundImage: `url(/images/dashboard/open-item-modal-bg.webp)`,
          backgroundSize: "100% 100%",
        }}
      >
        <button
          className="absolute right-5 top-5 text-neutral-500"
          onClick={() => props.setOpen?.(false)}
        >
          <X />
        </button>
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-white">
          <Inbox02 />
        </div>
        <div className="text-xl font-semibold">Congratulations!</div>
        <div className="text-neutral-400">
          You&apos;ve unlocked exclusive in-game items! Start using them in your next
          match.
        </div>
        <div className="size-40">
          <Spline scene="https://prod.spline.design/qp84IoXMN8oQp1BF/scene.splinecode" />
        </div>
        <Button
          onClick={() =>
            openInventory(
              { id },
              { onSuccess: (url) => window.open(url, "_blank") },
            )
          }
          loading={isLoading}
        >
          Open
        </Button>
      </div>
    </Modal>
  );
}
