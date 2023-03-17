import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useId, useState } from "react";
import { useParams } from "react-router";
// import Skeleton from "react-loading-skeleton";
import { changeName, getUser } from "../../api/user";
import GameHistory from "../../components/profile/GameHistory";
import ProfileAvatar from "../../components/ProfileAvatar";
import { CheckIconTwo, PenIcon } from "../../frame/assets/CustomIcons";
import Chat from "../../frame/Chat";
import bg from "./assets/bg.png";
import Wagered from "../../components/Wagered";
import Skeleton from "../../components/Skeleton";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const ProfileMVP = () => {
    const { publicKey } = useParams();
    const wallet = useWallet();
    const { connection } = useConnection();

    const [editUsername, setEditUsername] = useState("");
    const [isUsernameEdit, setIsUsernameEdit] = useState(false);

    const userQuery = useQuery({
        queryKey: ["user", publicKey],
        queryFn: () => getUser(publicKey)
    })

    const name = useMemo(() => {
        if (!userQuery.isSuccess || userQuery.data?.name === "") {
            return publicKey.slice(0, 3) + "..." + publicKey.slice(-3)
        } else {
            return userQuery.data.name
        }
    }, [publicKey, userQuery]);

    const totalGames = useMemo(() => {
        if (!userQuery.isSuccess || userQuery.data.stats === undefined) {
            return 0
        } else {
            return userQuery.data.stats?.totalGames
        }
    }, [publicKey, userQuery]);

    const totalWin = useMemo(() => {
        if (!userQuery.isSuccess || userQuery.data.stats === undefined || userQuery.data.stats.totalWin === 0) {
            return 0
        } else {
            return userQuery.data.stats?.totalWin / userQuery.data.stats?.totalGames
        }
    }, [publicKey, userQuery]);

    const totalLoss = useMemo(() => {
        if (!userQuery.isSuccess || userQuery.data.stats === undefined || userQuery.data.stats.totalWin === 0) {
            return 0
        } else {
            return userQuery.data.stats?.totalLoss / userQuery.data.stats?.totalGames
        }
    }, [publicKey, userQuery]);


    const handleUsername = (name) => {
        setEditUsername(name);
    };

    const onChangeName = async () => {
        if (wallet.publicKey) {
            try {
                const res = await changeName(wallet.publicKey, editUsername);
                setIsUsernameEdit(false);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        if (wallet.publicKey) {
            connection.onAccountChange(wallet.publicKey, (e) => {
                getUserData(wallet.publicKey.toBase58());
            });
        }
    }, [publicKey, wallet.publicKey]);

    return (
        <div
            className="relative flex w-full flex-row overflow-y-scroll bg-center bg-no-repeat py-5 pb-20 lg:p-8"
            style={{
                background: `url(${bg}) 0% 0% / cover no-repeat`,
            }}
        >
            <div className="flex w-full flex-col gap-5 px-5 lg:gap-8">
                {/* Profile banner info beginning */}
                <div className="relative rounded-[36px]">
                    <img
                        src="https://solscan.io/static/media/banner-header-1.c1e47687b38c8afc4f948ebd7004acf8.svg"
                        className="-mb-9 h-[234px] w-full rounded-t-[36px] object-cover"
                        alt=""
                    />
                    <div className="relative rounded-[36px] bg-profile-info pt-[60px] pb-6 shadow-profile-info">
                        {/* for mobile location and social links beginning */}
                        <div className="absolute left-0 top-0 flex w-full items-center justify-between px-6 pt-6 lg:hidden">
                            <div className="text-center">
                            </div>
                        </div>
                        {/* for mobile location and social links end */}
                        <div className="absolute left-1/2 z-10 -translate-x-1/2 -translate-y-[172px]">
                            <ProfileAvatar
                                publicKey={publicKey}
                            />
                        </div>
                        <div className="relative flex flex-col-reverse flex-wrap items-center justify-between px-10 lg:flex-row">
                            <div className="flex w-full lg:w-1/3">
                                <div className="w-1/3 border-r-2 border-[#393869] px-0 text-center lg:w-auto lg:pr-9">
                                    <label className="whitespace-nowrap text-[12px] leading-[17px] text-[#6E6FA6]">
                                        Total Game
                                    </label>
                                    <h4 className="text-[24px] font-semibold leading-[35px] text-[#eee]">
                                        {!userQuery.isLoading ?
                                            totalGames
                                            :
                                            <Skeleton className="mx-auto mt-2 h-6 w-12" />
                                        }
                                    </h4>
                                </div>
                                <div className="w-1/3 border-r-2 border-[#393869] px-0 text-center lg:px-0">
                                    <label className="text-[12px] leading-[17px] text-[#6E6FA6]">
                                        Win
                                    </label>
                                    <h4 className="text-[24px] font-semibold leading-[35px] text-[#eee]">
                                        {!userQuery.isLoading ?
                                            totalWin
                                            :
                                            <Skeleton className="mx-auto mt-2 h-6 w-12" />
                                        }<span className="text-[14px]">%</span>
                                    </h4>
                                </div>
                                <div className="w-1/3 px-0 text-center lg:w-auto lg:pl-9">
                                    <label className="text-[12px] leading-[17px] text-[#6E6FA6]">
                                        Loss
                                    </label>
                                    <h4 className="text-[24px] font-semibold leading-[35px] text-[#eee]">
                                        {!userQuery.isLoading ?
                                            totalLoss
                                            :
                                            <Skeleton className="mx-auto mt-2 h-6 w-12" />
                                        }<span className="text-[14px]">%</span>
                                    </h4>
                                </div>
                            </div>
                            <div className="mb-6 flex w-full -translate-y-0 flex-col items-center lg:mb-0 lg:w-1/3 lg:-translate-y-3">
                                <h2 className="text-[30px] font-semibold leading-[43px]">
                                    {!userQuery.isLoading ? (
                                        name
                                    ) : (
                                        <Skeleton className={"mx-auto mt-2 h-7 w-20"} />
                                    )}
                                </h2>
                                {userQuery.isSuccess && wallet.publicKey?.toBase58() === publicKey && (
                                    <div className="flex items-center justify-center text-center">
                                        {!isUsernameEdit && (
                                            <>
                                                <p className="text-semibold mr-3 text-[14px] text-[#6E6FA6]">
                                                    Change Name
                                                </p>
                                                <button
                                                    className="flex h-[22px] w-[22px] items-center justify-center rounded-full border bg-[#49487C]"
                                                    onClick={() => setIsUsernameEdit(true)}
                                                >
                                                    <PenIcon />
                                                </button>
                                            </>
                                        )}
                                        {isUsernameEdit && (
                                            <div
                                                className="relative -mb-[18px] h-10 w-[196px] rounded-[10px] bg-[#393869]"
                                                style={{
                                                    boxShadow:
                                                        "inset 0px 4.15399px 7.26947px rgba(0, 0, 0, 0.15)",
                                                }}
                                            >
                                                <input
                                                    value={editUsername}
                                                    type="text"
                                                    onChange={(e) => handleUsername(e.target.value)}
                                                    className="h-10 rounded-[10px] bg-transparent outline-none placeholder:text-[14px] placeholder:font-semibold placeholder:text-[#6E6FA6]"
                                                    placeholder="Change Name"
                                                />
                                                <button
                                                    className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-lg"
                                                    style={{
                                                        background:
                                                            "radial-gradient(132.75% 155.27% at 31.94% -11.82%, #9186FF 0%, #6D61FF 33.87%, #574AFF 91.62%)",
                                                    }}
                                                    onClick={onChangeName}
                                                >
                                                    <CheckIconTwo />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="hidden w-1/3 justify-end lg:flex ">
                            </div>
                        </div>
                    </div>
                </div>
                {/* Profile banner info end */}

                <div className="flex flex-wrap items-baseline gap-6">
                    <Wagered
                        className={
                            "w-full rounded-[30px] bg-paper-gradient p-6  shadow-paper-top-border backdrop-blur-md 2xl:w-[360px]"
                        }
                        publicKey={publicKey}
                    />
                    <GameHistory
                        publicKey={publicKey}
                        className={"w-full 2xl:w-[calc(100%-384px)]"}
                    />
                </div>
            </div>

            <div className="sticky right-0 top-0 z-10 ml-5 hidden h-full min-w-[288px] lg:ml-8 xl:flex">
                <Chat />
            </div>
        </div>
    );
};

export default ProfileMVP;
