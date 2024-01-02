import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./modules/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#5251D3',
				'primary-light': '#D3D4EC',
				'primary-muted': '#4C475F',
				secondary: '#190E44',
				danger: '#f06264',
				success: '#8ad663',
				warning: '#ffc107',
				info: '#5ca8f0',
				light: '#f7f7f7',
				dark: '#1e1e1e',
				black: '#000000',
				white: 'white',
				muted: '#DCDCDC',
			},
			backgroundImage: {
				'gradient-radial':
					'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [],
}
export default config
