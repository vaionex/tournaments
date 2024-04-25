import { Input } from "@/components/ui/input";
import Row from "../row";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useUpdateEmail from "@/hooks/user/useUpdateEmail";
import useUser from "@/hooks/auth/useUser";

export default function ChangeEmailSection() {
  const [email, setEmail] = useState();
  const { mutate: update, isLoading, isSuccess } = useUpdateEmail();
  const { data: user } = useUser();

  useEffect(() => {
    setEmail(user.email);
  }, [user]);

  function handleUpdate() {
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
              A confirmation email has been sent to the submitted email address.
              Please check your inbox.
            </div>
          )}
        </div>
      </Row>
      <div>
        <Button loading={isLoading} onClick={handleUpdate}>
          Update Email
        </Button>
      </div>
    </div>
  );
}
