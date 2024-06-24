import * as Dialog from "@radix-ui/react-dialog";

export default function Modal({ open, setOpen, ...props }) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 flex w-screen items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <Dialog.Content {...props} />
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
