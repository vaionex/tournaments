"use client";
import { twMerge } from "tailwind-merge";
import Connector from "./Connector";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Feature({
  image,
  icon: Icon,
  title,
  description,
  even,
  first,
  last,
}) {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end start", "start end"],
  });
  const offset = useTransform(scrollYProgress, [0, 1], [0, 100]);
  return (
    <div
      className={twMerge(
        "flex flex-col gap-12 lg:flex-row lg:gap-0",
        even && "lg:flex-row-reverse",
      )}
      ref={ref}
    >
      <motion.div
        className="flex flex-1 items-center lg:relative"
        style={{ [even ? "left" : "right"]: offset }}
      >
        <div className="px-20">
          <div
            className="mb-6 flex size-12 items-center justify-center rounded-lg border"
            style={{
              boxShadow: "0px 0px 10px 4px #ffffff33 inset",
            }}
          >
            <Icon className="size-5 opacity-80" />
          </div>
          <div className="mb-4 text-3xl font-semibold">{title}</div>
          <div className="text-lg text-neutral-400">{description}</div>
        </div>
      </motion.div>
      <Connector
        className="hidden h-full lg:block"
        style={{
          maskImage: first
            ? "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 25%)"
            : last
              ? "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 50%)"
              : undefined,
        }}
      />
      <motion.div
        className="flex h-72 flex-1 items-center justify-center lg:relative"
        style={{ [even ? "right" : "left"]: offset }}
      >
        <div className="h-full w-11/12">
          <img
            src={`/images/landing/sponsorship-features/${image}`}
            alt={title}
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}
