// Shared crossfade presets

import { cubicInOut, elasticOut, expoInOut, expoOut } from 'svelte/easing';
import { crossfade, scale } from 'svelte/transition';

function createCrossfadePreset<T extends Parameters<typeof crossfade>>(...params: T) {
	const preset = crossfade(params);
	return {
		send: preset[0],
		receive: preset[1],
	};
}

export const switchCrossfade = createCrossfadePreset({
	duration(l) {
		return 150 + l / 10;
	},
	easing: cubicInOut,
	fallback(node /* params, intro */) {
		return scale(node, { duration: 500, easing: elasticOut, start: 0.95 });
	},
});

export const toggleCrossfade = createCrossfadePreset({
	duration: 250,
	fallback(node /*params, intro */) {
		return scale(node, { start: 0.5, duration: 500, easing: elasticOut });
	},
});

export const galleryImageCrossfade = createCrossfadePreset({
	duration: 250,
	easing: expoInOut,
	fallback(node) {
		return scale(node, { start: 0.9, duration: 150, easing: expoOut });
	},
});
