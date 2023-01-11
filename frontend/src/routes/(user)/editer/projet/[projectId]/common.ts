import { writable } from 'svelte/store';

export const formid = 'project-editor';

export const topid = 'project-editor-content';

const dirty = writable<boolean>();

export const EDITOR_PARTS_ROUTES = {
	GENERAL: {
		title: 'Général',
		subpath: '',
	},
	GALLERY: {
		title: 'Galerie',
		subpath: '/galerie',
		hash: topid,
	},
	SITE: {
		title: 'Site',
		subpath: '/site',
		hash: topid,
	},
	BUILDING: {
		title: 'Bâtiment',
		subpath: '/batiment',
		hash: topid,
	},
	PROCESS: {
		title: 'Processus',
		subpath: '/processus',
		hash: topid,
	},
	EXAMPLARITY: {
		title: 'Exemplarité',
		subpath: '/exemplarite',
		hash: topid,
	},
	VISIBILITY: {
		title: 'Visibilité',
		subpath: '/parametres',
		hash: topid,
	},
} satisfies Record<
	string,
	{
		title: string;
		subpath: '' | `/${string}`;
		hash?: string;
	}
>;
