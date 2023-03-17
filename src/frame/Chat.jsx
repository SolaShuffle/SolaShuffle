import { useWallet } from "@solana/wallet-adapter-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { shortenAddress } from "../util/util";
import BadWordsFilter from "bad-words";

import Union from "./assets/union.svg";

const Message = ({ type, value, publicKey, discord, style }) => {
    const { user } = useContext(UserContext);

    const [imgError, setImgError] = useState(false);

    return (
        <div style={style} className={`flex rounded-xl py-3 px-4`}>
            <div
                style={{
                    color: `${base58ToColor(publicKey).hex}`,
                }}
                className="mr-4"
            >
                {discord && discord.id && discord.avatar && !imgError ? (
                    <img
                        onError={() => {
                            setImgError(true);
                        }}
                        className="h-9 w-9 rounded-full"
                        src={`https://cdn.discordapp.com/avatars/${discord.id}/${discord.avatar}.png`}
                        alt=""
                    />
                ) : (
                    <svg
                        height="32"
                        width="32"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm7.49,18.24a9.75,9.75,0,0,1-15,0,.23.23,0,0,1,0-.21.26.26,0,0,1,.12-.17,33.79,33.79,0,0,1,4-1.67l.68-.25c.21-.07.38-.34.47-.72a2.19,2.19,0,0,0-.24-1.75c-.84-.93-1.66-2.07-1.66-4.92A4,4,0,0,1,12,4.15a4,4,0,0,1,4.14,4.4c0,2.85-.82,4-1.66,4.92a2.15,2.15,0,0,0-.25,1.75,1,1,0,0,0,.48.72l.67.25a33.11,33.11,0,0,1,4,1.67.26.26,0,0,1,.12.17A.23.23,0,0,1,19.49,18.24Z"
                        ></path>
                    </svg>
                )}
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-semibold text-light">
                    {shortenAddress(publicKey)}
                </span>
                <p className="mt-1 text-sm font-medium text-mute">{value}</p>
            </div>
        </div>
    );
};

import People from "./assets/people.svg";

import "./sidebar.css";
import { base58ToColor } from "../util/color";
import base58 from "bs58";
import { useIsInViewport } from "../util/hooks";
import { UserContext } from "../Context";
import { ArrowLeft } from "./assets/CustomIcons";

const Chat = ({ isMobile, setIsMobile, className }) => {
    const wallet = useWallet();

    const { user, setUser } = useContext(UserContext);


	// Use filter to remove bad words
	const filter = new BadWordsFilter();

	const [messages, setMessages] = useState([]);
	const [myMessage, setMyMessage] = useState("");
	const bottomRef = useRef(null);
	const scrollRef = useRef(null);


    const messageHandler = async (e) => {
        const msg = e.data;
        if (msg === undefined) {
            return;
        }

		const data = JSON.parse(msg);
		switch (data.type) {
			case "message":
				setMessages((prevData) => {
					let clone = [...prevData];
					if (clone.length > 50) {
						clone.shift();
					}
					// filter can fail with weird characters, so we wrap it in a try catch
					try {
						// Remove links
						const regex = /(https?:\/\/[^\s]+)/g;
						// Filter bad words
						data.value = filter.clean(
							data.value.replace(regex, "*")
						);
					} catch (e) {}
					clone.push(data);
					return clone;
				});
				break;
			case "warning":
				setMessages((prevData) => {
					let clone = [...prevData];
					clone.push(data);
					return clone;
				});
				break;
		}
	};


    const ws = useRef(null);

    useEffect(() => {
        const websocket = new WebSocket(`${import.meta.env.VITE_WS}/chat`);
        websocket.onclose = () => console.log("ws closed");
        websocket.onmessage = messageHandler;

        ws.current = websocket;

        const interval = setInterval(() => {
            websocket.send(
                JSON.stringify({
                    type: "heartbeat",
                    value: "ping",
                })
            );
        }, 5000);

        return () => {
            websocket.close();
            clearInterval(interval);
        };
    }, []);

    const send = async (message) => {
        console.log(user.chatSignature);
        if (!user.chatSignature) {
            try {
                const data = new TextEncoder().encode(
                    `solanashuffle chat ${wallet.publicKey.toBase58()}`
                );
                const signatureBytes = await wallet.signMessage(data);
                const signature = base58.encode(signatureBytes);
                setUser((prevData) => ({
                    ...prevData,
                    chatSignature: signature,
                }));
                ws.current.send(
                    JSON.stringify({
                        type: "message",
                        value: message,
                        publicKey: wallet.publicKey.toBase58(),
                        signature: signature,
                    })
                );
                setMyMessage("");
                return;
            } catch { }
        }
        ws.current.send(
            JSON.stringify({
                type: "message",
                value: message,
                publicKey: wallet.publicKey.toBase58(),
                signature: user.chatSignature,
            })
        );

        setMyMessage("");
    };

    useEffect(() => {
        console.log(bottomRef.current.offsetTop);
        if (bottomRef && bottomRef.current) {
            scrollRef.current.scrollTop = bottomRef.current.offsetTop;
            //bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div
            ref={scrollRef}
            className={` ${className
                ? className
                : "relative flex w-full max-w-[288px] flex-col overflow-y-scroll scroll-smooth rounded-3xl bg-[#25244E] shadow-lg transition scrollbar-hide"
                }`}
        >
            <div
                style={{
                    borderTopLeftRadius: isMobile ? 0 : "24px",
                    borderTopRightRadius: isMobile ? 0 : "24px",
                }}
                className={`sticky top-0 left-0 flex ${isMobile ? "min-h-[88px]" : "min-h-[96px]"
                    } w-full flex-col justify-center border-b-2 border-[#393869] bg-[#2F2E5F] bg-opacity-70 px-6 backdrop-blur-md`}
            >
                <button
                    className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl border-[2.5px] border-[#49487C] md:hidden"
                    onClick={() => setIsMobile(false)}
                >
                    <ArrowLeft />
                </button>
                {!isMobile ? (
                    <>
                        <div className="flex items-center">
                            <div className="grid h-6 w-6 place-content-center">
                                <img
                                    className="mb-auto h-[21px] w-[21px]"
                                    src={People}
                                    alt=""
                                />
                            </div>

                            <span className="ml-3 mb-auto text-sm font-extrabold uppercase">
                                Chat Room
                            </span>
                        </div>
                        <div className="flex items-center">
                            <div className="grid h-6 w-6 place-content-center">
                                <div className="greenGradient h-3 w-3 rounded-full"></div>
                            </div>
                            <span className="ml-3 text-sm font-semibold">
                                {user.onlinePlayers ? user.onlinePlayers : 0} Players online
                            </span>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center">
                        <div className="flex items-center">
                            <div className="grid h-6 w-6 place-content-center">
                                <img className="h-[21px] w-[21px]" src={People} alt="" />
                            </div>

                            <span className="ml-3 text-sm font-extrabold uppercase text-light">
                                Chat Room
                            </span>
                        </div>
                        <div className="ml-5 flex items-center">
                            <div className="grid place-content-center">
                                <div className="greenGradient h-3 w-3 rounded-full"></div>
                            </div>
                            <span className="ml-[14px] text-sm font-semibold text-light">
                                {user.onlinePlayers ? user.onlinePlayers : 0} Players online
                            </span>
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-auto flex flex-col gap-2 px-2 py-2">
                {messages.map((m, i) => {
                    return (
                        <Message
                            {...m}
                            key={i}
                            style={(() => {
                                if (i % 2 === 0) {
                                    return {
                                        background: "linear-gradient(0deg, #1D1C3F, #1D1C3F)",
                                        boxShadow:
                                            "inset 0px 4.15399px 7.26947px rgba(0, 0, 0, 0.15)",
                                    };
                                }
                                return {};
                            })()}
                        />
                    );
                })}
            </div>
            <div ref={bottomRef}></div>
            <div
                className="sticky bottom-0 left-0 min-h-[58px] border-t-2
				border-[#2F2E5F] bg-[#25244E]"
            >
                <div className="flex h-[58px] w-full items-center bg-[#1D1C3F] bg-opacity-50 px-5">
                    <input
                        className="ring-none h-full appearance-none border-none
						bg-transparent font-semibold text-light 
						placeholder-light outline-none disabled:placeholder:text-[#555]"
                        type="text"
                        disabled={!wallet.publicKey}
                        placeholder={
                            wallet.publicKey ? "Send a message..." : "Connect your wallet"
                        }
                        value={myMessage}
                        onChange={(e) => {
                            setMyMessage(e.target.value);
                        }}
                        onKeyDown={async (event) => {
                            if (event.key === "Enter") {
                                send(myMessage);
                            }
                        }}
                    />
                    <button
                        className="ml-auto"
                        disabled={!wallet.publicKey}
                        onClick={() => {
                            send(myMessage);
                        }}
                    >
                        <img className="h-5 w-5" src={Union} alt="" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
