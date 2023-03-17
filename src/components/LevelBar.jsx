import React from "react";

export default function LevelBar({ level }) {
  return (
    <div className="relative mt-5 h-2.5 w-full rounded-[20px] border-2 border-[#19187c]">
      <div
        className="absolute -left-0.5 -top-[3px] h-3 rounded-[36px]"
        style={{ width: `${level}%` }}
      >
        <span className="absolute -right-8 -top-5 whitespace-nowrap text-[14.5px] font-semibold">
          {level} %
        </span>
      </div>
    </div>
  );
}
