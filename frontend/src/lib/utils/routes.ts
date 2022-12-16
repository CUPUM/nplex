/**
 * The following declarations detail various route objects and object arrays to help generate
 * navbars or other UI elements. The route objects can also serve as a matching reference to keep
 * track of certain layout-specific or route-specific states.
 *
 * ⚠️ These declaration are NOT exhaustive and should not be assumed to cover the full scope of the
 * app's possible routing state.
 */

import { CATEGORIES, type Category } from './enums';

interface Route {
	/**
	 * Non-based full absolute pathname, with leading slash.
	 */
	pathname: string;
	/**
	 * Label to be used in navbars or as a label for other elements. Routes not calling for a title
	 * should not need to be defined here.
	 */
	label: string;
}

export const MAIN_ROUTES = {
	about: {
		pathname: '/a-propos',
		label: 'À propos',
	},
	guides: {
		pathname: '/guides',
		label: 'Guides',
	},
	explore: {
		pathname: '',
		label: 'Explorer',
	},
} satisfies Record<string, Route>;

export const USER_BASE_ROUTE = {
	pathname: '/compte',
	label: 'Mon compte',
} satisfies Route;

export const USER_ROUTES = {
	// Add
} satisfies Record<string, Route>;

interface ExploreRoute extends Route {
	category: Category;
}

export const EXPLORE_ROUTES = {
	projects: {
		pathname: '/projets',
		label: 'Projets',
		category: CATEGORIES.PROJECTS,
	},
	organisations: {
		pathname: '/organisations',
		label: 'Organisations',
		category: CATEGORIES.ORGANISATIONS,
	},
	actors: {
		pathname: '/acteurs',
		label: 'Acteurs',
		category: CATEGORIES.ACTORS,
	},
} satisfies Record<string, ExploreRoute>;

export const EDITOR_BASE_ROUTE = {
	pathname: '/editer',
	label: 'Éditer',
} satisfies Route;

interface EditorRoute extends Route {
	category: Category;
	disabled?: boolean;
	subpath: string;
}

export const EDITOR_ROUTES = {
	project: {
		subpath: '/projet',
		label: 'Créer un projet',
		category: 'projects',
		get pathname() {
			return EDITOR_BASE_ROUTE.pathname + this.subpath;
		},
	},
	organisation: {
		subpath: '/organisation',
		label: 'Éditer une organisation',
		category: 'organisations',
		disabled: true,
		get pathname() {
			return EDITOR_BASE_ROUTE.pathname + this.subpath;
		},
	},
	actor: {
		subpath: '/acteur',
		label: 'Éditer un profil d’acteur',
		category: 'actors',
		disabled: true,
		get pathname() {
			return EDITOR_BASE_ROUTE.pathname + this.subpath;
		},
	},
} satisfies Record<string, EditorRoute>;
