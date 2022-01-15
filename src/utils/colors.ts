export const colors = {
	primary: {
		100: 'hsl(88, 76%, 74%)',
		300: 'hsl(84, 74%, 68%)',
		500: 'hsl(82, 72%, 58%)',
		700: 'hsl(84, 70%, 48%)',
		900: 'hsl(86, 68%, 40%)'
	},
	secondary: {
		100: 'hsl(194, 90%, 72%)',
		300: 'hsl(194, 79%, 63%)',
		500: 'hsl(204, 75%, 57%)',
		700: 'hsl(214, 72%, 52%)',
		900: 'hsl(214, 85%, 47%)'
	},
	light: {
		100: 'hsl(150, 40%, 97%)',
		300: 'hsl(150, 35%, 94%)',
		500: 'hsl(150, 30%, 91%)',
		700: 'hsl(150, 25%, 88%)',
		900: 'hsl(150, 20%, 85%)'
	},
	dark: {
		100: 'hsl(192, 8%, 50%)',
		300: 'hsl(198, 10%, 40%)',
		500: 'hsl(204, 12%, 30%)',
		700: 'hsl(212, 14%, 25%)',
		900: 'hsl(220, 16%, 20%)'
	},
	success: {
		100: 'hsl(133, 81%, 51%)',
		500: 'hsl(133, 81%, 51%)',
		900: 'hsl(133, 81%, 51%)'
	},
	error: {
		100: 'hsl(9, 79%, 56%)',
		500: 'hsl(9, 79%, 56%)',
		900: 'hsl(9, 79%, 56%)'
	},
	warning: {
		100: 'hsl(46, 86%, 59%)',
		500: 'hsl(46, 86%, 59%)',
		900: 'hsl(46, 86%, 59%)'
	}
};

export const cssColors =
	Object.entries(colors)
		.map(([group, shades]) =>
			Object.entries(shades).map(
				([shade, def]) =>
					`--color-${group}-${shade}: ${def}; ` +
					`--rgb-${group}-${shade}: ${Object.values(extractColorComponents(def)).join(
						', '
					)}`
			)
		)
		.reduce((accumulated, current) => [...accumulated, ...current])
		.join('; ') + '; ';

/**
 * @param colorString
 * @returns
 */
export function extractColorComponents(colorString: string) {
	let matched;
	/* rgb */
	matched = colorString
		.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i)
		?.slice(1)
		?.map((comp) => parseInt(comp, 10));
	if (matched) {
		return { r: matched[0], g: matched[1], b: matched[2] };
	}
	/* hsl */
	matched = colorString
		.match(/^hsl\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)\s*\)$/i)
		?.slice(1);
	if (matched) {
		return { h: parseInt(matched[0]), s: matched[1], l: matched[2] };
	}
	/* hex */
	matched = colorString
		.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
		?.slice(1)
		?.map((comp) => parseInt(comp, 16));
	if (matched) {
		return { r: matched[0], g: matched[1], b: matched[2] };
	}
	matched = colorString
		.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i)
		?.slice(1)
		?.map((comp) => 0x11 * parseInt(comp, 16));
	if (matched) {
		return { r: matched[0], g: matched[1], b: matched[2] };
	}
	throw new Error('No valid matching format found for provided colorString');
}
