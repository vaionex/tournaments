import Logo from "@/components/ui/logo";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function MobileMenu({ links, open, setOpen, ctaButton }) {
  return (
    <Dialog as="div" className="lg:hidden" open={open} onClose={setOpen}>
      <div className="fixed inset-0 z-10" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <div className="-m-1.5 p-1.5">
            <span className="sr-only">Tournaments</span>
            <Logo className="h-10" />
          </div>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5"
            onClick={() => setOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {links.map(({ name, href }) => (
                <Link
                  href={href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7"
                  onClick={() => setOpen(false)}
                  key={name}
                >
                  {name}
                </Link>
              ))}
            </div>
            <div className="py-6">{ctaButton}</div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
