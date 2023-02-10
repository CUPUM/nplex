import { col } from '$utils/css';
import { THEMES, THEME_PALETTES, type ThemeName } from '$utils/themes';
import type { LayoutLoad } from './$types';

export const load = (async (event) => {
	let theme: ThemeName = THEMES.dark;
	let background: string | undefined = col('bg', 300);
	let overscroll: string | undefined = THEME_PALETTES.dark.bg[300];

	return {
		theme,
		background,
		overscroll,
	};
}) satisfies LayoutLoad;
