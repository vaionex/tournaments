import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import useUser from "@/hooks/auth/useUser";
import useCreateWithdrawRequest from "@/hooks/user/useCreateWithdrawRequest";
import { useEffect, useState } from "react";

export default function WithdrawRequestButton() {
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [paypal, setPaypal] = useState("");
  const [amount, setAmount] = useState(0);

  const { mutate: createWithdrawRequest, isLoading } =
    useCreateWithdrawRequest();

  const { data: user } = useUser();

  useEffect(() => {
    if (user?.paypal) setPaypal(user.paypal);
  }, [user]);

  return (
    <>
      <Button onClick={() => setOpenWithdrawModal(true)}>
        Request withdrawal
      </Button>
      <Modal
        open={openWithdrawModal}
        setOpen={setOpenWithdrawModal}
        className="w-full max-w-lg space-y-6 rounded-lg border bg-black p-6"
      >
        <h2 className="text-2xl font-semibold">Withdrawal request</h2>
        <Input
          value={paypal}
          onChange={(e) => setPaypal(e.target.value)}
          type="email"
          label="Paypal email"
        />
        <Input
          value={amount / 100}
          onChange={(e) => setAmount(Number(e.target.value) * 100)}
          max={user?.balance / 100}
          min={0}
          type="number"
          label="Amount"
        />
        <Button
          disabled={!paypal || !amount || amount > user?.balance}
          loading={isLoading}
          onClick={() =>
            createWithdrawRequest(
              { amount, paypal },
              {
                onSuccess: () => {
                  setOpenWithdrawModal(false);
                  setOpenSuccessModal(true);
                },
              },
            )
          }
        >
          Withdraw
        </Button>
      </Modal>
      <Modal
        open={openSuccessModal}
        setOpen={setOpenSuccessModal}
        className="w-full max-w-sm space-y-6 rounded-lg border bg-black p-6"
      >
        <h2 className="text-center text-2xl">Withdrawal Requested</h2>
        <div className="text-neutral-400">
          You will recieve your funds within 24 hours.
        </div>
        <Button className="w-full" onClick={() => setOpenSuccessModal(false)}>
          Close
        </Button>
      </Modal>
    </>
  );
}
