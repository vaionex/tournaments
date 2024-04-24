import { twMerge } from "tailwind-merge";

export default function Avatar({
  src = "/images/profile-picture-placeholder.jpg",
  className = "",
}) {
  return (
    <img
      src={src}
      className={twMerge(
        "size-8 rounded-md object-cover object-center",
        className,
      )}
      alt="Avatar"
    />
  );
}
