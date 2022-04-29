import { UserRole } from './user';

export interface Route {
	pathname: string;
	title: string;
	parentTopRoute?: Route;
	searchable?: boolean;
	guards?: UserRole[];
}
/**
 * Top navigation routes.
 */
export const topRoutes: Route[] = [
	{
		pathname: '/',
		title: 'Explorer',
		searchable: true
	},
	{
		pathname: '/nouvelles',
		title: 'Nouvelles'
	},
	{
		pathname: '/guides',
		title: 'Guides'
	}
];

export const rootRoute = topRoutes[0];

export interface ExploreRoute extends Route {
	category: 'projects' | 'organisations' | 'actors';
}
/**
 * Routes for the different categories of "exploration" mode for browsing and searching.
 */
export const exploreRoutes: ExploreRoute[] = [
	{
		pathname: '/projets',
		title: 'Projets',
		category: 'projects',
		parentTopRoute: rootRoute,
		searchable: true
	},
	{
		pathname: '/organisations',
		title: 'Organisations',
		category: 'organisations',
		parentTopRoute: rootRoute,
		searchable: true
	},
	{
		pathname: '/acteurs',
		title: 'Acteurs',
		category: 'actors',
		parentTopRoute: rootRoute,
		searchable: true
	}
];

export interface CreationRoute extends Route {
	category: ExploreRoute['category'];
}
export const creationBaseRoute: Route = {
	pathname: '/creer',
	title: 'Créer',
	guards: [UserRole.Visitor, UserRole.Editor, UserRole.Admin]
};
/**
 * Relative root routes for the submission forms.
 */
export const creationRoutes: CreationRoute[] = [
	{
		pathname: creationBaseRoute.pathname + '/projet',
		title: 'Nouveau projet',
		category: 'projects',
		parentTopRoute: creationBaseRoute
	},
	{
		pathname: creationBaseRoute.pathname + '/organisation',
		title: 'Nouvelle organisation',
		category: 'organisations',
		parentTopRoute: creationBaseRoute
	},
	{
		pathname: creationBaseRoute.pathname + '/acteur',
		title: 'Nouveau profil d’acteur',
		category: 'actors',
		parentTopRoute: creationBaseRoute
	}
];

export const userBaseRoute: Route = {
	pathname: '/compte',
	title: 'Mon compte',
	guards: [UserRole.Visitor, UserRole.Editor, UserRole.Admin]
};

/**
 * Regroups all defined nav-bar route items in a single array for use in store/route.ts $route store
 * to determine which navbar item(s) to highlight.
 */
export const allRoutes = [
	...topRoutes,
	...exploreRoutes,
	creationBaseRoute,
	...creationRoutes,
	userBaseRoute
];