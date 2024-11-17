import { twMerge } from "tailwind-merge";
import Connector from "./Connector";

export default function Feature({
  image,
  icon: Icon,
  title,
  description,
  even,
  first,
  last,
}) {
  return (
    <div
      className={twMerge(
        "relative flex flex-col gap-12 lg:flex-row lg:gap-0",
        even && "lg:flex-row-reverse",
      )}
    >
      <div className="flex flex-1 items-center">
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
      </div>
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
      <div className="flex h-72 flex-1 items-center justify-center">
        <div className="h-full w-11/12">
          <img
            src={`/images/landing/sponsorship-features/${image}`}
            alt={title}
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}
