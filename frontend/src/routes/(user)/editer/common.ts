import { EDITOR_BASE_ROUTE, type Routes } from '$utils/routes';

function getpathname(suffix: string) {
	return EDITOR_BASE_ROUTE.pathname + suffix;
}

export const EDITOR_ROUTES = {
	project: {
		subpath: '/projet',
		title: 'Projets',
		get pathname() {
			return getpathname(this.subpath);
		},
		create: {
			title: 'Créer un projet',
		},
		edit: {
			hash: 'projets-editables',
			title: 'Modifier un projet',
			get pathname() {
				return getpathname('#' + this.hash);
			},
		},
		descriptors: {
			subpath: '/descripteurs',
			title: 'Descripteurs de projet',
			get pathname() {
				return getpathname(this.subpath);
			},
		},
	},
	organisation: {
		subpath: '/organisation',
		title: 'Organisations',
		disabled: true,
		get pathname() {
			return getpathname(this.subpath);
		},
		create: {
			title: 'Créer une organisation',
		},
		edit: {
			hash: 'organisations-editables',
			title: 'Modifier une organisation',
			get pathname() {
				return getpathname('#' + this.hash);
			},
		},
	},
	actor: {
		subpath: '/acteur',
		title: 'Acteurs',
		disabled: true,
		get pathname() {
			return getpathname(this.subpath);
		},
		create: {
			title: "Créer un profil d'acteur",
		},
		edit: {
			hash: 'acteurs-editables',
			title: "Modifier un profil d'acteur",
			get pathname() {
				return getpathname('#' + this.hash);
			},
		},
	},
} satisfies Routes<{
	disabled?: boolean;
	subpath: string;
	create: { title: string };
	edit: { hash: string; pathname: string; title: string };
	descriptors?: { subpath: string; pathname: string; title: string };
}>;
