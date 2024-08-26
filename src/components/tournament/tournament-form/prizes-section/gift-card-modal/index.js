import { Button } from "@/components/ui/button";
import Dropzone from "@/components/ui/dropzone";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { useState } from "react";

export default function GiftCardModal({ onSave, ...props }) {
  const [file, setFile] = useState(undefined);
  const [label, setLabel] = useState("");

  return (
    <Modal
      className="w-full max-w-md space-y-4 rounded-xl border border-white/20 bg-black p-4"
      {...props}
    >
      <h2 className="text-2xl font-semibold">Add Gift Card</h2>
      <Input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Label"
      />
      <Dropzone
        onDrop={(files) => setFile(files[0])}
        accept={{
          "image/png": [".png"],
          "application/pdf": [".pdf"],
        }}
        files={file ? [file] : []}
      />
      <div className="flex justify-end gap-4">
        <Button onClick={() => props.setOpen?.(false)} variant="ghost">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onSave({ label, file });
            setLabel("");
            setFile(undefined);
          }}
          disabled={!file || !label}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
}
