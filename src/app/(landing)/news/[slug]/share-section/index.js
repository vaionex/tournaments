"use client";
import Facebook from "@/components/icons/logo-simple/Facebook";
import Linkedin from "@/components/icons/logo-simple/LinkedIn";
import Twitter from "@/components/icons/logo-simple/Twitter";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { Copy01 } from "untitledui-js-base";

export default function ShareSection({ title }) {
  const shareUrl = window.location.href;

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
        <Button variant="black" size="icon">
          <Twitter className="size-5" />
        </Button>
      </TwitterShareButton>
      <FacebookShareButton title={title} url={shareUrl}>
        <Button variant="black" size="icon">
          <Facebook className="size-5" />
        </Button>
      </FacebookShareButton>
      <LinkedinShareButton title={title} url={shareUrl}>
        <Button variant="black" size="icon">
          <Linkedin className="size-5" />
        </Button>
      </LinkedinShareButton>
    </div>
  );
}
