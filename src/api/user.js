import axios from "axios";

export async function getUserNFTs(publicKey) {
	if (!publicKey) {
		return [];
	}
	if (typeof publicKey.toBase58 === "function") {
		publicKey = publicKey.toBase58();
	}
	const response = await axios.get(
		`${import.meta.env.VITE_API}/nfts/${publicKey}`
	);
	return response.data;
}

export async function getMetadata(uri) {
	const response = await axios.get(uri);
	return response.data;
}

export async function getUser(publicKey) {
	if (!publicKey) {
		return [];
	}
	if (typeof publicKey.toBase58 === "function") {
		publicKey = publicKey.toBase58();
	}
	const response = await axios.get(
		`${import.meta.env.VITE_API}/user/${publicKey}`
	);
	return response.data;
}

export async function getName(publicKey) {
	if (!publicKey) {
		return [];
	}
	if (typeof publicKey.toBase58 === "function") {
		publicKey = publicKey.toBase58();
	}
	const response = await axios.get(
		`${import.meta.env.VITE_API}/user/name/${publicKey}`
	);
	return response.data;
}

export async function changeName(publicKey, name) {
	if (!publicKey) {
		return [];
	}
	if (typeof publicKey.toBase58 === "function") {
		publicKey = publicKey.toBase58();
	}
	const response = await axios.post(
		`${import.meta.env.VITE_API}/user/name/change/${publicKey}`,
		{
			name: name,
		}
	);
	return response.data;
}

export async function getImage(publicKey) {
	if (!publicKey) {
		return [];
	}
	if (typeof publicKey.toBase58 === "function") {
		publicKey = publicKey.toBase58();
	}
	const response = await axios.get(
		`${import.meta.env.VITE_API}/user/image/${publicKey}`
	);
	return response.data.image;
}

export async function changeImage(publicKey, image) {
	if (!publicKey) {
		return [];
	}
	if (typeof publicKey.toBase58 === "function") {
		publicKey = publicKey.toBase58();
	}
	const response = await axios.post(
		`${import.meta.env.VITE_API}/user/image/change/${publicKey}`,
		{
			image: image,
		}
	);
	return response.data;
}

export async function getAbout(publicKey) {
	if (!publicKey) {
		return [];
	}
	if (typeof publicKey.toBase58 === "function") {
		publicKey = publicKey.toBase58();
	}
	const response = await axios.get(
		`${import.meta.env.VITE_API}/user/about/${publicKey}`
	);
	return response.data.about;
}

export async function changeAbout(publicKey, about) {
	if (!publicKey) {
		return [];
	}
	if (typeof publicKey.toBase58 === "function") {
		publicKey = publicKey.toBase58();
	}
	const response = await axios.post(
		`${import.meta.env.VITE_API}/user/about/change${publicKey}`,
		{
			about: about,
		}
	);
	return response.data;
}

export async function getTwitter(publicKey) {
	if (!publicKey) {
		return [];
	}
	if (typeof publicKey.toBase58 === "function") {
		publicKey = publicKey.toBase58();
	}
	const response = await axios.get(
		`${import.meta.env.VITE_API}/user/twitter/${publicKey}`
	);
	return response.data.twitter;
}

export async function getBanner(publicKey) {
	if (!publicKey) {
		return [];
	}
	if (typeof publicKey.toBase58 === "function") {
		publicKey = publicKey.toBase58();
	}
	const response = await axios.get(
		`${import.meta.env.VITE_API}/user/banner/${publicKey}`
	);
	return response.data.banner;
}

export async function changeBanner(publicKey, banner) {
	if (!publicKey) {
		return [];
	}
	if (typeof publicKey.toBase58 === "function") {
		publicKey = publicKey.toBase58();
	}
	const response = await axios.post(
		`${import.meta.env.VITE_API}/user/banner/change/${publicKey}`,
		{
			banner: banner,
		}
	);
	return response.data;
}

export async function getBalance(publicKey) {
	if (!publicKey) {
		return [];
	}
	if (typeof publicKey.toBase58 === "function") {
		publicKey = publicKey.toBase58();
	}
	const response = await axios.get(
		`${import.meta.env.VITE_API}/user/balance/${publicKey}`
	);
	return response.data.balance;
}

export async function getWin(publicKey) {
	if (!publicKey) {
		return [];
	}
	if (typeof publicKey.toBase58 === "function") {
		publicKey = publicKey.toBase58();
	}
	const response = await axios.get(
		`${import.meta.env.VITE_API}/user/win/${publicKey}`
	);
	return response.data.stats.totalWin;
}

export async function getLoss(publicKey) {
	if (!publicKey) {
		return [];
	}
	if (typeof publicKey.toBase58 === "function") {
		publicKey = publicKey.toBase58();
	}
	const response = await axios.get(
		`${import.meta.env.VITE_API}/user/loss/${publicKey}`
	);
	return response.data.stats.totalLoss;
}

export async function getLevel(publicKey) {
	if (!publicKey) {
		return [];
	}
	if (typeof publicKey.toBase58 === "function") {
		publicKey = publicKey.toBase58();
	}
	const response = await axios.get(
		`${import.meta.env.VITE_API}/user/level/${publicKey}`
	);
	return response.data.stats.level.value;
}

export async function getProfile(publicKey) {
	if (!publicKey) {
		return [];
	}
	if (typeof publicKey.toBase58 === "function") {
		publicKey = publicKey.toBase58();
	}
	const response = await axios.get(
		`${import.meta.env.VITE_API}/user/profile/${publicKey}`
	);
	return response.data;
}

export async function changeLevel(publicKey, xp) {
	if (!publicKey) {
		return [];
	}
	if (typeof publicKey.toBase58 === "function") {
		publicKey = publicKey.toBase58();
	}
	const response = await axios.get(
		`${import.meta.env.VITE_API}/user/level/change/${publicKey}`,
		{
			XP: XP,
		}
	);
	return response.data;
}

export async function getUserHistory(publicKey, page) {
	if (!publicKey) {
		return [];
	}
	if (typeof publicKey.toBase58 === "function") {
		publicKey = publicKey.toBase58();
	}
	const response = await axios.get(
		`${import.meta.env.VITE_API}/user/history/${publicKey}?page=${page}`
	);
	return response.data;
}