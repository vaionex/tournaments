"use client";
import useUser from "@/hooks/auth/useUser";
import { formatCurrency } from "@/utils/format";
import WalletIcon from "./components/WalletIcon";
import TransactionChart from "./components/TransactionChart";
import Loader from "@/components/ui/loader";
import useTransactions from "@/hooks/transaction/useTransactions";
import TransactionItem from "./components/TransactionItem";
import WithdrawRequestButton from "./WithdrawRequestButton";

export default function Wallet() {
  const { data: transactions = [], isLoading: isLoadingTransactions } =
    useTransactions();
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
        <div className="mb-4">
          <WithdrawRequestButton />
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
          {transactions.map((transaction) => (
            <TransactionItem {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
}
