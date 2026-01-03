/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
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

