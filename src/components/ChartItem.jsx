import React, { useState } from "react";
import {
  LineChartIcon,
  MoreIcon,
  PieChartIcon,
  UpIconMini,
} from "../frame/assets/CustomIcons";
import CoinIcon from "./CoinIcon";
import SimpleChart from "./SimpleChart";

export default function ChartItem({ type, link, className, totalVolume }) {
  const [tab, setTab] = useState("week");
  return (
    <div
      className={`rounded-[30px] bg-paper-gradient shadow-paper-top-border backdrop-blur-md  ${
        className ? className : ""
      }`}
    >
      <div className="relative flex w-full items-center border-b-2 border-[#393869] p-6 pb-6 text-[22.8px] font-[800] uppercase">
        {type === "profit" && <PieChartIcon />}
        {type === "activity" && <LineChartIcon />}
        <span className="ml-4">{type}</span>
        <button className="absolute right-6 top-9">
          <MoreIcon />
        </button>
      </div>
      <div className="p-6">
        <div
          className="rounded-xl bg-[#201F48] p-[5px]"
          style={{
            boxShadow: "inset 0px 4.15399px 7.26947px rgba(0, 0, 0, 0.15)",
          }}
        >
          <button
            className={`w-1/2 rounded-xl border-[2.5px] border-${
              tab === "week" ? "[#49487C]" : "transparent"
            } bg-${
              tab === "week" ? "[#393869]" : "none"
            } py-2 text-[12.5px] font-semibold capitalize`}
            onClick={() => setTab("week")}
          >
            week
          </button>
          <button
            className={`w-1/2 rounded-xl border-[2.5px] border-${
              tab === "all" ? "[#49487C]" : "transparent"
            } bg-${
              tab === "all" ? "[#393869]" : "none"
            } py-2 text-[12.5px] font-semibold capitalize`}
            onClick={() => setTab("all")}
          >
            all
          </button>
        </div>
        {type === "profit" && (
          <SimpleChart
            color="#02DBD6"
            data={[3, 2, 6, 3, 5]}
            title={
              <div className="absolute left-0 top-0 w-full">
                <div className="absolute left-4 top-4 flex items-center">
                  <CoinIcon coin={"sol"} className={"mr-2 h-7 w-7"} />
                  <span className="text-[22px] font-semibold">23.4 SOL</span>
                </div>
                <div
                  className="absolute right-4 top-5 flex h-5 w-[60px] items-center justify-center rounded-md"
                  style={{
                    background:
                      "radial-gradient(191.08% 125.83% at 26.69% 10%, #56FFFA 2.08%, #00DFD9 26.92%, #00D0CB 46.85%, #00C278 91.62%)",
                  }}
                >
                  <UpIconMini />
                  <span className="ml-1 text-[10px] font-bold">15.00%</span>
                </div>
              </div>
            }
          />
        )}
        {type === "activity" && (
          <SimpleChart
            color="#4DBAFC"
            data={[2, 4, 7, 4, 5]}
            title={
              <div className="absolute left-0 top-0 w-full">
                <div className="absolute left-4 top-4 flex items-center">
                  <span className="text-[22px] font-semibold">155 Hours</span>
                </div>
                <div
                  className="absolute right-4 top-5 flex h-5 w-[60px] items-center justify-center rounded-md"
                  style={{
                    background:
                      "radial-gradient(132.75% 155.27% at 31.94% -11.82%, #69D9FD 0%, #52BDFF 33.87%, #1DA1F2 91.62%), radial-gradient(132.75% 155.27% at 31.94% -11.82%, #9186FF 0%, #6D61FF 33.87%, #574AFF 91.62%)",
                  }}
                >
                  <UpIconMini />
                  <span className="ml-1 text-[10px] font-bold">15.00%</span>
                </div>
              </div>
            }
          />
        )}
      </div>
    </div>
  );
}
