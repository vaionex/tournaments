import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Signup() {
  return (
    <Container className="py-36">
      <div className="mx-auto max-w-sm">
        <h1 className="mb-8 text-center text-4xl font-semibold">Login</h1>
        <div className="flex flex-col gap-4">
          <Input placeholder="Enter your email" label="Email" />
          <Input placeholder="Enter your password" label="Password" />
          <Button>Login</Button>
        </div>

        <div className="mt-10 text-center text-sm text-neutral-400">
          Don&apos;t have an account?
          <Link className="font-medium text-primary" href="/signup">
            {" "}
            Sign up
          </Link>
        </div>
      </div>
    </Container>
  );
}
