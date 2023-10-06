import type { ValueOf } from 'type-fest';

export const SETOUTS = {
	/**
	 * Default layouts, generally with a centered content column such as in articles or projects
	 * pages. Caracterized by a centered Navbar.
	 */
	NORMAL: 'normal',
	/**
	 * Full width layouts akin to dashboards, but generally vertically scrollable. Caracterized by a
	 * full-width Navbar.
	 */
	FULL_WIDTH: 'full-width',
	/**
	 * Full screen, non-scrollable layouts such as full-screen exploration map. Caracterized by a
	 * full-width Navbar and non-scrollable page.
	 */
	FULL_SCREEN: 'full-screen',
} as const;

export type Setout = ValueOf<typeof SETOUTS>;

export const SETOUT_DEFAULT = SETOUTS.NORMAL;

export const SETOUT_ATTRIBUTE = 'data-setout';
