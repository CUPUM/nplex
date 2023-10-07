import { browser } from '$app/environment';
import { readable } from 'svelte/store';
import { BREAKPOINTS, BREAKPOINTS_ARR, type Breakpoint } from './constants';

export function createBreakpointQuery(breakpoint: Breakpoint) {
	// const px = `${BREAKPOINTS[breakpoint]}px`;
	// Using a relative breakpoint to map 1:1 with pandacss's handling of breakpoints.
	// const em = `${BREAKPOINTS[breakpoint] / 16}em`;
	return browser
		? window.matchMedia(`screen and (min-width: ${BREAKPOINTS[breakpoint]}`)
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
