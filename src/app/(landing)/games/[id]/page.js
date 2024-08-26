"use client";
import Ranking from "@/components/icons/ranking";
import Container from "@/components/ui/container";
import { useInViewport, useMemoizedFn } from "ahooks";
import { Calendar, Crown } from "iconsax-react";
import { Swords } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Monitor02 } from "untitledui-js-base";

const sections = [
  { id: "overview", name: "Game Overview", icon: Monitor02 },
  { id: "tournaments", name: "Tournament system", icon: Swords },
  { id: "anti-smurf", name: "Anti-smurf", icon: Crown },
  { id: "events", name: "Game Events", icon: Calendar },
  { id: "leaderboard", name: "Leaderboard", icon: Ranking },
];

export default function GameDetails() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const menuRef = useRef([]);
  const callback = useMemoizedFn((entry) => {
    if (entry.isIntersecting) {
      const active = entry.target.getAttribute("id") || "";
      setActiveSection(active);
    }
  });
  useInViewport(menuRef.current, {
    callback,
    rootMargin: "-19% 0px -80% 0px",
  });

  return (
    <Container className="relative pt-36">
      <h1 className="mb-20 text-5xl font-bold">test</h1>
      <div className="flex">
        <div className="flex-1 sm:pr-24">
          {sections.map(({ id, name, icon: Icon }, index) => (
            <div
              className="mb-16 scroll-mt-36"
              ref={(el) => {
                menuRef.current[index] = el;
              }}
              id={id}
              key={id}
            >
              <h2 className="mb-4 flex items-center gap-4 text-2xl font-semibold">
                <Icon className="size-8 text-neutral-300" />
                {name}
              </h2>
              <div className="space-y-4 text-neutral-300">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum eros augue, rutrum et eros ut, aliquam malesuada
                  leo. Sed eu dui a libero suscipit pharetra sit amet at dui.
                  Curabitur non nisl nec justo sodales lacinia eget non nulla.
                  Nulla ut ligula nulla. Quisque vitae faucibus sem. Maecenas
                  eget justo neque. Aliquam erat volutpat. Nulla facilisi. Nulla
                  tempor lorem non urna iaculis pharetra. Pellentesque habitant
                  morbi tristique senectus et netus et malesuada fames ac turpis
                  egestas. Donec justo neque, interdum a quam nec, interdum
                  consectetur ex.
                </p>
                <p>
                  Aenean pharetra eros id semper consequat. Fusce non dapibus
                  enim, sit amet molestie sem. Suspendisse sollicitudin nisl
                  maximus dignissim interdum. Phasellus in magna sem. Donec ut
                  finibus dolor. Cras sollicitudin, nisl ac vestibulum
                  facilisis, nisl odio dictum diam, ut dictum nisi sapien vel
                  mi. Aenean vitae placerat diam. Sed a sem felis. Cras
                  ullamcorper non sapien sit amet iaculis. Nullam fermentum
                  magna eu tristique luctus. Phasellus sagittis felis ac mi
                  tempus accumsan. Praesent sit amet porta erat, sit amet
                  posuere mi. Nam condimentum neque bibendum nisl auctor,
                  tincidunt pretium sapien viverra. Aliquam elementum ac enim id
                  aliquam.
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden w-96 lg:block">
          <div className="sticky top-32 text-sm font-medium">
            <div className="mb-2">Contents</div>
            {sections.map(({ id, name, icon: Icon }) => (
              <Link
                className={twMerge(
                  "flex items-center gap-2 border-l border-neutral-500 py-2 pl-4 opacity-50 transition-all",
                  activeSection == id && "border-white opacity-100",
                )}
                href={`#${id}`}
                key={name}
              >
                {activeSection == id && (
                  <div
                    className="size-2 rounded-full bg-green-500"
                    key="circle"
                  />
                )}

                <Icon className="size-5" />
                {name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
