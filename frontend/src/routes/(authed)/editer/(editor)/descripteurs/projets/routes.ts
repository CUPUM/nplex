import type { Routes } from '$utils/routes';

export const PROJECT_DESCIPTORS_EDITOR_BASE = {
	title: 'Descripteurs de projets',
	pathname: '/editer/descripteurs/projets',
};

function base(subpath: string) {
	return PROJECT_DESCIPTORS_EDITOR_BASE.pathname + subpath;
}

export const PROJECT_DESCRIPTORS_EDITOR_ROUTES = {
	Indicators: {
		title: 'Indicateurs d’exemplarité',
		label: 'Indicateurs',
		pathname: base('/indicateurs'),
	},
	Usages: {
		title: 'Usages et catégories d’usages',
		label: 'Usages',
		pathname: base('/usages'),
	},
} satisfies Routes<{ label: string }>;
