import { EDITOR_BASE_ROUTE, type Routes } from '$utils/routes';

export const EDITOR_ROUTES = {
	project: {
		title: 'Projets',
		subpath: '/projet',
		pathname: EDITOR_BASE_ROUTE.pathname + '/projet',
		create: {
			title: 'Créer un projet',
		},
		edit: {
			hash: 'projets-editables',
			title: 'Modifier un projet',
			pathname: EDITOR_BASE_ROUTE.pathname + '#projets-editables',
		},
		descriptors: {
			subpath: '/descripteurs/projets',
			title: 'Descripteurs de projet',
			pathname: EDITOR_BASE_ROUTE.pathname + '/descripteurs/projets',
		},
	},
	organization: {
		title: 'Organisations',
		subpath: '/organisation',
		pathname: EDITOR_BASE_ROUTE.pathname + '/organisation',
		create: {
			title: 'Créer une organisation',
		},
		edit: {
			hash: 'organisations-editables',
			title: 'Modifier une organisation',
			pathname: EDITOR_BASE_ROUTE.pathname + '#organisations-editables',
		},
	},
	actor: {
		title: 'Acteurs',
		subpath: '/acteur',
		pathname: EDITOR_BASE_ROUTE.pathname + '/acteur',
		create: {
			title: "Créer un profil d'acteur",
		},
		edit: {
			hash: 'acteurs-editables',
			title: "Modifier un profil d'acteur",
			pathname: EDITOR_BASE_ROUTE.pathname + '#acteurs-editables',
		},
	},
} satisfies Routes<{
	disabled?: boolean;
	subpath: string;
	create: { title: string };
	edit: { hash: string; pathname: string; title: string };
	descriptors?: { subpath: string; pathname: string; title: string };
}>;
