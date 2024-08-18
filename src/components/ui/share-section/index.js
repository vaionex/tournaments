"use client";
import Facebook from "@/components/icons/logo-simple/Facebook";
import Linkedin from "@/components/icons/logo-simple/Linkedin";
import Twitter from "@/components/icons/logo-simple/Twitter";
import { Button, buttonVariants } from "@/components/ui/button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { twMerge } from "tailwind-merge";
import { Copy01 } from "untitledui-js-base";

export default function ShareSection({ title }) {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(typeof window != "undefined" ? window.location.href : "");
  }, [window.location.href]);

  function copyUrl() {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Copied!");
  }

  return (
    <div className="flex items-center gap-3">
      <Button variant="black" className="text-sm" onClick={copyUrl}>
        <Copy01 className="size-5" />
        Copy link
      </Button>
      <TwitterShareButton title={title} url={shareUrl}>
        <div
          className={twMerge(
            buttonVariants({ variant: "black" }),
            "size-11 p-0",
          )}
        >
          <Twitter className="size-5" />
        </div>
      </TwitterShareButton>
      <FacebookShareButton title={title} url={shareUrl}>
        <div
          className={twMerge(
            buttonVariants({ variant: "black" }),
            "size-11 p-0",
          )}
        >
          <Facebook className="size-5" />
        </div>
      </FacebookShareButton>
      <LinkedinShareButton title={title} url={shareUrl}>
        <div
          className={twMerge(
            buttonVariants({ variant: "black" }),
            "size-11 p-0",
          )}
        >
          <Linkedin className="size-5" />
        </div>
      </LinkedinShareButton>
    </div>
  );
}
