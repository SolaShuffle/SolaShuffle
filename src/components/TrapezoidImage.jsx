import React from "react";
import trapezoidOut from "./assets/trapezoid-out.svg";

export default function TrapezoidImage({ src, className }) {
  return (
    <div
      className={`relative w-[47px] [&>.image-out]:blur-sm  ${
        className ? className : ""
      }`}
    >
      <div
        className="image-out relative z-10"
        style={{
          WebkitMask: trapezoidOut,
          maskImage: trapezoidOut,
        }}
      >
        <img src={src} alt="" className="h-[42px] w-[47px] object-cover" />
      </div>
      <img
        src={src}
        className="image-inner absolute left-0.5 top-0.5 z-20 h-[38px] w-[42px] object-cover"
        style={{
          WebkitMask: trapezoidOut,
          maskImage: trapezoidOut,
        }}
        alt=""
      />
    </div>
  );
}
