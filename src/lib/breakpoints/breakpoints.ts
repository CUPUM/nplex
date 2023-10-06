import { browser } from '$app/environment';
import { readable } from 'svelte/store';

/**
 * Min-width pixel values used for media queries. Keep in sync with breakpoints defined in sibling
 * scss.
 */
export const BREAKPOINTS = {
	sm: 480,
	md: 800,
	lg: 1024,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

const BREAKPOINTS_ARR = Object.keys(BREAKPOINTS) as Breakpoint[];

export function createBreakpointQuery(breakpoint: Breakpoint) {
	return browser
		? window.matchMedia(`screen and (min-width: ${BREAKPOINTS[breakpoint]}px)`)
		: undefined;
}

// const init = BREAKPOINTS_ARR.reduce(
// 	(acc, bp) => {
// 		const q = createBreakpointQuery(bp);
// 		acc[bp] = q?.matches ?? false;
// 		return acc;
// 	},
// 	{} as Record<Breakpoint, boolean>
// );

/**
 * Non-exclusive breapoint media query matches. Non-exclusive means that multiple conditions can be
 * matched, so be sure to use exclusionary if/elseif statements to avoid conflicting co-valid
 * conditions.
 */
export const breakpoint = readable<Record<Breakpoint, boolean> | undefined>(
	undefined,
	function start(set, update) {
		const stoppers = BREAKPOINTS_ARR.map((bp) => {
			const q = createBreakpointQuery(bp);
			if (!q) {
				return q;
			}
			function handleChange(e: MediaQueryList | MediaQueryListEvent) {
				update((prev) => {
					if (!prev) {
						prev = BREAKPOINTS_ARR.reduce(
							(acc, bp) => {
								const q = createBreakpointQuery(bp);
								acc[bp] = q?.matches ?? false;
								return acc;
							},
							{} as Record<Breakpoint, boolean>
						);
					}
					return { ...prev, [bp]: e.matches };
				});
			}
			function stop() {
				q?.removeEventListener('change', handleChange);
			}
			q.addEventListener('change', handleChange);
			handleChange(q);
			return stop;
		});
		return function stop() {
			stoppers.forEach((s) => {
				s && s();
			});
		};
	}
);
