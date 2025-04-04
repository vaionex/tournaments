import { Input } from "@/components/ui/input";
import Row from "../row";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useUpdateEmail from "@/hooks/user/useUpdateEmail";
import useUser from "@/hooks/auth/useUser";
import toast from "react-hot-toast";

export default function ChangeEmailSection() {
  const [email, setEmail] = useState("");
  const { mutate: update, isLoading, isSuccess } = useUpdateEmail();
  const { data: user } = useUser();

  useEffect(() => {
    if (user.email) setEmail(user.email);
  }, [user]);

  function handleUpdate() {
    if (email == user.email)
      return toast.error("You are already using this email");
    update({ email });
  }
  return (
    <div className="space-y-5">
      <Row>
        <div>New Email</div>
        <div>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="New Email"
            type="email"
          />
          {isSuccess && (
            <div className="mt-2 text-sm text-neutral-400">
              Confirmation links have been sent to both old and new email
              addresses. Please check your inbox. Both links will have to be
              clicked to complete the process
            </div>
          )}
        </div>
      </Row>
      <Row>
        <div />
        <Button
          loading={isLoading}
          onClick={handleUpdate}
          size="sm"
          className="ml-auto"
        >
          Update Email
        </Button>
      </Row>
    </div>
  );
}
