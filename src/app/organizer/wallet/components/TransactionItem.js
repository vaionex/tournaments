import LogoMarkOutline from "@/components/icons/logo-mark-outline";
import { formatCurrency } from "@/utils/format";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { ArrowUp } from "untitledui-js-base";

export default function TransactionItem({
  created_at,
  amount,
  sponsored_tournament,
  sponsor,
  won_tournament,
  withdraw_request,
  id, // Add id prop
}) {
  const icon =
    amount > 0 ? (
      <div key={`icon-${id}`} className="flex size-8 items-center justify-center rounded-full border border-green-500 bg-green-800">
        <LogoMarkOutline className="size-4" />
      </div>
    ) : (
      <div key={`icon-${id}`} className="flex size-8 items-center justify-center rounded-full border border-red-300 bg-red-500">
        <ArrowUp className="size-4" />
      </div>
    );

  const label = (() => {
    if (sponsor) return "Received Sponsorship";
    if (sponsored_tournament) return "Sponsored Tournament"; 
    if (won_tournament) return "Won Tournament";
    if (withdraw_request) return "Paypal Withdrawal";

    if (amount <= 0) return "Withdrawal";
    return "Deposit";
  })();

  return (
    <div className="flex items-center gap-6 rounded-lg border border-white/5 bg-white/10 p-4">
      {icon}
      <div
        key={`label-${id}`}
        className={twMerge(
          "flex-1",
          amount > 0 ? "text-green-500" : "text-red-500",
        )}
      >
        {label}
      </div>
      <div key={`date-${id}`} className="w-36 text-left text-neutral-400">
        {format(created_at, "dd MMM, yyyy")}
      </div>
      <div key={`amount-${id}`} className="w-24 text-right">{formatCurrency(Math.abs(amount))}</div>
    </div>
  );
}
