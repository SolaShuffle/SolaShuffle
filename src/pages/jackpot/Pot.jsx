import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getRoom } from "../../api/room";
import TokenLogo from "../../components/TokenLogo";
import { base58ToColor } from "../../util/color";
import { formatToken, shortenAddress, solToken } from "../../util/util";

import solana from "./assets/solana.svg";

const User = ({ publicKey, value, profile }) => {
	const color = base58ToColor(publicKey).hex;
	const [imgError, setImgError] = useState(false);

	const { roomID } = useParams();

	const roomQuery = useQuery({
		queryKey: ["room", roomID],
		queryFn: () => getRoom(roomID),
	});

	return (
		<div
			style={{
				boxShadow: "inset 0px 4.50668px 7.88669px rgba(0, 0, 0, 0.15)",
			}}
			className="flex h-9 items-center rounded-full bg-[#201F48] p-1"
		>
			{profile.discord &&
			profile.discord.id &&
			profile.discord.avatar &&
			!imgError ? (
				<img
					onError={() => {
						setImgError(true);
					}}
					className="h-7 w-7 rounded-full"
					src={`https://cdn.discordapp.com/avatars/${profile.discord.id}/${profile.discord.avatar}.png`}
					alt=""
				/>
			) : (
				<svg
					height="28"
					width="28"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<path
						fill={color}
						d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm7.49,18.24a9.75,9.75,0,0,1-15,0,.23.23,0,0,1,0-.21.26.26,0,0,1,.12-.17,33.79,33.79,0,0,1,4-1.67l.68-.25c.21-.07.38-.34.47-.72a2.19,2.19,0,0,0-.24-1.75c-.84-.93-1.66-2.07-1.66-4.92A4,4,0,0,1,12,4.15a4,4,0,0,1,4.14,4.4c0,2.85-.82,4-1.66,4.92a2.15,2.15,0,0,0-.25,1.75,1,1,0,0,0,.48.72l.67.25a33.11,33.11,0,0,1,4,1.67.26.26,0,0,1,.12.17A.23.23,0,0,1,19.49,18.24Z"
					></path>
				</svg>
			)}
			<span
				style={{
					color,
				}}
				className="ml-1.5 text-sm font-medium"
			>
				{shortenAddress(publicKey)}
			</span>
			<span className="ml-auto mr-4 flex items-center text-sm font-semibold">
				{roomQuery.isSuccess && (
					<>
						<TokenLogo
							className="mr-2 h-4 w-4"
							ticker={roomQuery.data.token.ticker}
						/>
						{formatToken(value, roomQuery.data.token)}
					</>
				)}
			</span>
		</div>
	);
};

const Pot = () => {
	const { roomID } = useParams();

	const roomQuery = useQuery({
		queryKey: ["room", roomID],
		queryFn: () => getRoom(roomID),
	});

	if (
		roomQuery.isError ||
		roomQuery.isLoading ||
		roomQuery.data.session.users.length === 0
	) {
		return (
			<div className="flex w-full rounded-3xl border-2 border-[#2F2E5F] bg-[#25244E] p-4">
				<span className="m-auto text-sm font-semibold text-mute sm:text-base">
					Noone has entered this room yet... Be the first! :{")"}
				</span>
			</div>
		);
	}

	return (
		<div className="grid w-full grid-cols-1 gap-x-8 gap-y-4 rounded-3xl border-2 border-[#2F2E5F] bg-[#25244E] p-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
			{roomQuery.isError || roomQuery.isLoading
				? null
				: roomQuery.data.session.users.map((user) => {
						return <User {...user} key={user.publicKey} />;
				  })}
		</div>
	);
};

export default Pot;
