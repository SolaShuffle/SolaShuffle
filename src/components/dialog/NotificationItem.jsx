import React from "react";

export default function NotificationItem({
  title,
  date,
  content,
  username,
  icon,
  isChat,
  chatContent,
}) {
  return (
    <div className="flex items-start justify-between mb-[42px]">
      <div className="flex w-[calc(100%-70px)]">
        <div
          className="w-2.5 h-2.5 rounded-full mr-2.5 translate-y-2.5"
          style={{
            background:
              "radial-gradient(99.95% 134.94% at 16.83% -14.06%, #FF91C6 0%, #FF76B8 35.99%, #FF64AE 100%)",
          }}
        ></div>
        <div className="w-[calc(100%-20px)]">
          <p className="text-[#6E6FA6] text-[14px">
            {title}
            {isChat && <span className="text-white ml-2">{username}</span>}
          </p>
          <p className="text-white text-[11px] mt-3">{date}</p>
          {isChat && (
            <div className="py-4 px-5 text-[#6E6FA6] bg-[#201F48] rounded-xl mt-4 text-[12px]">
              {chatContent}
            </div>
          )}
        </div>
      </div>
      {isChat ? (
        <div className="scale-[0.8] -mr-2">{icon}</div>
      ) : (
        <>
          <div className="flex items-center justify-center icon-bg">
            <div className="inner"></div>
            {icon}
          </div>
        </>
      )}
    </div>
  );
}
