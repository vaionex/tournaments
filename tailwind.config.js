/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		screens: {
			'xs': '375px',
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		},
		extend: {
			colors: {
				'slate-deep': '#0f172a',
			},
			fontFamily: {
				sans: ['Inter', 'Geist', 'system-ui', 'sans-serif'],
			},
			backdropBlur: {
				xs: '2px',
			}
		}
	},
	plugins: []
};
