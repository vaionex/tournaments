"use client";
import { Input } from "@/components/ui/input";
import Row from "../row";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/auth/useUser";
import { useEffect, useState } from "react";
import useUpdateUser from "@/hooks/user/useUpdateUser";

export default function UpdateProfileSection() {
  const { data: user } = useUser();
  const { mutate: update, isLoading } = useUpdateUser();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    setUsername(user.username);
    setBio(user.bio);
  }, [user]);
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Account</h2>
        <div className="text-sm text-neutral-400">
          Control your profile, email address, and security
        </div>
      </div>
      <Row>
        <div>Username</div>
        <div>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full"
          />
        </div>
      </Row>
      <Row>
        <div>Bio</div>
        <div>
          <Input
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
            type="textarea"
            className="h-32"
          />
        </div>
      </Row>
      <Row>
        <div />
        <Button
          loading={isLoading}
          onClick={() => update({ username, bio })}
          className="ml-auto"
          size="sm"
        >
          Save
        </Button>
      </Row>
    </div>
  );
}
