"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import useUpdateUser from "@/hooks/user/useUpdateUser";
import { useState } from "react";

export default function SocialModal({ id, name, open, setOpen }) {
  const [userId, setUserId] = useState("");
  const { mutate: update, isLoading } = useUpdateUser();

  return (
    <Modal
      {...{ open, setOpen }}
      className="w-full max-w-lg space-y-4 rounded-lg border border-white/10 bg-neutral-900 p-4"
    >
      <h2 className="text-2xl font-semibold">Connect {name} ID</h2>
      <Input
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder={`Your ${name} ID`}
      />
      <div className="flex items-center justify-end gap-4">
        <Button onClick={() => setOpen(false)} variant="ghost">
          Cancel
        </Button>
        <Button
          onClick={() =>
            update({ [id]: userId }, { onSuccess: () => setOpen(false) })
          }
          loading={isLoading}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
}
