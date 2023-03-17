import copy from "copy-to-clipboard";
import React, { useEffect, useState } from "react";
import { CheckIconTwo, CopyIcon, ReferIcon } from "../frame/assets/CustomIcons";

export default function ReferFriend({ className, link }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copy(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  return (
    <div
      className={`rounded-[30px] bg-paper-gradient shadow-paper-top-border backdrop-blur-md  ${
        className ? className : ""
      }`}
    >
      <div className="relative flex w-full items-center border-b-2 border-[#393869] p-6 pb-5 text-[22.8px] font-[800] uppercase">
        <ReferIcon />
        <span className="ml-4">refer a friend</span>
      </div>
      <div className="p-6">
        <p className="text-[18px] leading-[1.3]">
          Refer a new user to Shuffle and earn{" "}
          <span className="font-bold text-[#5C4FFF]">1%</span> of their trading
          volume for <span className="font-bold text-[#5C4FFF]">24 hours</span>{" "}
          when they sign up using your{" "}
          <span className="font-bold text-[#5C4FFF]">unique</span> referral
          link.
        </p>
        <div className="mt-[18px] mb-7 flex h-11">
          <input
            disabled
            placeholder={link}
            className="mr-5 w-[calc(100%-180px)] rounded-xl bg-[#201F48] py-3 px-4 placeholder:text-[15px] placeholder:font-semibold placeholder:text-[#6E6FA6]"
          />
          <button
            className="flex h-11 w-40 items-center rounded-xl bg-btn-gradient-1 px-5 py-3 text-left "
            onClick={handleCopy}
          >
            {!copied ? (
              <>
                <CopyIcon />
                <span className="ml-2.5 w-[calc(100%-30px)] whitespace-nowrap text-[11.5px] font-[700] uppercase">
                  copy the link
                </span>
              </>
            ) : (
              <>
                <CheckIconTwo color={"#fff"} />
                <span className="ml-2.5 w-[calc(100%-30px)] whitespace-nowrap text-[11.5px] font-[700] uppercase">
                  Copied!
                </span>
              </>
            )}
          </button>
        </div>
        <div className="flex items-center border-t-2 border-[#393869] pt-5">
          <p className="mr-3 text-[12.5px] leading-[18px] text-[#6E6FA6]">
            Total Reffered: <span className="font-[700] text-light">0</span>
          </p>
          <p className="mr-3 text-[12.5px] leading-[18px] text-[#6E6FA6]">
            Available To Claim:{" "}
            <span className="font-[700] text-light">0 SOL</span>
          </p>
          <button
            className="h-[22px] w-[62px] rounded-lg text-[11px] uppercase leading-4"
            style={{
              background:
                "radial-gradient(132.75% 155.27% at 31.94% -11.82%, #69D9FD 0%, #52BDFF 33.87%, #1DA1F2 91.62%)",
            }}
          >
            claim
          </button>
        </div>
      </div>
    </div>
  );
}
