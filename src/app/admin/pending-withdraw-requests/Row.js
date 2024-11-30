import { Button } from "@/components/ui/button";
import useCompletePendingWithdraw from "@/hooks/admin/useCompletePendingWithdraw";
import { formatCurrency } from "@/utils/format";

export default function WithdrawRequestRow({ id, user, paypal, amount }) {
  const { mutate: completeWithdraw, isLoading } = useCompletePendingWithdraw();
  return (
    <tr>
      <td>{user.username}</td>
      <td>{paypal}</td>
      <td>{formatCurrency(Math.abs(amount))}</td>
      <td className="py-2">
        <Button
          variant="green"
          loading={isLoading}
          onClick={() => completeWithdraw({ id })}
          size="sm"
        >
          Complete
        </Button>
      </td>
    </tr>
  );
}
