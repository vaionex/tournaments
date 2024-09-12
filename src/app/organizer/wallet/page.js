"use client";
import LogoMarkOutline from "@/components/icons/logo-mark-outline";
import useUser from "@/hooks/auth/useUser";
import usePayouts from "@/hooks/user/usePayouts";
import { formatCurrency } from "@/utils/format";
import { format } from "date-fns";
import WalletIcon from "./components/WalletIcon";
import TransactionChart from "./components/TransactionChart";
import Loader from "@/components/ui/loader";

export default function Wallet() {
  const { data: payouts = [], isLoading: isLoadingTransactions } = usePayouts();
  const { data: { balance = 0, id } = {} } = useUser();

  return (
    <div className="flex gap-6">
      <div className="w-96 p-4">
        <div className="relative mb-4 flex flex-col gap-8 rounded-lg bg-gradient-to-r from-white/10 to-white/20 p-6">
          <div className="text-lg font-semibold">Balance</div>
          <div>
            <div className="mb-2 text-sm text-neutral-400">Current balance</div>
            <div className="text-2xl font-bold">
              {!id ? <Loader className="mx-0" /> : formatCurrency(balance)}
            </div>
          </div>
          <WalletIcon className="absolute right-0 top-0" />
        </div>
        <TransactionChart />
      </div>
      <div className="flex-1">
        <div>
          <div className="text-lg font-semibold">Transaction history</div>
          <div className="text-sm text-neutral-400">
            All your transactions on Tournaments.com will be listed here.
          </div>
        </div>
        <div className="mt-4 space-y-3">
          {isLoadingTransactions && <Loader className="my-24" />}
          {payouts.map(({ created_at, amount, Participant }) => (
            <div className="flex items-center gap-6 rounded-lg border border-white/5 bg-white/10 p-4">
              <div className="flex size-8 items-center justify-center rounded-full border border-green-500 bg-green-800">
                <LogoMarkOutline className="size-4" />
              </div>
              <div className="flex-1 text-green-500">
                {Participant?.Tournament?.name}
              </div>
              <div className="w-36 text-left text-neutral-400">
                {format(created_at, "dd MMM, yyyy")}
              </div>
              <div className="w-24 text-right">{formatCurrency(amount)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
