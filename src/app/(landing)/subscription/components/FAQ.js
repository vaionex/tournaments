"use client";

import { DISCORD_URL } from "@/utils/constants";
import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";

const faqs = [
  {
    question: "Do I loose any IP rights when submitting entries?",
    answer:
      "No, as the rules state you keep all IP and won't be required to share the source code.",
  },
];
export default function FAQs() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:px-8 lg:py-40">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="mb-3 font-semibold">Support</div>
            <h2 className="text-4xl font-bold leading-10 tracking-tight">
              FAQs
            </h2>
            <p className="mt-4 text-base leading-7">
              Can’t find the answer you’re looking for? <br />
              <a href={DISCORD_URL} target="_blank" className="underline">
                Join Discord
              </a>
            </p>
          </div>
          <div className="mt-10 lg:col-span-7 lg:mt-0">
            <dl className="space-y-6 divide-y divide-white/10">
              {faqs.map((faq) => (
                <Disclosure key={faq.question} as="div" className="pt-6">
                  {({ open }) => (
                    <div
                      className={twMerge(
                        "rounded-lg p-8",
                        open && "bg-gradient-to-br from-white/10 to-black",
                      )}
                    >
                      <dt>
                        <Disclosure.Button className="group flex w-full items-start justify-between text-left text-white">
                          <span className="text-base font-semibold leading-7">
                            {faq.question}
                          </span>
                          <span className="ml-6 flex h-7 items-center">
                            {open ? (
                              <MinusSmallIcon
                                aria-hidden="true"
                                className="h-6 w-6"
                              />
                            ) : (
                              <PlusSmallIcon
                                aria-hidden="true"
                                className="h-6 w-6"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <p className="text-base leading-7 text-gray-300">
                          {faq.answer}
                        </p>
                      </Disclosure.Panel>
                    </div>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
