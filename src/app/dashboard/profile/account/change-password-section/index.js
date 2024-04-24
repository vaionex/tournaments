import { Input } from "@/components/ui/input";
import Row from "../row";
import { Button } from "@/components/ui/button";

export default function ChangePasswordSection() {
  return (
    <div className="space-y-5">
      <Row>
        <div>Current Password</div>
        <div>
          <Input placeholder="Current Password" type="password" />
        </div>
      </Row>
      <Row>
        <div>New Password</div>
        <div>
          <Input placeholder="New Password" type="password" />
        </div>
      </Row>
      <Row>
        <div>Confirm New Password</div>
        <div>
          <Input placeholder="Confirm New Password" type="password" />
        </div>
      </Row>
      <div>
        <Button>Update Password</Button>
      </div>
    </div>
  );
}
