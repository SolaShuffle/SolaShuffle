import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";

import { Outlet } from "react-router-dom";
import { motion, AnimatePresence, useCycle } from "framer-motion";
import Topbar from "./Topbar";
import { PopupContext } from "../Context";
import Popup from "../components/Popup";
import TopHeader from "./TopHeader";
import NotificationAndNewsDialog from "../components/dialog/NotificationAndNewsDialog";
import Chat from "./Chat";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js"; 

const Frame = ({ children }) => {
    const { popup } = useContext(PopupContext);
    const [sidebarOpen, cycleSidebarOpen] = useCycle(false, true);

    const [isMobileChat, setIsMobileChat] = useState(false);
    const [isNoticeModal, setIsNoticeModal] = useState(false);

    const wallet = useWallet();
    const { connection } = useConnection();
    const [balance, setBalance] = useState(0);

    const getUserData = async () => {
        if (!wallet.publicKey) return;
        const balanceWithLamports = await connection.getBalance(wallet.publicKey);
        setBalance(balanceWithLamports / LAMPORTS_PER_SOL);
    };

    useEffect(() => {
        if (wallet.publicKey) {
            getUserData();

            connection.onAccountChange(wallet.publicKey, (e) => {
                getUserData();
            });
        }
    }, [wallet.connected, wallet.publicKey]);

    return (
        <>
            {popup.show ? <Popup /> : null}
            <div className="flex h-screen w-screen bg-[#171649] text-light">
                <AnimatePresence className="md:hidden ">
                    {sidebarOpen && (
                        <motion.div className="absolute top-0 left-0 z-30 flex h-screen w-screen">
                            <motion.div
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 100,
                                }}
                                exit={{
                                    opacity: 0,
                                }}
                                onClick={cycleSidebarOpen}
                                className="absolute top-0 left-0 flex h-screen w-screen bg-[#1E1E1E] bg-opacity-20 backdrop-blur-sm"
                            ></motion.div>
                            <motion.aside
                                initial={{
                                    transform: "translateX(-100%)",
                                    transition: {
                                        duration: 0.2,
                                        ease: "linear",
                                    },
                                }}
                                animate={{
                                    transform: "translateX(0%)",
                                    transition: {
                                        duration: 0.3,
                                        ease: "easeOut",
                                    },
                                }}
                                exit={{
                                    transform: "translateX(-100%)",
                                    transition: {
                                        duration: 0.2,
                                        ease: "linear",
                                    },
                                }}
                                className="w-[260px] min-w-[260px] max-w-[260px]"
                            >
                                <Sidebar
                                    isNoticeModal={isNoticeModal}
                                    setIsNoticeModal={setIsNoticeModal}
                                    sidebarOpen={sidebarOpen}
                                    cycleSidebarOpen={cycleSidebarOpen}
                                    isMobileChat={isMobileChat}
                                    setIsMobileChat={setIsMobileChat}
                                    balance={balance}
                                    publicKey={wallet.publicKey}
                                />
                            </motion.aside>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="hidden w-[260px] min-w-[260px] max-w-[260px] md:block">
                    <Sidebar
                        isNoticeModal={isNoticeModal}
                        sidebarOpen={sidebarOpen}
                        setIsNoticeModal={setIsNoticeModal}
                        cycleSidebarOpen={cycleSidebarOpen}
                        isMobileChat={isMobileChat}
                        setIsMobileChat={setIsMobileChat}
                        balance={balance}
                        publicKey={wallet.publicKey}
                    />
                </div>
                <div className="flex h-screen w-full flex-col">
                    <Topbar cycleSidebarOpen={cycleSidebarOpen} />
                        <TopHeader
                            balance={balance}
                            wallet={wallet}
                            publicKey={wallet.publicKey}
                            isNoticeModal={isNoticeModal}
                            setIsNoticeModal={setIsNoticeModal}
                        />
                    <div className="relative mt-0 flex h-full w-full overflow-hidden md:mt-[84px]">
                        <Outlet />
                        {children}
                    </div>
                </div>
            </div>
            <NotificationAndNewsDialog
                modalIsOpen={isNoticeModal}
                closeModal={() => setIsNoticeModal(false)}
            />

            {isMobileChat && (
                <div className="fixed left-0 top-0 z-[500]">
                    <Chat
                        isMobile={isMobileChat}
                        setIsMobile={setIsMobileChat}
                        className="relative flex h-[100vh] w-[100vw] flex-col overflow-y-scroll scroll-smooth rounded-[0px] bg-[#25244E] shadow-lg transition scrollbar-hide"
                    />
                </div>
            )}
        </>
    );
};

export default Frame;
