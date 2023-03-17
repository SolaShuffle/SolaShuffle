import React from "react";

import Logo from "./assets/logo.png";
import Menu from "./assets/menu.svg";
import { Link } from "react-router-dom";
import { DiscordIcon } from "./assets/CustomIcons";

const Topbar = ({ cycleSidebarOpen }) => {
    return (
        <div className="flex h-20 w-full items-center justify-between bg-[#35356B] md:hidden">
            <Link to="/" className="flex items-center">
                <img src={Logo} alt="Solanashuffle logo" className="ml-2 h-12" />
                <span className="ml-2 text-lg font-black uppercase">Solanashuffle</span>
            </Link>
            <div className="flex items-center justify-end">
                <Link to="#" className="mr-2.5 grid place-content-center">
                    <button className="grid h-[42px] w-11 place-content-center rounded-xl bg-btn-gradient-1 p-0 text-[12px] font-[700] uppercase">
                        <DiscordIcon className={"-mt-0.5"} />
                    </button>
                </Link>
                <button
                    onClick={cycleSidebarOpen}
                    className="ml-auto mr-4 grid h-11
                w-11 place-content-center rounded-xl border-2 border-[#49487C]"
                >
                    <img className="h-4 w-4" src={Menu} alt="" />
                </button>
            </div>
        </div>
    );
};

export default Topbar;
