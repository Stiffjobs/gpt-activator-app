/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],

	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#ECE1C2',
					secondary: '#FFF6E1',
					accent: '#F6F5EE',
					neutral: '#4F4638',
					'base-100': '#F1F1EF',
					info: '#D6D3D1',
					success: '#A3E635',
					warning: '#7C2D12',
					error: '#DC2626',
				},
			},
		],
	},
	plugins: [require('daisyui')],
};
