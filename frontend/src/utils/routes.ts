export interface Route {
	href: string;
	title: string;
	parentRoute?: Route;
	searchable?: boolean;
}
/**
 * Top navigation routes.
 */
export const topRoutes: Route[] = [
	{
		href: '/',
		title: 'Explorer',
		searchable: true
	},
	{
		href: '/nouvelles',
		title: 'Nouvelles'
	},
	{
		href: '/guides',
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
		href: '/projets',
		title: 'Projets',
		category: 'projects',
		parentRoute: rootRoute,
		searchable: true
	},
	{
		href: '/organisations',
		title: 'Organisations',
		category: 'organisations',
		parentRoute: rootRoute,
		searchable: true
	},
	{
		href: '/acteurs',
		title: 'Acteurs',
		category: 'actors',
		parentRoute: rootRoute,
		searchable: true
	}
]

export interface CreationRoute extends Route {
	category: ExploreRoute['category'];
}
const creationBase = '/creer';
/**
 * Relative root routes for the submission forms.
 */
export const creationRoutes: CreationRoute[] = [
	{
		href: creationBase + '/projet',
		title: 'Nouveau projet',
		category: 'projects'
	},
	{
		href: creationBase + '/organisation',
		title: 'Nouvelle organisation',
		category: 'organisations'
	},
	{
		href: creationBase + '/acteur',
		title: 'Nouveau profil d’acteur',
		category: 'actors'
	}
]