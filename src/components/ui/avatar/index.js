import { twMerge } from "tailwind-merge";

export default function Avatar({ src, className = "" }) {
  return (
    <img
      src={src ?? "/images/profile-picture-placeholder.jpg"}
      className={twMerge(
        "size-8 rounded-md object-cover object-center",
        className,
      )}
      alt="Avatar"
    />
  );
}
