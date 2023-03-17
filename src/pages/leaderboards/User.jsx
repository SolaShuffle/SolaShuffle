import React, { useState } from "react";
import { base58ToColor } from "../../util/color";
import {
	currentFormatTime,
	formatToken,
	shortenAddress,
	solToken,
} from "../../util/util";

const User = ({ skeleton, discord, publicKey, stats, amount, rank }) => {
	const [imgError, setImgError] = useState(false);

	if (!publicKey) {
		return null;
	}

	if (skeleton) {
		return null;
	}

	return (
		<div className="flex min-h-[36px] w-full items-center rounded-lg px-4 text-left text-xs sm:min-h-[52px] sm:text-sm">
			<span className="mr-1 w-4 text-left font-semibold text-mute lg:mr-3">
				{rank + 1}.
			</span>
			<div className="mr-auto flex items-center">
				<div className="rounded-full">
					{discord ? (
						discord.avatar && !imgError ? (
							<img
								onError={() => {
									setImgError(true);
								}}
								className="w-h-[24px] h-[24px] rounded-full"
								src={`https://cdn.discordapp.com/avatars/${discord.id}/${discord.avatar}.png`}
								alt=""
							/>
						) : (
							<div
								style={{
									color: base58ToColor(publicKey).hex,
								}}
								className="w-h-[24px] h-[24px] rounded-full"
							>
								<svg
									height="24"
									width="24"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
								>
									<path
										fill="currentColor"
										d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm7.49,18.24a9.75,9.75,0,0,1-15,0,.23.23,0,0,1,0-.21.26.26,0,0,1,.12-.17,33.79,33.79,0,0,1,4-1.67l.68-.25c.21-.07.38-.34.47-.72a2.19,2.19,0,0,0-.24-1.75c-.84-.93-1.66-2.07-1.66-4.92A4,4,0,0,1,12,4.15a4,4,0,0,1,4.14,4.4c0,2.85-.82,4-1.66,4.92a2.15,2.15,0,0,0-.25,1.75,1,1,0,0,0,.48.72l.67.25a33.11,33.11,0,0,1,4,1.67.26.26,0,0,1,.12.17A.23.23,0,0,1,19.49,18.24Z"
									></path>
								</svg>{" "}
							</div>
						)
					) : (
						<div
							style={{
								color: base58ToColor(publicKey).hex,
							}}
							className="h-10 w-10 rounded-full"
						>
							<svg
								height="24"
								width="24"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
							>
								<path
									fill="currentColor"
									d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm7.49,18.24a9.75,9.75,0,0,1-15,0,.23.23,0,0,1,0-.21.26.26,0,0,1,.12-.17,33.79,33.79,0,0,1,4-1.67l.68-.25c.21-.07.38-.34.47-.72a2.19,2.19,0,0,0-.24-1.75c-.84-.93-1.66-2.07-1.66-4.92A4,4,0,0,1,12,4.15a4,4,0,0,1,4.14,4.4c0,2.85-.82,4-1.66,4.92a2.15,2.15,0,0,0-.25,1.75,1,1,0,0,0,.48.72l.67.25a33.11,33.11,0,0,1,4,1.67.26.26,0,0,1,.12.17A.23.23,0,0,1,19.49,18.24Z"
								></path>
							</svg>{" "}
						</div>
					)}
				</div>
				<span className="ml-2 w-[86px] overflow-hidden overflow-ellipsis font-semibold">
					{discord && discord.username && discord.discriminator
						? `${discord.username}#${discord.discriminator}`
						: shortenAddress(publicKey)}
				</span>
			</div>
			<span className="mx-auto hidden w-8 font-semibold text-mute sm:block">
				{stats.totalGames}
			</span>
			<span className="mx-auto w-[80px] font-semibold text-green sm:w-[96px]">
				{formatToken(amount, solToken)}
			</span>
			<span className="ml-auto w-8 text-right font-semibold text-light">
				{stats.games && stats.games[currentFormatTime()]
					? stats.games[currentFormatTime()]
					: 0}
			</span>{" "}
		</div>
	);
};

export default User;
