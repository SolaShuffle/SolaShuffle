import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/user";
import CoinIcon from "../components/CoinIcon";
import ProfileAvatar from "../components/ProfileAvatar";
import { DiscordIcon } from "./assets/CustomIcons";
import { useWallet } from "@solana/wallet-adapter-react";
import Skeleton from "../components/Skeleton";

const TopHeader = ({ publicKey, balance }) => {

    const wallet = useWallet();
    const userQuery = useQuery({
        queryKey: ["user", wallet.connected, wallet.publicKey],
        queryFn: () => getUser(publicKey)
    })

    return (
        <div className="fixed hidden w-[calc(100%-260px)] bg-[#35356B] py-[21px] px-8 md:block">
            <div className="flex items-center justify-end ">
                
                <div className="flex items-center">
                    {/* 
                    <button
                        className="group hidden h-11 w-11 items-center justify-center rounded-xl border-[2.5px] border-[#49487C] hover:mt-0.5 hover:h-[42px] hover:border-0 hover:bg-btn-gradient-1 hover:shadow-btn-top-border md:flex"
                        onClick={() => setIsNoticeModal(true)}
                    >
                        <BellIcon className="group-hover:-mt-0.5 group-hover:[&>*]:fill-white" />
                    </button> 
                    */}
                    {publicKey && (
                        <>
                            <div className="ml-[22px]">
                                {userQuery.isLoading ?
                                    <Skeleton className={"w-20 h-4"} />
                                    :
                                    <>
                                        {!userQuery.isSuccess && userQuery.data ?
                                            <p className="font-[600]">
                                                {publicKey.toBase58().slice(0, 3)}...
                                                {publicKey.toBase58().slice(-3)}
                                            </p>
                                            :
                                            <p className="font-[600]">
                                                {
                                                    userQuery.data?.name === "" &&
                                                    publicKey.toBase58().slice(0, 3) + "..." + publicKey.toBase58().slice(-3)
                                                }
                                                {userQuery.data?.name !== "" &&
                                                    userQuery.data?.name
                                                }
                                            </p>
                                        }
                                    </>
                                }

                                <div className="flex items-center justify-center">
                                    <span className="ml-1 text-[10px] font-[600] leading-[22px]">
                                        {balance.toFixed(2)} SOL
                                    </span>
                                </div>
                            </div>
                            <div className="ml-[18px]">
                                <ProfileAvatar
                                    size={"small"}
                                    publicKey={publicKey}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopHeader;
