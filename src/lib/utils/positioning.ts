import type { FloatingConfig } from '@melt-ui/svelte/internal/actions';
import type { Split } from 'type-fest';

type PlacementPlace = Split<NonNullable<FloatingConfig['placement']>, '-'>[0];
type PlacementAlign = Split<NonNullable<FloatingConfig['placement']>, '-'>[1];

export function getSplitPlacement(placement: NonNullable<FloatingConfig['placement']>) {
	const [place, align] = placement.split('-') as [PlacementPlace, PlacementAlign];
	return { place, align };
}

/**
 * Positioning-aware distance. Useful for transitions and other js-based manipulations specific to
 * FloatingUi configs.
 */
export function getDistances(config: FloatingConfig, distance: number) {
	let x = 0;
	let y = 0;
	if (config.placement) {
		const { place, align } = getSplitPlacement(config.placement);
		const cross = align ? (align === 'end' ? distance : -distance) : 0;
		if (place === 'top') {
			y = -distance;
			x = cross;
		} else if (place === 'bottom') {
			y = distance;
			x = cross;
		} else if (place === 'left') {
			x = -distance;
			y = cross;
		} else if (place === 'right') {
			x = distance;
			y = cross;
		}
	}
	return { x, y };
}

export type TransformOriginX = 'left' | 'right' | 'center';
export type TransformOriginY = 'top' | 'bottom' | 'center';
export type TransformOrigin =
	| TransformOriginX
	| TransformOriginY
	| `${TransformOriginX} ${TransformOriginY}`;
/**
 * Mapping Floating config placements to their opposite CSS transform-origin.
 */
export const TRANSFORM_ORIGINS = {
	'top': 'bottom',
	'top-start': 'right bottom',
	'top-end': 'left bottom',
	'right': 'left',
	'right-start': 'left bottom',
	'right-end': 'left top',
	'bottom': 'top',
	'bottom-start': 'right top',
	'bottom-end': 'left top',
	'left': 'right',
	'left-start': 'right bottom',
	'left-end': 'right top',
} as const satisfies Record<NonNullable<FloatingConfig['placement']>, TransformOrigin>;

/**
 * Get a floating config's corresponding opposite CSS transform origin.
 *
 * @see TRANSFORM_ORIGINS;
 */
export function getTransformOrigin(config: FloatingConfig) {
	return config.placement ? TRANSFORM_ORIGINS[config.placement] : 'center';
}
