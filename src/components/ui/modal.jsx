import { Transition } from "@headlessui/react";
import { Fragment } from "react";
import * as Dialog from "@radix-ui/react-dialog";

export default function Modal({ open, setOpen, ...props }) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 flex w-screen items-center justify-center bg-black/25 p-4 animate-in fade-in">
          <Dialog.Content {...props} />
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        onClose={() => setOpen(false)}
        className="relative z-50 transition"
        as="div"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {/* The actual dialog panel  */}
            <Dialog.Panel {...props} />
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
