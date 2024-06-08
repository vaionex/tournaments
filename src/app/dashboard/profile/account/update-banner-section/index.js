"use client";
import useUser from "@/hooks/auth/useUser";
import useUpdateUser from "@/hooks/user/useUpdateUser";
import { Camera } from "lucide-react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

export default function UpdateBannerSection() {
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
          { banner: acceptedFiles[0] },
          {
            onSuccess: () => toast.success("Updated"),
            onError: () => toast.error("An unexpected error occurred"),
          },
        );
    },
  });
  return (
    <div className="relative">
      <img
        src={user.banner}
        className="h-64 w-full object-cover object-center"
      />
      <button
        className="absolute bottom-4 right-4 bg-black/30 p-2"
        {...getRootProps()}
      >
        <Camera />
      </button>
      <input {...getInputProps()} />
    </div>
  );
}
