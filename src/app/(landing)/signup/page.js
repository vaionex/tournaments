import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Signup() {
  return (
    <Container className="py-36">
      <div className="mx-auto max-w-sm">
        <h1 className="mb-8 text-center text-4xl font-semibold">
          Account Creation
        </h1>
        <div className="flex flex-col gap-4">
          <Input placeholder="Enter your name" label="Your name" />
          <Input placeholder="Enter your email" label="Email" />
          <Input placeholder="Create a password" label="Password" />
          <Checkbox label="I agree to terms and conditions" />
          <Button>Get Started</Button>
        </div>

        <div className="mt-10 text-center text-sm text-neutral-400">
          Already have an account?{" "}
          <Link className="font-medium text-primary" href="/login">
            Log In
          </Link>
        </div>
      </div>
    </Container>
  );
}
