/**
 * The following declarations detail various route objects and object arrays to help generate navbars or other UI
 * elements. The route objects can also serve as a matching reference to keep track of certain layout-specific or
 * route-specific states.
 *
 * ⚠️ These declaration are NOT exhaustive and should not be assumed to cover the full scope of the app's possible
 * routing state.
 */

import type { Category } from '$types/categories';

interface Route {
	/**
	 * Full un-based absolute pathname.
	 */
	pathname: string;
	/**
	 * Title to be used in navbars or as a label for other elements. Routes not calling for a title should not need to
	 * be defined here.
	 */
	title: string;
}

/**
 * Main navigation routes.
 */
export const mainRoutes: Route[] = [
	{
		pathname: '/a-propos',
		title: 'À propos',
	},
	{
		pathname: '/guides',
		title: 'Guides',
	},
	{
		pathname: '/',
		title: 'Explorer',
	},
];

export interface ExploreRoute extends Route {
	category: Category;
}

/**
 * Routes for the different categories of "exploration" mode for browsing and searching.
 */
export const exploreRoutes: ExploreRoute[] = [
	{
		pathname: '/projets',
		title: 'Projets',
		category: 'projects',
	},
	{
		pathname: '/organisations',
		title: 'Organisations',
		category: 'organisations',
	},
	{
		pathname: '/acteurs',
		title: 'Acteurs',
		category: 'actors',
	},
];

export const creationBaseRoute: Route = {
	pathname: '/editer',
	title: 'Éditer',
};

interface CreationRoute extends Route {
	category: Category;
	// subtitle: string;
}

/**
 * Relative creation-root routes for the submission forms.
 */
export const creationRoutes: CreationRoute[] = [
	{
		pathname: creationBaseRoute.pathname + '/projet',
		title: 'Créer ou éditer un projet',
		category: 'projects',
	},
	{
		pathname: creationBaseRoute.pathname + '/organisation',
		title: 'Créer ou éditer une organisation',
		category: 'organisations',
	},
	{
		pathname: creationBaseRoute.pathname + '/acteur',
		title: 'Créer ou éditer un profil d’acteur',
		category: 'actors',
	},
];

export const userBaseRoute: Route = {
	pathname: '/compte',
	title: 'Mon compte',
};

// export const userRoutes: Route[] = [];
