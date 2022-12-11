import type { Category } from 'src/app';

/**
 * The following declarations detail various route objects and object arrays to help generate
 * navbars or other UI elements. The route objects can also serve as a matching reference to keep
 * track of certain layout-specific or route-specific states.
 *
 * ⚠️ These declaration are NOT exhaustive and should not be assumed to cover the full scope of the
 * app's possible routing state.
 */

interface Route {
	/**
	 * Non-based full absolute pathname, with leading slash.
	 */
	pathname: string;
	/**
	 * Title to be used in navbars or as a label for other elements. Routes not calling for a title
	 * should not need to be defined here.
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

export const editorBase: Route = {
	pathname: '/editer',
	title: 'Éditer',
};

interface CreationRoute extends Route {
	category: Category;
	disabled?: boolean;
}

/**
 * Relative creation-root routes for the submission forms.
 */
export const createRoutes: CreationRoute[] = [
	{
		pathname: editorBase.pathname + '/projet',
		title: 'Créer un projet',
		category: 'projects',
	},
	{
		pathname: editorBase.pathname + '/organisation',
		title: 'Créer une organisation',
		category: 'organisations',
		disabled: true,
	},
	{
		pathname: editorBase.pathname + '/acteur',
		title: 'Créer un profil d’acteur',
		category: 'actors',
		disabled: true,
	},
];

interface EditRoute extends Route {
	category: Category;
	disabled?: boolean;
}

/**
 * Relative creation-root routes for the submission forms.
 */
export const editRoutes: CreationRoute[] = [
	{
		pathname: editorBase.pathname + '/projet',
		title: 'Éditer un projet',
		category: 'projects',
	},
	{
		pathname: editorBase.pathname + '/organisation',
		title: 'Éditer une organisation',
		category: 'organisations',
		disabled: true,
	},
	{
		pathname: editorBase.pathname + '/acteur',
		title: 'Éditer un profil d’acteur',
		category: 'actors',
		disabled: true,
	},
];

export const userBase: Route = {
	pathname: '/compte',
	title: 'Mon compte',
};
