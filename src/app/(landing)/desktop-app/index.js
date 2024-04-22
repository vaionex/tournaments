import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Image from "next/image";
import app from "./app.webp";
import { ArrowDownToLine } from "lucide-react";

export default function DesktopApp() {
  return (
    <Container className="py-8 md:py-24">
      <div className="flex justify-between items-start mb-12 flex-wrap gap-6">
        <div className="max-w-3xl">
          <h2 className="text-5xl font-bold mb-3">Download Our Desktop App</h2>
          <div className="text-supporting text-xl">
            Gain deeper insights into your gameplay performance, track your
            progress, and strategize like a pro with our desktop application.
          </div>
        </div>
        <Button>
          <ArrowDownToLine className="size-5" />
          Coming Soon
        </Button>
      </div>
      <Image src={app} />
    </Container>
  );
}
