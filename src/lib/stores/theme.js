import { writable } from 'svelte/store';

function createThemeStore() {
	const { subscribe, set, update } = writable('light');
	
	return {
		subscribe,
		toggle: () => {
			update(currentTheme => {
				const newTheme = currentTheme === 'light' ? 'dark' : 'light';
				if (typeof window !== 'undefined') {
					localStorage.setItem('theme', newTheme);
					document.documentElement.classList.toggle('dark', newTheme === 'dark');
				}
				return newTheme;
			});
		},
		init: () => {
			if (typeof window !== 'undefined') {
				const savedTheme = localStorage.getItem('theme');
				const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
				const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
				document.documentElement.classList.toggle('dark', initialTheme === 'dark');
				set(initialTheme);
			}
		}
	};
}

export const theme = createThemeStore();

