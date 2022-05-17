/**
 * The following declarations detail various route objects and object arrays to help generate navbars or other UI
 * elements. The route objects can also serve as a matching reference to keep track of certain layout-specific or
 * route-specific states.
 *
 * ⚠️ These declaration are NOT exhaustive and should not be assumed to cover the full scope of the app's possible routing state.
 */

import type { Category } from 'src/types/categories';

export interface Route {
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
		pathname: '/',
		title: 'Explorer',
	},
	{
		pathname: '/nouvelles',
		title: 'Nouvelles',
	},
	{
		pathname: '/guides',
		title: 'Guides',
	},
];

export const rootRoute = mainRoutes[0];

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

// /**
//  * Lookup map to adjust the navbar's "Explore" path according to the already set category, if there is.
//  */
// export const categoryRoutes: Record<Category, Route> = {
// 	projects: exploreRoutes[0],
// 	organisations: exploreRoutes[1],
// 	actors: exploreRoutes[2],
// };

export const creationBaseRoute: Route = {
	pathname: '/creer',
	title: 'Créer',
};

/**
 * Relative root routes for the submission forms.
 */
export const creationRoutes: Route[] = [
	{
		pathname: creationBaseRoute.pathname + '/projet',
		title: 'Nouveau projet',
	},
	{
		pathname: creationBaseRoute.pathname + '/organisation',
		title: 'Nouvelle organisation',
	},
	{
		pathname: creationBaseRoute.pathname + '/acteur',
		title: 'Nouveau profil d’acteur',
	},
];

export const userBaseRoute: Route = {
	pathname: 'compte',
	title: 'Mon compte',
};

export const userRoutes: Route[] = [];
