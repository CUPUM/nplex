// Here imports cannot use path alias as the module is imported in vite.config
import type { ValueOf } from 'ts-essentials';
import { themeNames, type Theme } from '../../plugins/themes/utils';

export const THEME_PALETTES = {
	light: {
		bg: {
			'000': 'hsl(54, 20%, 100%)',
			100: 'hsl(55, 20%, 97%)',
			300: 'hsl(56, 18%, 94%)',
			500: 'hsl(57, 15%, 90%)',
			700: 'hsl(59, 12%, 86%)',
			900: 'hsl(60, 11%, 81%)',
		},
		fg: {
			'000': 'hsl(140, 6%, 27%)',
			100: 'hsl(141, 7%, 22%)',
			300: 'hsl(142, 8%, 17%)',
			500: 'hsl(143, 9%, 12%)',
			700: 'hsl(144, 10%, 7%)',
			900: 'hsl(145, 0%, 1%)',
		},
		primary: {
			100: 'hsl(145, 31%, 54%)',
			300: 'hsl(146, 32%, 48%)',
			500: 'hsl(147, 33%, 40%)',
			700: 'hsl(148, 34%, 30%)',
			900: 'hsl(149, 35%, 18%)',
		},
		secondary: {
			100: 'hsl(221, 86%, 81%)',
			300: 'hsl(223, 83%, 77%)',
			500: 'hsl(225, 77%, 72%)',
			700: 'hsl(227, 74%, 66%)',
			900: 'hsl(229, 66%, 58%)',
		},
		success: {
			100: 'hsl(83, 65%, 76%)',
			300: 'hsl(83, 68%, 56%)',
			500: 'hsl(83, 72%, 40%)',
			700: 'hsl(83, 68%, 38%)',
			900: 'hsl(83, 65%, 30%)',
		},
		error: {
			100: 'hsl(5, 90%, 78%)',
			300: 'hsl(5, 85%, 70%)',
			500: 'hsl(5, 80%, 62%)',
			700: 'hsl(5, 74%, 54%)',
			900: 'hsl(5, 70%, 46%)',
		},
	},
	dark: {
		bg: {
			'000': 'hsl(200, 13%, 6%)',
			100: 'hsl(199, 12%, 8%)',
			300: 'hsl(198,11%, 10%)',
			500: 'hsl(197,10%, 12%)',
			700: 'hsl(196, 9%, 14%)',
			900: 'hsl(195, 8%, 16%)',
		},
		fg: {
			'000': 'hsl(60, 9%, 72%)',
			100: 'hsl(59, 10%, 76%)',
			300: 'hsl(57, 12%, 80%)',
			500: 'hsl(56, 15%, 83%)',
			700: 'hsl(55, 18%, 86%)',
			900: 'hsl(54, 20%, 90%)',
		},
		primary: {
			100: 'hsl(149, 35%, 18%)',
			300: 'hsl(148, 34%, 30%)',
			500: 'hsl(147, 33%, 40%)',
			700: 'hsl(146, 34%, 48%)',
			900: 'hsl(145, 36%, 54%)',
		},
		secondary: {
			100: 'hsl(229, 66%, 58%)',
			300: 'hsl(227, 74%, 66%)',
			500: 'hsl(225, 77%, 72%)',
			700: 'hsl(223, 83%, 77%)',
			900: 'hsl(221, 86%, 81%)',
		},
		success: {
			// 100: 'hsl(83, 80%, 35%)',
			// 300: 'hsl(83, 74%, 45%)',
			// 500: 'hsl(83, 73%, 55%)',
			// 700: 'hsl(83, 72%, 65%)',
			// 900: 'hsl(83, 71%, 75%)',
			100: 'hsl(83, 71%, 75%)',
			300: 'hsl(83, 72%, 65%)',
			500: 'hsl(83, 73%, 55%)',
			700: 'hsl(83, 74%, 45%)',
			900: 'hsl(83, 80%, 35%)',
		},
		error: {
			100: 'hsl(5, 90%, 88%)',
			300: 'hsl(5, 85%, 80%)',
			500: 'hsl(5, 80%, 72%)',
			700: 'hsl(5, 74%, 64%)',
			900: 'hsl(5, 70%, 56%)',
			// 100: 'hsl(5, 70%, 46%)',
			// 300: 'hsl(5, 74%, 54%)',
			// 500: 'hsl(5, 80%, 62%)',
			// 700: 'hsl(5, 85%, 70%)',
			// 900: 'hsl(5, 90%, 78%)',
		},
	},
	// user: {
	// 	bg: {
	// 		'000': 'hsl(34, 10%, 98%)',
	// 		100: 'hsl(35, 11%, 96%)',
	// 		300: 'hsl(36, 12%, 93%)',
	// 		500: 'hsl(37, 13%, 89%)',
	// 		700: 'hsl(39, 14%, 85%)',
	// 		900: 'hsl(40, 15%, 80%)',
	// 	},
	// 	fg: {
	// 		'000': 'hsl(160, 12%, 7%)',
	// 		100: 'hsl(161, 14%, 8%)',
	// 		300: 'hsl(162,16%, 10%)',
	// 		500: 'hsl(163,18%, 12%)',
	// 		700: 'hsl(164, 19%, 14%)',
	// 		900: 'hsl(165, 20%, 16%)',
	// 	},
	// 	primary: {
	// 		100: 'hsl(138, 65%, 30%)',
	// 		300: 'hsl(137, 54%, 39%)',
	// 		500: 'hsl(136, 43%, 50%)',
	// 		700: 'hsl(136, 44%, 62%)',
	// 		900: 'hsl(137, 45%, 72%)',
	// 	},
	// 	secondary: {
	// 		100: 'hsl(247, 66%, 58%)',
	// 		300: 'hsl(246, 74%, 66%)',
	// 		500: 'hsl(245, 77%, 72%)',
	// 		700: 'hsl(244, 83%, 77%)',
	// 		900: 'hsl(243, 86%, 81%)',
	// 	},
	// 	success: {
	// 		100: 'hsl(83, 71%, 74%)',
	// 		300: 'hsl(83, 72%, 68%)',
	// 		500: 'hsl(83, 73%, 60%)',
	// 		700: 'hsl(83, 74%, 49%)',
	// 		900: 'hsl(83, 80%, 44%)',
	// 	},
	// 	error: {
	// 		100: 'hsl(2, 90%, 78%)',
	// 		300: 'hsl(3, 88%, 72%)',
	// 		500: 'hsl(3, 84%, 66%)',
	// 		700: 'hsl(4, 76%, 59%)',
	// 		900: 'hsl(5, 66%, 50%)',
	// 	},
	// },
} as const satisfies Record<string, Theme>;

export const THEMES = themeNames(THEME_PALETTES);

export type ThemeName = ValueOf<typeof THEMES>;
