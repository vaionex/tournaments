import Loader from "@/components/ui/loader";
import useTransactions from "@/hooks/transaction/useTransactions";
import { tailwind } from "@/utils/tailwind";
import { format, subDays } from "date-fns";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import { twMerge } from "tailwind-merge";
import { ArrowNarrowDown, ArrowNarrowUp } from "untitledui-js-base";

const durations = [
  {
    label: "30 Days",
    value: "30 Days",
    start: subDays(new Date(), 30),
  },
  {
    label: "14 Days",
    value: "14 Days",
    start: subDays(new Date(), 14),
  },
  {
    label: "7 Days",
    value: "7 Days",
    start: subDays(new Date(), 7),
  },
];

export default function TransactionChart() {
  const [transactionType, setTransactionType] = useState("Transfer");
  const [selectedDuration, setSelectedDuration] = useState(durations[0].value);
  const start =
    durations.find(({ value }) => value == selectedDuration)?.start ||
    durations[0].start;

  const { data: transactions = [], isLoading } = useTransactions({
    start,
    end: new Date(),
  });
  const data = transactions
    .filter(({ amount }) =>
      transactionType == "Deposit" ? amount > 0 : amount < 0,
    )
    .map((transaction) => ({
      ...transaction,
      amount: Math.abs(transaction.amount),
    }));
  const noData = data.length == 0 && !isLoading;
  return (
    <div>
      <div className="mb-10 flex gap-3">
        {[
          {
            label: "Transfer",
            icon: ArrowNarrowUp,
          },
          {
            label: "Deposit",
            icon: ArrowNarrowDown,
          },
        ].map(({ label, icon: Icon }) => (
          <button
            className={twMerge(
              "flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/10 py-2.5 text-sm font-medium",
              transactionType == label && "bg-primary text-white",
            )}
            onClick={() => setTransactionType(label)}
            key={label}
          >
            <Icon className="size-5" />
            {label}
          </button>
        ))}
      </div>
      <div className="mb-4">Spending overtime</div>
      <div className="mb-6 flex w-fit divide-x divide-white/10 overflow-hidden rounded-lg border border-white/10">
        {durations.map(({ label, value }) => (
          <button
            key={value}
            className={twMerge(
              "flex items-center gap-2 bg-white/5 px-4 py-2.5 text-xs font-medium first:rounded-l-lg last:rounded-r-lg",
              value == selectedDuration && "bg-white/10",
            )}
            onClick={() => setSelectedDuration(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="relative h-40">
        {noData && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-neutral-400">
            No data
          </div>
        )}
        {isLoading && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-neutral-400">
            <Loader />
          </div>
        )}
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis
              dataKey="created_at"
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => format(v, "dd/MM")}
              fontSize={12}
            />
            <CartesianGrid stroke="#222" vertical={false} />
            <Bar
              dataKey="amount"
              fill={tailwind.theme.colors.primary.DEFAULT}
              maxBarSize={20}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
