/** @type {import(tailwindcss).Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			sm: "640px",
			// => @media (min-width: 640px) { ... }

			md: "768px",
			// => @media (min-width: 768px) { ... }

			md2: "896px",
			// => @media (min-width: 896px) { ... }

			lg: "1024px",
			// => @media (min-width: 1024px) { ... }

			xl: "1280px",
			// => @media (min-width: 1280px) { ... }
			"1.5xl": "1348px",

			"2xl": "1536px",
			// => @media (min-width: 1536px) { ... }
		},
		extend: {
			colors: {
				primary: "#9865FF",
				mute: "#6E6FA6",
				light: "#EEEEFE",
				red: "#F85C67",
				green: "#02D0C8",
				gold: "#F3C062",
			},
			backgroundImage: {
				"btn-gradient-1": "radial-gradient(132.75% 155.27% at 31.94% -11.82%, #9186ff 0%, #6d61ff 33.87%, #574aff 91.62%)",
				"paper-gradient": "radial-gradient(87% 87% at 49.17% -0.05%, #25244e 0%, #23224f 100%)",
				"discord-gradient": "radial-gradient(132.75% 155.27% at 31.94% -11.82%, #9186ff 0%, #6d61ff 33.87%, #574aff 91.62%)",
				"twitter-gradient": "radial-gradient(132.75% 155.27% at 31.94% -11.82%, #69d9fd 0%, #52bdff 33.87%, #1da1f2 91.62%)",
				"profile-info": "radial-gradient(126.95% 111.76% at 46.24% 0%, #2e2d5a 0%, #27264e 100%), radial-gradient(87% 87% at 49.17% -0.05%, #25244e 0%, #23224f 100%)",
				"level-bar": "radial-gradient(191.08% 125.83% at 26.69% 10%, #56fffa 2.08%,#00dfd9 26.92%, #00d0cb 46.85%, #00c278 91.62%)"
			},
			boxShadow: {
				"btn-top-border": "rgb(0 0 0 / 9%) 0px 13.137px 21.895px, 0px -2px 0 #8e84ff",
				"paper-top-border": "0 -2px 0 #2f2e5f",
				"discord": "0 -2px 0px #8f85ff",
				"twitter": "0 -2px 0px #68d8fd",
				"profile-info": "5.57998px solid #2f2e5f",
				"level-bar": "0px 15.364px 25.6067px rgba(0, 0, 0, 0.09)",
				"simple-shadow": "0px 3px 3px rgba(0, 0, 0, 0.16)"
			}
		},
	},

	plugins: [
		require("tailwind-scrollbar-hide"),
		// ...
	],
};
