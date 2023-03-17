import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getUser } from "../api/user";
import { PieChartIcon } from "../frame/assets/CustomIcons";
import CoinIcon from "./CoinIcon";

export default function Wagered({ className, publicKey }) {
  const [tab, setTab] = useState("week");
  const [volume, setVolume] = useState(0);

  const userQuery = useQuery({
    queryKey: ["user", publicKey],
    queryFn: () => getUser(publicKey)
  })

  useEffect(() => {
    if (userQuery.isSuccess && userQuery.data?.stats) {
      const current = new Date().getTime();
      const dates = Object.keys(userQuery.data.stats.volumes);
      if (dates.length === 0) return;
      const volumeArray = Object.values(userQuery.data.stats.volumes);
      let sum = 0;
      for (let i = 0; i < dates.length; i++) {
        if (tab === "week") {
          if (current - 3600 * 24 * 1000 * 7 < new Date(dates[i]).getTime()) {
            sum += volumeArray[i];
          }
        } else {
          sum += volumeArray[i];
        }
      }
      if (sum !== 0) setVolume(sum / LAMPORTS_PER_SOL);
    }
  }, [userQuery, tab]);

  return (
    <div
      className={`rounded-[30px] bg-paper-gradient shadow-paper-top-border backdrop-blur-md  ${className ? className : ""
        }`}
    >
      <div className="relative flex w-full items-center border-b-2 border-[#393869] pb-5 text-[22.8px] font-[800] uppercase">
        <PieChartIcon />
        <span className="ml-4">wagered</span>
      </div>
      <div className="py-6">
        <div
          className="rounded-xl bg-[#201F48] p-[5px]"
          style={{
            boxShadow: "inset 0px 4.15399px 7.26947px rgba(0, 0, 0, 0.15)",
          }}
        >
          <button
            className={`w-1/2 rounded-xl border-[2.5px] border-${tab === "week" ? "[#49487C]" : "transparent"
              } bg-${tab === "week" ? "[#393869]" : "none"
              } py-2 text-[12.5px] font-semibold capitalize`}
            onClick={() => setTab("week")}
          >
            week
          </button>
          <button
            className={`w-1/2 rounded-xl border-[2.5px] border-${tab === "all" ? "[#49487C]" : "transparent"
              } bg-${tab === "all" ? "[#393869]" : "none"
              } py-2 text-[12.5px] font-semibold capitalize`}
            onClick={() => setTab("all")}
          >
            all
          </button>
        </div>
        <div
          className="mt-5 flex items-center rounded-2xl bg-[#201F48] py-6 px-5"
          style={{
            boxShadow: "inset 0px 4.15399px 7.26947px rgba(0, 0, 0, 0.15)",
          }}
        >
          <CoinIcon coin={"sol"} className="h-7 w-7" />
          <span className="ml-2 text-[22px] font-semibold leading-[32px]">
            {volume.toFixed(2)}&nbsp;SOL
          </span>
        </div>
      </div>
    </div>
  );
}
