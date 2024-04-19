"use client";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

export default function ShareSection({ title }) {
  const shareUrl = window.location.href;
  return (
    <div className="flex items-center gap-2">
      <TwitterShareButton title={title} url={shareUrl}>
        <TwitterIcon />
      </TwitterShareButton>
      <FacebookShareButton title={title} url={shareUrl}>
        <FacebookIcon />
      </FacebookShareButton>
      <LinkedinShareButton title={title} url={shareUrl}>
        <LinkedinIcon />
      </LinkedinShareButton>
    </div>
  );
}
