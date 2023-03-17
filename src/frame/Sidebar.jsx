import React, { useContext, useEffect, useState } from "react";
import Divider from "../components/Divider";
import Logo from "./assets/logo.png";
import Planet from "./assets/planet.svg";
import Podium from "./assets/podium.svg";
import Infinite from "./assets/infinite.svg";
import Shrimp from "./assets/shrimp.svg";
import Seaweed from "./assets/seaweed.png";

import "./sidebar.css";
import Tab from "./Tab";
import WalletButton from "../components/WalletButton";
import { UserContext } from "../Context";
import { Link } from "react-router-dom";
import { ArrowRight, CommentIcon } from "./assets/CustomIcons";
import ProfileAvatar from "../components/ProfileAvatar";
import CoinIcon from "../components/CoinIcon";
import defaultAvatar from "./assets/default-avatar.png";
import { getUser } from "../api/user";
import { useQuery } from "@tanstack/react-query";

const dashboardTabs = [
    {
        path: "/",
        name: "Home page",
        icon: Planet,
    },
    {
        path: "/leaderboards",
        name: "Leaderboards",
        icon: Podium,
    },
];

const jackpotTabs = [
    {
        path: `/jackpot/${import.meta.env.VITE_OFFICIAL_ROOM_1}`,
        name: "Infinite Room",
        icon: Infinite,
        tokenTicker: "SOL",
    },
    {
        path: `/jackpot/${import.meta.env.VITE_OFFICIAL_ROOM_3}`,
        name: "Shrimp Room",
        icon: Shrimp,
        tokenTicker: "SOL",
        iconClassName: "pl-1",
    },
    {
        path: `/jackpot/${import.meta.env.VITE_OFFICIAL_ROOM_4}`,
        name: "Seaweed Room",
        icon: Seaweed,
        tokenTicker: "SOL",
    },
    {
        path: `/jackpot/${import.meta.env.VITE_OFFICIAL_ROOM_BONK}`,
        name: "Infinite Room",
        icon: Infinite,
        tokenTicker: "BONK",
    },
];

const additionalTabs = [
    {
        path: "https://twitter.com/ImmortalsSOL",
        name: "Twitter",
    },
    {
        path: "https://discord.gg/immortalssol",
        name: "Discord",
    },
];

const Sidebar = ({
    isNoticeModal,
    setIsNoticeModal,
    sidebarOpen,
    cycleSidebarOpen,
    isMobileChat,
    setIsMobileChat,
    balance,
    publicKey,
}) => {
    const { user, setUser } = useContext(UserContext);
    
    const userQuery = useQuery({
        queryKey: ["user"],
        queryFn: () => getUser(publicKey)
    })

    const handleNotice = () => {
        cycleSidebarOpen();
        setIsNoticeModal(true);
    };

    const handleMobile = () => {
        cycleSidebarOpen();
        console.log(isMobileChat, "isMobileChat");
        setIsMobileChat(true);
    };

    useEffect(() => {
        const websocket = new WebSocket(`${import.meta.env.VITE_WS}/stats`);
        websocket.onopen = () => {
            console.log("connected");
        };
        websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            switch (data.type) {
                case "stats":
                    setUser((prevData) => ({
                        ...prevData,
                        onlinePlayers: data.value.onlinePlayers,
                    }));
            }
        };
    }, []);

    return (
        <div className="flex h-screen w-[350px] flex-col overflow-y-auto bg-[#25244E] shadow-xl scrollbar-hide md:w-[260px]">
            <Link to="/" className="hidden min-h-[80px] w-full items-center md:flex">
                <img src={Logo} alt="Solanashuffle logo" className="ml-2" />
                <span className="ml-2 text-lg font-black uppercase">Solanashuffle</span>
            </Link>
            <div className="mt-[22px] block px-6 md:hidden">
                <button
                    className="flex h-11 w-11 items-center justify-center rounded-xl border-[2.5px] border-[#49487C]"
                    onClick={cycleSidebarOpen}
                >
                    <ArrowRight />
                </button>
            </div>
            {/* Mobile user data beginning */}
            {publicKey && (
                <div className="mt-9 flex items-center justify-between px-6 md:hidden">
                    <div className="flex items-center">
                        <ProfileAvatar
                            size={"small"}
                            publicKey={publicKey.toBase58()}
                        />
                        <div className="ml-4">
                            {(userQuery.isSuccess && userQuery.data.name) ? (
                                <p className="font-[600]">{userQuery.data.name}</p>
                            ) : (
                                <p className="font-[600]">
                                    {publicKey.toBase58().slice(0, 3)}...
                                    {publicKey.toBase58().slice(-3)}
                                </p>
                            )}
                            <div className="flex items-center">
                                <CoinIcon coin={"solana"} />
                                <span className="ml-1 text-[10px] font-[600] leading-[22px]">
                                    {balance.toFixed(2)} SOL
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <button
                            className="mr-2.5 flex h-11 w-11 items-center justify-center rounded-xl border-[2.5px] border-[#49487C]"
                            onClick={() => handleMobile(true)}
                        >
                            <CommentIcon />
                        </button>
                    </div>
                </div>
            )}
            {/* Mobile user data end */}
            <div className="flex flex-col px-6 py-3">
                <div className="mt-6 flex flex-col gap-1 md:hidden">
                    <div className="flex gap-1">
                        <div className="flex items-center">
                            <div className="greenGradient h-3 w-3 rounded-full"></div>
                            <span className="ml-[14px] text-sm font-semibold">Connected</span>
                        </div>
                        <div className="ml-7 flex items-center">
                            <div className="greenGradient h-3 w-3 rounded-full"></div>
                            <span className="ml-[14px] text-sm font-semibold">
                                {user.onlinePlayers ? user.onlinePlayers : 0} Players online
                            </span>
                        </div>
                    </div>
                    <WalletButton className="mt-2 !w-full" />
                </div>
                <div className="hidden flex-col gap-1 md:flex">
                    <div className="flex items-center">
                        <div className="greenGradient h-3 w-3 rounded-full"></div>
                        <span className="ml-[14px] text-sm font-semibold">Connected</span>
                    </div>
                    <div className="flex items-center">
                        <div className="greenGradient h-3 w-3 rounded-full"></div>
                        <span className="ml-[14px] text-sm font-semibold">
                            {user.onlinePlayers ? user.onlinePlayers : 0} Players online
                        </span>
                    </div>
                    <WalletButton className="mt-2 !w-full" />
                </div>
                <Divider className="my-5" />
                <div className="flex flex-col">
                    <span className="font-bold text-mute">Dashboard</span>
                    <div className="mt-5 flex flex-col gap-4">
                        {dashboardTabs.map((data) => {
                            return <Tab {...data} key={data.path} type="dashboard" />;
                        })}
                    </div>
                </div>
                <Divider className="my-5" />
                <div className="flex flex-col">
                    <span className="font-bold text-mute">Official Rooms</span>
                    <div className="mt-5 flex flex-col gap-4">
                        {jackpotTabs.map((data) => {
                            return <Tab {...data} key={data.path} type="jackpot" />;
                        })}
                    </div>
                </div>
                <Divider className="my-5" />
                <div className="flex flex-col">
                    <span className="font-bold text-mute">Additional Information</span>
                    <div className="mt-5 flex flex-col gap-4">
                        {additionalTabs.map((data) => {
                            return <Tab {...data} key={data.path} type="additional" />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
