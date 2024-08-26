import { Button } from "@/components/ui/button";
import * as Popover from "@radix-ui/react-popover";
import { FilterLines } from "untitledui-js-base";
export default function FiltersPopover({ children, onApply }) {
  return (
    <Popover.Root>
      <Popover.Trigger className="flex items-center gap-2 rounded-lg border border-transparent bg-neutral-800 px-4 py-2.5 text-sm text-white transition data-[state=open]:border-primary data-[state=open]:bg-primary/50">
        Filters <FilterLines className="size-4" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="w-96 divide-y divide-white/20 rounded-xl border border-white/20 bg-black"
          sideOffset={10}
          collisionPadding={10}
        >
          {children}
          <div className="p-3">
            <Button className="w-full" onClick={onApply}>
              Apply filter
            </Button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
