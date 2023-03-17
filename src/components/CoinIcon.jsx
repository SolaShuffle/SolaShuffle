import React from "react";

export default function CoinIcon({ coin, className }) {
  switch (coin) {
    case "sol":
      return (
        <img
          src="https://cdn.solanashuffle.com/images/SOL.png"
          alt=""
          className={`h-[16.7px] w-[16.7px] rounded-full object-cover ${
            className ? className : ""
          }`}
        />
      );
    case "usdc":
      return (
        <img
          src="https://cdn.solanashuffle.com/images/USDC.png"
          alt=""
          className={`h-[16.7px] w-[16.7px] rounded-full object-cover ${
            className ? className : ""
          }`}
        />
      );
    case "bonk":
      return (
        <img
          src="https://cdn.solanashuffle.com/images/BONK.png"
          alt=""
          className={`h-[16.7px] w-[16.7px] rounded-full object-cover ${
            className ? className : ""
          }`}
        />
      );
    default:
      return (
        <img
          src="https://cdn.solanashuffle.com/images/SOL.png"
          alt=""
          className={`h-[16.7px] w-[16.7px] rounded-full object-cover ${
            className ? className : ""
          }`}
        />
      );
  }
}
