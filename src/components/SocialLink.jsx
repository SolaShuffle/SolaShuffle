import React from "react";
import { Link } from "react-router-dom";
import { DiscordIcon, TwitterIcon } from "../frame/assets/CustomIcons";

export default function SocialLink({ link, social, className }) {
  switch (social) {
    case "twitter":
      return (
        <Link to={link} target="_blank">
          <div
            className={`flex h-[42px] w-11 items-center justify-center rounded-xl bg-twitter-gradient shadow-twitter ${social} ${
              className ? className : ""
            }`}
          >
            <TwitterIcon />
          </div>
        </Link>
      );
    case "discord":
      return (
        <Link to={link} target="_blank">
          <div
            className={`flex h-[42px] w-11 items-center justify-center rounded-xl bg-discord-gradient shadow-discord ${social} ${
              className ? className : ""
            }`}
          >
            <DiscordIcon color={"#eee"} />
          </div>
        </Link>
      );
    default:
      <Link to={link} target="_blank">
        <div className="flex h-[42px] w-11 items-center justify-center rounded-xl bg-twitter-gradient shadow-twitter">
          <TwitterIcon />
        </div>
      </Link>;
  }
}
