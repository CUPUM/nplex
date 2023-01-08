import { EDITOR_BASE_ROUTE, type Routes } from '$utils/routes';

export const EDITOR_ROUTES = {
	project: {
		subpath: '/projet',
		title: 'Projets',
		get pathname() {
			return EDITOR_BASE_ROUTE.pathname + this.subpath;
		},
		create: {
			title: 'Créer un projet',
		},
		edit: {
			hash: 'projets-editables',
			title: 'Modifier un projet',
		},
		descriptors: {
			subpath: '/descripteurs',
			title: 'Descripteurs de projet',
			get pathname() {
				return EDITOR_BASE_ROUTE.pathname + this.subpath;
			},
		},
	},
	organisation: {
		subpath: '/organisation',
		title: 'Organisations',
		disabled: true,
		get pathname() {
			return EDITOR_BASE_ROUTE.pathname + this.subpath;
		},
		create: {
			title: 'Créer une organisation',
		},
		edit: {
			hash: 'organisations-editables',
			title: 'Modifier une organisation',
		},
	},
	actor: {
		subpath: '/acteur',
		title: 'Acteurs',
		disabled: true,
		get pathname() {
			return EDITOR_BASE_ROUTE.pathname + this.subpath;
		},
		create: {
			title: "Créer un profil d'acteur",
		},
		edit: {
			hash: 'acteurs-editables',
			title: "Modifier un profil d'acteur",
		},
	},
} satisfies Routes<{
	disabled?: boolean;
	subpath: string;
	create: { title: string };
	edit: { hash: string; title: string };
	descriptors?: { subpath: string; pathname: string; title: string };
}>;
