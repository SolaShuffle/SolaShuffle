import React from "react";
import "./avatar.scss";
import {
    AvatarBackShadow,
    AvatarRightBorder,
    PenIcon,
} from "../frame/assets/CustomIcons";
import avatarLevelIcon from "./assets/profile-level.png";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import defaultAvatar from "./assets/default-avatar.png";
import { getUser } from "../api/user";
import { useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import ImageUpload from "./dialog/ImageUpload";

export default function ProfileAvatar({ size, publicKey }) {

    const wallet = useWallet();
    const [image, setImage] = useState();
    const [isModal, setIsModal] = useState(false);

    const userQuery = useQuery({
        queryKey: ["user", publicKey],
        queryFn: () => getUser(publicKey),
    });

    const avatar = useMemo(() => {
        if (!userQuery.isSuccess) {
            return defaultAvatar;
        } else if (userQuery.data.image === undefined) {
            return defaultAvatar;
        } else if (userQuery.data.image === "") {
            return defaultAvatar;
        } else {
            return userQuery.data.image;
        }
    }, [publicKey, userQuery]);

    const handleChange = () => {
        setIsModal(true);
    };

    return (
        <Link to={`/profile/${publicKey}`}>
            {size !== "small" && (
                <div className={`profile-avatar group relative w-[142px]`}>
                    {wallet.publicKey?.toBase58() === publicKey &&
                        <button
                            className="absolute -right-2 -top-2 flex h-[22px] w-[22px] items-center justify-center rounded-full border bg-[#49487C] z-50"
                            onClick={handleChange}
                        >
                            <PenIcon />
                        </button>
                    }
                    <div className="image-out relative z-10 blur-[2px]">
                        <img
                            src={avatar}
                            className="h-[128px] w-[142px] object-cover"
                            alt=""
                        />
                    </div>
                    <img
                        src={avatar}
                        className="image-inner absolute left-2 top-[7.5px] z-20 h-[112px] w-[126px] object-cover"
                        alt=""
                    />
                    <div className="absolute -right-1.5 top-[1px] z-30 opacity-0 group-hover:opacity-100">
                        <AvatarRightBorder />
                    </div>
                    <div className="bg-shadow absolute -right-10 top-0">
                        <AvatarBackShadow />
                    </div>
                    <div className="absolute left-1/2 -bottom-[45px] z-40 h-[92px] w-[108px] -translate-x-1/2 ">
                        <img src={avatarLevelIcon} alt="" />
                        <span className="absolute left-1/2 top-1/2 -mt-1 -translate-x-1/2 -translate-y-1/2 text-[19px] font-bold leading-[27px] text-white">
                            {userQuery.isSuccess && userQuery.data?.stats
                                ? userQuery.data?.stats.level.value
                                : 0}
                        </span>
                    </div>
                </div>
            )}
            {size === "small" && (
                <div className={`profile-avatar group relative h-[46px] w-[58px]`}>
                    <div className="image-out relative z-10 blur-[2px]">
                        <img
                            src={avatar}
                            className="h-[52px] w-[57px] object-cover"
                            alt=""
                        />
                    </div>
                    <img
                        src={avatar}
                        className="image-inner absolute left-[3px] top-[3px] z-20 h-[46px] w-[51px] object-cover"
                        alt=""
                    />
                    <div className="absolute -right-0.5 top-[1px] z-30 opacity-0 group-hover:opacity-100">
                        <AvatarRightBorder className="bottom-[26.5px] h-[54.4px] w-[36.8px]" />
                    </div>
                    <div className="bg-shadow absolute -right-[18px] top-0">
                        <AvatarBackShadow className="h-[67.6px] w-[57.2px]" />
                    </div>
                    <div className="absolute left-1/2 -bottom-[45px] z-40 h-[92px] w-[108px] -translate-x-1/2 ">
                        <img
                            src={avatarLevelIcon}
                            className="absolute bottom-[26.5px] left-1/2 h-[36.8px] w-[43.2px] -translate-x-1/2"
                            alt=""
                        />
                        <span className="absolute left-1/2 top-1/2 mt-[0.5px] -translate-x-1/2 -translate-y-1/2 text-[7.7px] font-bold leading-[11px] text-white">
                            {userQuery.isSuccess && userQuery.data?.stats
                                ? userQuery.data?.stats.level.value
                                : 0}
                        </span>
                    </div>
                </div>
            )}
            <ImageUpload
                image={image}
                setImage={setImage}
                closeModal={() => setIsModal(false)}
                modalIsOpen={isModal}
            />
        </Link>
    );
}
