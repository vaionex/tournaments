import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Image from "next/image";
import app from "./app.webp";
import { ArrowDownToLine } from "lucide-react";

export default function DesktopApp() {
  return (
    <Container className="py-8 md:py-24">
      <div className="mb-12 flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-3xl">
          <h2 className="mb-3 text-5xl font-bold">Download Our Desktop App</h2>
          <div className="text-xl text-supporting">
            Gain deeper insights into your gameplay performance, track your
            progress, and strategize like a pro with our desktop application.
          </div>
        </div>
        <Button>
          <ArrowDownToLine className="size-5" />
          Coming Soon
        </Button>
      </div>
      <Image src={app} alt="Desktop Application" />
    </Container>
  );
}
