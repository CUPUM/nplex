/**
 * The following declarations detail various route objects and object arrays to help generate
 * navbars or other UI elements. The route objects can also serve as a matching reference to keep
 * track of certain layout-specific or route-specific states.
 *
 * ⚠️ These declaration are NOT exhaustive and should not be assumed to cover the full scope of the
 * app's possible routing state.
 */

import { CATEGORIES, type Category } from './enums';

export type Route<T = {}> = {
	/**
	 * Non-based full absolute pathname, with leading slash.
	 */
	pathname: string;
	/**
	 * Label to be used in navbars or as a label for other elements. Routes not calling for a title
	 * should not need to be defined here.
	 */
	title: string;
} & T;

export type Routes<T = {}> = Record<string, Route<T>>;

export const MAIN_ROUTES = {
	about: {
		pathname: '/a-propos',
		title: 'À propos',
	},
	guides: {
		pathname: '/guides',
		title: 'Guides',
	},
	explore: {
		pathname: '/#explore',
		title: 'Explorer',
	},
} satisfies Routes;

export const USER_BASE_ROUTE = {
	pathname: '/u',
	title: 'Mon compte',
} satisfies Route;

export const EXPLORE_ROUTES = {
	projects: {
		pathname: '/projets',
		title: 'Projets',
		category: CATEGORIES.PROJECTS,
		noscroll: true,
	},
	organisations: {
		pathname: '/organisations',
		title: 'Organisations',
		category: CATEGORIES.ORGANISATIONS,
		noscroll: false,
	},
	actors: {
		pathname: '/acteurs',
		title: 'Acteurs',
		category: CATEGORIES.ACTORS,
		noscroll: false,
	},
} satisfies Routes<{ category: Category; noscroll?: boolean }>;

export const EDITOR_BASE_ROUTE = {
	pathname: '/editer',
	title: 'Éditer',
} satisfies Route;
