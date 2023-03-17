import React from "react";
import { MoreIcon } from "../../frame/assets/CustomIcons";

export default function NewsItem({ imgSrc, content, title, date }) {
  return (
    <div className="mb-5">
      <img src={imgSrc} className="rounded-[18px]" alt="" />
      <p className="text-[14px] text-[#6e6fa6] text-[500] leading-[18px] mt-4">
        {content}
      </p>
      <div className="flex items-center justify-between mt-[22px]">
        <div className="flex items-center">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{
              background:
                "radial-gradient(99.95% 134.94% at 16.83% -14.06%, #FF91C6 0%, #FF76B8 35.99%, #FF64AE 100%)",
            }}
          ></div>
          <p className="text-[11px] text-white ml-2.5">{date}</p>
        </div>
        <button className="btn-more">
          <MoreIcon />
        </button>
      </div>
    </div>
  );
}
