import React, { useState } from "react";
import Modal from "react-modal";
import {
  ArrowLeft,
  CheckIcon,
  CloseIcon,
  CommentIconTwo,
  KeyIcon,
  LockIcon,
} from "../../frame/assets/CustomIcons";
import ProfileAvatar from "../ProfileAvatar";
import "./dialog.scss";
import NewsItem from "./NewsItem";
import NotificationItem from "./NotificationItem";

const customStyles = {
  content: {},
  overlay: {
    background: "#161438b3",
    zIndex: 9999,
  },
};

Modal.setAppElement(document.getElementById("root"));
export default function NotificationAndNewsDialog({ modalIsOpen, closeModal }) {
  const [tab, setTab] = useState("notification");

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className={"notice-modal"}
    >
      <div className="h-full">
        {/* Modal Header beginning */}
        <div className="relative flex items-center">
          <CommentIconTwo />
          <h5 className="ml-2.5 font-[800] uppercase text-white">
            notifications and news
          </h5>
          <button
            className="btn-topper absolute right-0 -top-2 flex h-11 w-11 items-center justify-center rounded-xl border-[2.5px] border-[#49487C] md:hidden"
            onClick={closeModal}
          >
            <ArrowLeft />
          </button>
          <button
            className="btn-modal-close absolute right-0 hidden md:block"
            onClick={closeModal}
          >
            <CloseIcon />
          </button>
        </div>
        {/* Modal Header end */}
        {/* Modal tab beginning */}
        <div className="relative mt-5">
          <div className="flex w-full justify-between">
            <div className="flex items-center pb-0.5">
              <button
                className={`btn-modal-tab relative -mb-0.5 h-9 p-2 text-[11px] font-[700] leading-[15.6px] text-[#6E6FA6] ${
                  tab === "notification" ? "active !text-white" : ""
                }`}
                onClick={() => setTab("notification")}
              >
                Notifications
              </button>
              <button
                className={`btn-modal-tab relative -mb-0.5 flex h-9 items-center p-2 text-[11px] font-[700] leading-[15.6px] text-[#6E6FA6] ${
                  tab === "news" ? "active !text-white" : ""
                }`}
                onClick={() => setTab("news")}
              >
                <span>News</span>
                <div className="relative ml-2 rounded-xl bg-[#393869] px-2 py-1 text-[11px] font-[500] text-white">
                  25
                  <div className="absolute right-0 top-0 z-20 h-1.5 w-1.5 rounded-full bg-[#ff70b5]"></div>
                </div>
              </button>
            </div>
            <button className="flex items-center">
              <CheckIcon />
              <span className="ml-1.5 text-[12px] font-semibold capitalize text-[#52BDFF]">
                mark all as read
              </span>
            </button>
          </div>
          <div className="absolute bottom-0 left-0 h-0.5 w-full rounded bg-[#6e6fa666]"></div>
        </div>
        {/* Modal tab end */}
        {/* Main content beginning */}
        {tab === "notification" && (
          <div className="h-[calc(100%-130px)] overflow-x-hidden overflow-y-scroll	pt-[22px]">
            {demoNotifications1.map((item, key) => (
              <NotificationItem
                key={key}
                title={item.title}
                date={item.date}
                icon={item.icon}
              />
            ))}
            {demoNotifications2.map((item, key) => (
              <NotificationItem
                key={key}
                title={item.title}
                date={item.date}
                icon={item.icon}
                username={item.username}
                chatContent={item.chatContent}
                isChat
              />
            ))}
          </div>
        )}
        {tab === "news" && (
          <div className="h-[calc(100%-130px)] overflow-x-hidden overflow-y-scroll	pt-[22px]">
            {demoNews.map((item, key) => (
              <NewsItem
                key={key}
                content={item.content}
                title={item.title}
                imgSrc={item.img}
                date={item.date}
              />
            ))}
          </div>
        )}
        {/* Main content end */}
      </div>
    </Modal>
  );
}

const demoNotifications1 = [
  {
    title: "Your password has been successfully chanegd",
    date: "Friday 2:20pm",
    icon: <LockIcon />,
  },
  {
    title: "Suspicious login attempt from France has been blocked",
    date: "Friday 2:20pm",
    icon: <KeyIcon />,
  },
];

const demoNotifications2 = [
  {
    title: "You have new message by",
    username: "Teardowntopper",
    chatContent:
      "I believe that Santa Claus under the Christmas tree will bring me a dream gift 🎄☺️ I really want is there a chance?",
    date: "Friday 2:20pm",
    icon: (
      <ProfileAvatar
        publicKey={"sasuke0601"}
      />
    ),
  },
  {
    title: "You have new message by",
    username: "Opper",
    chatContent:
      "I believe that Santa Claus under the Christmas tree will bring me a dream gift 🎄☺️ I really want is there a chance?",
    date: "Friday 2:20pm",
    icon: (
      <ProfileAvatar
        publicKey={"sasuke0601"}
      />
    ),
  },
];

const demoNews = [
  {
    title: "Will There Be Crypto Ads in the Super Bowl This Year?",
    date: "Nov 10, 2021",
    content:
      "While commercials from crypto companies were a common sight during the NFL’s final game last year, Super Bowl LVII is shaping up to be an advertising desert for the digital asset industry.",
    img: "https://img.decrypt.co/insecure/rs:fit:1536:0:0:0/plain/https://cdn.decrypt.co/wp-content/uploads/2022/11/larry-david-ftx-ad-gID_1.jpg@webp",
  },
  {
    title: "Gemini, Genesis Reach $100 Million Agreement Over Earn Program",
    date: "Nov 10, 2021",
    content:
      "Gemini Earn users are a step closer to recovering their money with an agreement announced today between US cryptocurrency exchange Gemini, Genesis Global Capital, LLC (Genesis), and Digital Currency co-founder Cameron Winklevoss announced the agreement on Twitter.",
    img: "https://img.decrypt.co/insecure/rs:fit:1536:0:0:0/plain/https://cdn.decrypt.co/wp-content/uploads/2021/06/gemini-crypto-exchange-winklevoss-gID_2.png@webp",
  },
  {
    title: "Will There Be Crypto Ads in the Super Bowl This Year?",
    date: "Nov 10, 2021",
    content:
      "While commercials from crypto companies were a common sight during the NFL’s final game last year, Super Bowl LVII is shaping up to be an advertising desert for the digital asset industry.",
    img: "https://img.decrypt.co/insecure/rs:fit:1536:0:0:0/plain/https://cdn.decrypt.co/wp-content/uploads/2023/02/sorare-nba-giannis-gID_4.png@webp",
  },
];
