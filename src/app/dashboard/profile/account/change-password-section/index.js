import { Input } from "@/components/ui/input";
import Row from "../row";
import { Button } from "@/components/ui/button";
import useUpdatePassword from "@/hooks/user/useUpdatePassword";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ChangePasswordSection() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { mutate: update, isLoading } = useUpdatePassword();

  function handleUpdate() {
    if (password != confirmPassword)
      return toast.error("Passwords do not match");

    update({ password });
  }
  return (
    <div className="space-y-5">
      <Row>
        <div>New Password</div>
        <div>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            type="password"
          />
        </div>
      </Row>
      <Row>
        <div>Confirm New Password</div>
        <div>
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            type="password"
          />
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
          Update Password
        </Button>
      </Row>
    </div>
  );
}
