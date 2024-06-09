"use client";
import Avatar from "@/components/ui/avatar";
import useUser from "@/hooks/auth/useUser";
import useUpdateUser from "@/hooks/user/useUpdateUser";
import { Camera } from "lucide-react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

export default function UpdateAvatar() {
  const { data: user } = useUser();
  const { mutate: update } = useUpdateUser();

  const { getInputProps, getRootProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0)
        update(
          { profile_picture: acceptedFiles[0] },
          {
            onSuccess: () => toast.success("Updated"),
            onError: () => toast.error("An unexpected error occurred"),
          },
        );
    },
  });

  return (
    <div className="relative" {...getRootProps()}>
      <Avatar className="size-40" src={user.profile_picture} />
      <button
        className="absolute bottom-2 right-2 bg-black/30 p-2"
        {...getRootProps()}
      >
        <Camera className="size-4" />
      </button>
      <input {...getInputProps()} />
    </div>
  );
}
