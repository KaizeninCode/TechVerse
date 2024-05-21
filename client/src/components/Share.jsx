import { Box } from "@chakra-ui/react";
import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
  FacebookIcon,
  RedditIcon,
  TwitterIcon,
} from "react-share";

const Share = () => {
  return (
    <Box className=" h-[100px] flex p-3 gap-2 justify-center items-center">
      <FacebookShareButton
        url='www.facebook.com'
        hashtag="#coding, #programming #tech"
      >
        <FacebookIcon className="rounded-full w-[50px] h-[50px] " />
      </FacebookShareButton>
      <TwitterShareButton
        url='twitter.com'
        hashtag="#coding, #programming #tech"
      >
        <TwitterIcon className="rounded-full w-[50px] h-[50px] " />
      </TwitterShareButton>
      <RedditShareButton
        url='reddit.com'
        hashtag="#coding, #programming #tech"
      >
        <RedditIcon className="rounded-full w-[50px] h-[50px] " />
      </RedditShareButton>
    </Box>
  );
};

export default Share;
