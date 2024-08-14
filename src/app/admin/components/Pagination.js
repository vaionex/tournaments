import { usePagination } from "@mantine/hooks";
import { twMerge } from "tailwind-merge";
import { ArrowLeft, ArrowRight } from "untitledui-js-base";

export default function Pagination({ total, page, onChange }) {
  const { range } = usePagination({ total, page });

  function Button({ children, ...props }) {
    return (
      <button
        className={"flex items-center justify-center gap-2 disabled:opacity-50"}
        {...props}
      >
        {children}
      </button>
    );
  }
  return (
    <div className="flex items-center justify-between text-neutral-400">
      <Button disabled={page == 1} onClick={() => onChange?.(page - 1)}>
        <ArrowLeft />
        Previous
      </Button>
      <div className="flex items-center gap-0.5">
        {range.map((p) =>
          p == "dots" ? (
            <div>...</div>
          ) : (
            <button
              className={twMerge(
                "size-10 rounded-full",
                page == p && "bg-neutral-800 text-white",
              )}
              onClick={() => onChange?.(p)}
            >
              {p}
            </button>
          ),
        )}
      </div>
      <Button disabled={page == total} onClick={() => onChange?.(page + 1)}>
        Next
        <ArrowRight />
      </Button>
    </div>
  );
}
