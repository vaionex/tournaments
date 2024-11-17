"use client";
import Container from "@/components/ui/container";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Features() {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end start", "start end"],
  });
  const offset = useTransform(scrollYProgress, [0, 1], [-150, 150]);

  return (
    <div ref={ref}>
      <Container className="!py-24">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-2 text-5xl font-bold">Create your own Events</h2>
          <div className="text-xl text-supporting">
            Everything you need to organise and manage tournaments!
          </div>
        </div>
        <div className="relative flex justify-end">
          <div
            className="absolute inset-0 hidden md:block"
            style={{
              backgroundImage: `url('/images/landing/fortnite.webp')`,
              backgroundPosition: "bottom left",
              backgroundRepeat: "no-repeat",
              backgroundSize: "70%",
            }}
          />
          <motion.div
            className="relative my-10 max-w-md border border-white/10 bg-white/5 p-12 backdrop-blur-lg"
            style={{ top: offset }}
          >
            <div className="mb-4 text-4xl font-semibold">
              Supercharged Events
            </div>
            <div className="mb-4 text-neutral-100">
              Unlock the full potential of your gaming events with our
              comprehensive tournament management tools.
            </div>
            <div className="my-8 h-px bg-white/20" />
            <div className="text-neutral-300">
              Our platform provides all the tools you need to run a smooth and
              successful eSports tournament. From player registration to
              real-time match updates, everything is handled with precision to
              ensure a great experience for participants and spectators alike.
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
