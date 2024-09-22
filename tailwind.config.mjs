/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'gray-nes': '#212529'
			}
		},
		backgroundSize: {
			'auto': 'auto',
			'cover': 'cover',
			'contain': 'contain',
			'350%': '350%',
			'170%': '170%'
		}
	},
	plugins: [
		require('tailwindcss-animated')
	],
}
