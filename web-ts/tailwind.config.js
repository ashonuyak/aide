import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			desktop: { max: '1920px' },
			laptopxl: { max: '1440px' },
			laptop: { max: '1040px' },
			tablet: { max: '768px' },
			mobile: { max: '490px' },
			...defaultTheme.screens
		},
		colors: {
			primary: '#1d1d1b',
			secondary: '#4E4FEB',
			light: '#068FFF',
			background: '#EEEEEE',
			blue: '#006ce7',
			chocolate: '#160F0F'
		},
		fontFamily: {
			sans: ['inter-regular', 'sans-serif'],
			serif: ['inter-regular', 'serif'],
			semibold: ['inter-semibold', 'sans-serif'],
			medium: ['inter-medium', 'sans-serif']
		},
		extend: {}
	},
	plugins: []
};
