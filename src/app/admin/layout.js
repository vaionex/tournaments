import Logo from "@/components/ui/logo";
import Link from "next/link";
import { Users01 } from "untitledui-js-base";

const links = [{ name: "Users", href: "users" }];
export default function AdminLayout({ children }) {
  return (
    <div className="relative flex">
      <div className="sticky top-0">
        <Logo className="mx-6 my-8 h-12" />
        <div className="w-72 space-y-1 border-r border-neutral-800 p-4">
          {links.map(({ name, href }) => (
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 font-semibold transition hover:bg-white/10"
              key={name}
              href={href}
            >
              <Users01 className="size-4 opacity-70" />
              {name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
