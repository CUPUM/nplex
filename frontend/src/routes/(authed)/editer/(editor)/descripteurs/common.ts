import type { Route } from '$utils/routes';
import { EDITOR_ROUTES } from '../../common';

const baseRoute = EDITOR_ROUTES.project.descriptors;

function base(subpath: `/${string}`) {
	return baseRoute.pathname + subpath;
}

export const descriptorsRoutes = {
	home: {
		title: 'Accueil',
		pathname: baseRoute.pathname,
	},
	exemplarity: {
		title: 'Indicateurs d’exemplarité',
		pathname: base('/exemplarite'),
	},
	works: {
		title: 'Types de travaux',
		pathname: base('/travaux'),
	},
	usages: {
		title: 'Catégories d’usage & usages',
		pathname: base('/usages'),
	},
} as const satisfies Record<string, Route>;
