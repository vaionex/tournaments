import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function DropdownItem({ active, name, href, onClick }) {
  const Comp = href ? Link : "button";
  return (
    <Comp
      className={twMerge(
        active ? "bg-white/10" : "",
        "block w-full whitespace-nowrap px-2.5 py-2 text-left text-sm",
      )}
      href={href}
      onClick={onClick}
    >
      {name}
    </Comp>
  );
}
