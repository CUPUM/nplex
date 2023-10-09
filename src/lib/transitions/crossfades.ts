// Shared crossfade presets

import { cubicInOut, elasticOut } from 'svelte/easing';
import { crossfade, scale } from 'svelte/transition';

export const switchCrossfade = crossfade({
	duration(l) {
		return 150 + l / 10;
	},
	easing: cubicInOut,
	fallback(node /* params, intro */) {
		return scale(node, { duration: 500, easing: elasticOut, start: 0.95 });
	},
});

export const toggleCrossfade = crossfade({
	fallback(node /*params, intro */) {
		return scale(node, { start: 0.5, duration: 500, easing: elasticOut });
	},
});
