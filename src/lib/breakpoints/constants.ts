/**
 * Min-width pixel values used for media queries. Keep in sync with breakpoints defined in sibling
 * scss.
 */
export const BREAKPOINTS = {
	// sm: '30em',
	md: '48em',
	// lg: '64em',
	// xl: '80em',
	// sm: 480,
	// md: 768,
	// lg: 1024,
	// xl: 1280,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

export const BREAKPOINTS_ARR = Object.keys(BREAKPOINTS) as Breakpoint[];
