import LogoMarkOutline from "@/components/icons/logo-mark-outline";
import { formatCurrency } from "@/utils/format";
import { format } from "date-fns";
import { ArrowUp } from "untitledui-js-base";

export default function TransactionItem({ created_at, amount, Participant }) {
  const icon =
    amount > 0 ? (
      <div className="flex size-8 items-center justify-center rounded-full border border-green-500 bg-green-800">
        <LogoMarkOutline className="size-4" />
      </div>
    ) : (
      <div className="flex size-8 items-center justify-center rounded-full border border-red-300 bg-red-500">
        <ArrowUp className="size-4" />
      </div>
    );

  return (
    <div className="flex items-center gap-6 rounded-lg border border-white/5 bg-white/10 p-4">
      {icon}
      <div className="flex-1 text-green-500">
        {Participant?.Tournament?.name}
      </div>
      <div className="w-36 text-left text-neutral-400">
        {format(created_at, "dd MMM, yyyy")}
      </div>
      <div className="w-24 text-right">{formatCurrency(Math.abs(amount))}</div>
    </div>
  );
}
