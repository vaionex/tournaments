"use client";

import Container from "@/components/ui/container";
import DurationTag from "@/components/ui/duration-tag";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import CreateTournamentButton from "../create-tournament-button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeInOut } from "@/hooks/util/animations";

export default function Carousel({ tournaments }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { name, start, end } = tournaments[selectedIndex];
  return (
    <div className="relative mx-auto mb-24 max-w-[1920px]">
      <div className="relative isolate z-[3] overflow-hidden">
        <Container className="mx-auto max-w-7xl px-6 pb-24 pt-20 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto mt-12 max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-3xl lg:pt-8">
            <div className="mb-10">
              <DurationTag startDate={start} endDate={end} />
            </div>

            <AnimatePresence mode="popLayout">
              <motion.h1
                {...fadeInOut}
                className="block w-full text-4xl font-bold tracking-tight text-white sm:text-6xl"
                key={name}
              >
                {name}
              </motion.h1>
            </AnimatePresence>
            <p className="mt-6 text-lg leading-8">
              Sign up now to get access to our first tournaments!
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <CreateTournamentButton />
            </div>
          </div>
        </Container>
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {tournaments.map(({ start, end, name }, index) => (
              <button
                className={twMerge(
                  "relative rounded-lg border border-neutral-800 bg-white/5 px-4 py-3 text-left transition ",
                  index == selectedIndex && "border-primary bg-primary-950",
                  index != selectedIndex && "hover:bg-white/10",
                )}
                onClick={() => setSelectedIndex(index)}
                key={index}
              >
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.625 8.25L6.50245 13.8085L8.86699 15.5129L10 14.625L11.1176 15.5129L13.4822 13.8085L16.375 8.25"
                      stroke="#737373"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.99245 9.29829L1.06543 2.47089L3.23721 7.80805L9.99243 12.6777L16.7474 7.80805L18.9193 2.47089L9.99245 9.29829Z"
                      stroke="#737373"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <div>
                    {" "}
                    {format(start, "MMM dd")} – {format(end, "MMM dd")},{" "}
                    {start.getFullYear()}
                  </div>
                </div>
                <div className="mt-2 text-sm">{name}</div>
              </button>
            ))}
          </div>
        </Container>
      </div>
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black" />
      {tournaments.map(({ id, banner }, index) => (
        <img
          className={twMerge(
            "absolute inset-0 z-[1] h-full w-full object-cover transition-opacity",
            index != selectedIndex && "opacity-0",
          )}
          src={banner}
          key={id}
        />
      ))}
    </div>
  );
}
