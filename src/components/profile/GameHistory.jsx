import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { getUserHistory } from "../../api/user";
import {
	CircleArrowLeftIcon,
	CircleArrowRightIcon,
	HistoryIcon,
} from "../../frame/assets/CustomIcons";
import CoinIcon from "../CoinIcon";
import Skeleton from "../Skeleton";

export default function GameHistory({ className }) {
	const { publicKey } = useParams();
	const [filterTab, setFilterTab] = useState("all-time");
	const [pageNum, setPageNum] = useState(0);

	const filterName = useMemo(() => {
		switch (filterTab) {
			case "all-time":
				return "All Time";
			case "week":
				return "Week";
			case "month":
				return "Month";
			default:
				return "All Time";
		}
	}, [filterTab]);

	const historyQuery = useQuery({
		queryKey: ["history", pageNum, publicKey],
		queryFn: () => getUserHistory(publicKey, pageNum),
	});

	const rooms = useMemo(() => {
		let list = [];
		if (historyQuery.isSuccess && historyQuery.data.rooms) {
			for (let item of Object.values(historyQuery.data.rooms)) {
				list.push({
					roomId: item.id,
					name: item.name,
					coverImage: item.coverImage,
				});
			}
		}
		return list;
	}, [publicKey, historyQuery, pageNum]);

	const userHistory = useMemo(() => {
		let list = [];
		if (historyQuery.isSuccess && historyQuery.data.rooms) {
			for (let item of historyQuery.data.sessions) {
				const betAmount = item.users
					.find((user) => user.publicKey === publicKey)
					.assets.reduce(
						(accumulator, currentValue) => accumulator + currentValue.price,
						0
					);

				list.push({
					roomId: item.roomId,
					betAmount: betAmount / LAMPORTS_PER_SOL,
					winner: item.result.winner,
					potValue: item.value / LAMPORTS_PER_SOL,
					result: item.result.winner === publicKey,
				});
			}
		}
		return list;

	}, [publicKey, historyQuery, pageNum]);

	const handlePrev = () => {
		let num = pageNum;
		if (num > 0) {
			num--;
			setPageNum(num);
		}
	};
	const handleNext = () => {
		let num = pageNum;
		if (userHistory.length === 20) {
			num++;
			setPageNum(num);
		}
	};

	return (
		<div
			className={`rounded-[30px] bg-paper-gradient shadow-paper-top-border backdrop-blur-md mb-20 ${className ? className : ""
				}`}
		>
			<div className="relative flex w-full items-center justify-between border-b-2 border-[#393869] p-6 pb-6 text-[22.8px] font-[800] uppercase">
				<div className="flex items-center">
					<HistoryIcon />
					<span className="ml-4">game history</span>
					<div className="absolute right-6 top-6 flex ">
						<span className="text-[14px] font-normal mr-2">{pageNum * 20 + 1} - {pageNum * 20 + userHistory.length}</span>
						<button className="group mr-0.5" onClick={handlePrev}>
							<CircleArrowLeftIcon />
						</button>
						<button className="group ml-0.5" onClick={handleNext}>
							<CircleArrowRightIcon />
						</button>
					</div>
				</div>
			</div>
			<div className="px-6 py-4">
				<table className="w-full border-spacing-0" cellSpacing={0}>
					<thead className="">
						<tr className="">
							<th className="w-1/4">
								<div className="-mx-[1px] rounded-l-xl border-t-[2.5px] border-b-[2.5px] border-l-[2.5px] border-[#49487C] bg-[#2B2A57] py-1.5 text-xs capitalize text-[#6e6fa6]">
									game room
								</div>
							</th>
							<th className="">
								<div className="-mx-[1px] border-y-[2.5px] border-[#49487C] bg-[#2B2A57] py-1.5 text-xs capitalize text-[#6e6fa6]">
									your bet
								</div>
							</th>
							<th className="">
								<div className="-mx-[1px] border-y-[2.5px] border-[#49487C] bg-[#2B2A57] py-1.5 text-xs capitalize text-[#6e6fa6]">
									pot value
								</div>
							</th>
							<th className="">
								<div className="-mx-[1px] rounded-r-xl border-y-[2.5px] border-[#49487C] bg-[#2B2A57] py-1.5 text-xs capitalize text-[#6e6fa6]">
									result
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						{userHistory.map((item, key) => (
							<tr className="" key={key}>
								<td className="" align="center">
									<div className="mt-1 -mr-0.5 flex h-10 items-center justify-center rounded-l-xl bg-[#2B2A57] px-0 md:px-9">
										<span className="ml-2 text-sm text-[11px] font-semibold capitalize md:text-[14px] whitespace-nowrap">
											{rooms.find((room) => room.roomId === item.roomId).name}
										</span>
									</div>
								</td>
								<td className="" align="center">
									<div className="-mx-0.5 mt-1 flex h-10 items-center justify-center bg-[#2B2A57]">
										<CoinIcon coin={"sol"} className="h-4 w-4" />
										<span className="ml-1 md:ml-2 text-[11px] font-semibold text-[#6E6FA6] md:text-[14px]">
											{item.betAmount.toFixed(2)} SOL
										</span>
									</div>
								</td>
								{/* text-sm font-semibold text-[#6E6FA6] */}
								<td className="" align="center">
									<div className="-mx-0.5 flex h-10 items-center justify-center bg-[#2B2A57] pr-2 mt-1">
										<CoinIcon coin={"sol"} className="h-4 w-4" />
										<span className="ml-1 md:ml-2 text-[11px] font-semibold md:text-[14px]">
											{item.potValue.toFixed(2)} SOL
										</span>
									</div>
								</td>
								<td className="" align="center">
									<div className="flex h-10 items-center justify-end rounded-r-xl bg-[#2B2A57] mt-1 pr-2 md:justify-center">
										<span
											className={`ml-2 text-[11px] font-semibold md:text-[14px] whitespace-nowrap text-${item.result ? "[#5eff60]" : "red"
												}`}
										>
											{item.result ? "Win" : "Loss"}
										</span>
									</div>
								</td>
							</tr>
						))}

						{historyQuery.isLoading &&
							[1, 2, 3, 4, 5, 6].map((item, key) => (

								<tr className="" key={key}>
									<td className="" align="center">
										<div className="mt-1 -mr-0.5 flex h-10 items-center justify-center rounded-l-xl bg-[#2B2A57] px-0 md:px-9">
											<Skeleton className={"h-3 w-1/4"} />
										</div>
									</td>
									<td className="" align="center">
										<div className="-mx-0.5 mt-1 flex h-10 items-center justify-center bg-[#2B2A57]">
											<Skeleton className={"h-3 w-1/4"} />
										</div>
									</td>
									{/* text-sm font-semibold text-[#6E6FA6] */}
									<td className="" align="center">
										<div className="-mx-0.5 flex h-10 items-center justify-center bg-[#2B2A57] pr-2 mt-1">
											<Skeleton className={"h-3 w-1/4"} />
										</div>
									</td>
									<td className="" align="center">
										<div className="flex h-10 items-center justify-end rounded-r-xl bg-[#2B2A57] mt-1 pr-2 md:justify-center">
											<Skeleton className={"h-3 w-1/4"} />
										</div>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
