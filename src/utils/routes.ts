export interface Route {
	href: string;
	title: string;
	parentRoute?: Route;
}

export const topRoutes: Route[] = [
	{
		href: '/',
		title: 'Explorer'
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

export const exploreRoutes: ExploreRoute[] = [
	{
		href: '/projets',
		title: 'Projets',
		category: 'projects',
		parentRoute: rootRoute
	},
	{
		href: '/organisations',
		title: 'Organisations',
		category: 'organisations',
		parentRoute: rootRoute
	},
	{
		href: '/acteurs',
		title: 'Acteurs',
		category: 'actors',
		parentRoute: rootRoute
	}
]
