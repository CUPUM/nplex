export const mainRoutes = [
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

export type ExploreCategory = 'projects' | 'organisations' | 'actors';

export const exploreRoutes: { href: string; title: string; category: ExploreCategory }[] = [
	{
		href: '/projets',
		title: 'Projets',
		category: 'projects'
	},
	{
		href: '/organisations',
		title: 'Organisations',
		category: 'organisations'
	},
	{
		href: '/acteurs',
		title: 'Acteurs',
		category: 'actors'
	}
];
