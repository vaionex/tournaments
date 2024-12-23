"use client";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { ArrowDownToLine } from "lucide-react";
import Slider from "react-slick";

function EmptyArrow() {
  return <div />;
}
const settings = {
  slidesToShow: 1,
  centerMode: true,
  className: "slider variable-width",
  variableWidth: true,
  nextArrow: <EmptyArrow />,
  prevArrow: <EmptyArrow />,
};

export default function DesktopApp() {
  return (
    <div>
      <Container className="py-8 md:py-24">
        <div className="mb-12 flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-3xl">
            <h2 className="mb-3 text-5xl font-bold leading-[60px]">
              Experience Enhanced Gameplay
            </h2>
            <div className="text-xl leading-[30px] text-neutral-300">
              Watch real-time game analytics and performance tracking with our
              desktop app.
            </div>
          </div>
          <Button>
            <ArrowDownToLine className="size-5" />
            Coming Soon
          </Button>
        </div>
      </Container>

      <div className="slider-container">
        <Slider {...settings}>
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <img
                key={`desktop-app-slide-${index}`}
                src={`/images/landing/desktop-app/slide${index + 1}.webp`}
                className="pointer-events-none !w-[80vw] object-contain px-2 focus:outline-0 md:px-10"
                alt={`Desktop App ${index + 1}`}
              />
            ))}
        </Slider>
      </div>
    </div>
  );
}
