import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import CornerBorder from "@/components/ui/corner-border";
import Image from "next/image";
import analytics from "./analytics.webp";

export default function Features() {
  return (
    <div>
      <Container className="!py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-5xl font-bold mb-2">Anyone can do it.</h2>
          <div className="text-supporting text-xl">
            Everything you need to organize and manage tournaments!
          </div>
        </div>
        <CornerBorder>
          <div
            className="flex justify-between md:flex-row flex-col"
            style={{
              background:
                "radial-gradient(at 70% 90%, rgba(0,15,89,0.8) 0%, black 80%)",
            }}
          >
            <div className="flex flex-col justify-between items-start flex-[5] gap-4 p-8">
              <div>
                <h2 className="text-4xl font-bold mb-4">
                  Game specific features
                </h2>
                <div className="text-xl text-supporting">
                  Create and manage your esports tournaments with ease. From
                  brackets to registration — empower your team, engage your
                  audience
                </div>
              </div>
              {/* <Button>Create a Tournament</Button> */}
            </div>
            <Image
              src={analytics}
              className="flex-[7] pt-5 object-contain object-right-bottom"
              alt="Analytics"
            />
          </div>
        </CornerBorder>
      </Container>
    </div>
  );
}
