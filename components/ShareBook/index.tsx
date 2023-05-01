import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";

export function ShareBook() {
  let shareUrl = "";
  if (typeof window !== "undefined") {
    shareUrl = window.location.href;
  }
  return (
    <div className="flex flex-col gap-5">
      <FacebookShareButton url={shareUrl}>
        <FacebookIcon size={30} />
      </FacebookShareButton>
      <LinkedinShareButton url={shareUrl}>
        <LinkedinIcon size={30} />
      </LinkedinShareButton>
      <TwitterShareButton url={shareUrl}>
        <TwitterIcon size={30} />
      </TwitterShareButton>
      <WhatsappShareButton url={shareUrl}>
        <WhatsappIcon size={30} />
      </WhatsappShareButton>
    </div>
  );
}
