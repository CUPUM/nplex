// Shared crossfade presets

import { cubicInOut, elasticOut, expoInOut, expoOut } from 'svelte/easing';
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
	duration: 250,
	fallback(node /*params, intro */) {
		return scale(node, { start: 0.5, duration: 500, easing: elasticOut });
	},
});

export const galleryImageCrossfade = crossfade({
	duration: 250,
	easing: expoInOut,
	fallback(node) {
		return scale(node, { start: 0.9, duration: 150, easing: expoOut });
	},
});

// export const dialogTransition =

// export const dropdownTransition =
