import { writable } from 'svelte/store';
import type { LayoutData } from './$types';

export const FORMID = 'project-editor';

export const STARTID = 'project-editor-content';

export const PROJECT_EDITOR_ROUTES = {
	general: {
		title: 'Général',
		subpath: '',
	},
	gallery: {
		title: 'Galerie',
		subpath: '/galerie',
		hash: STARTID,
	},
	site: {
		title: 'Site',
		subpath: '/site',
		hash: STARTID,
	},
	building: {
		title: 'Bâtiment',
		subpath: '/batiment',
		hash: STARTID,
	},
	process: {
		title: 'Processus',
		subpath: '/processus',
		hash: STARTID,
	},
	exemplarity: {
		title: 'Exemplarité',
		subpath: '/exemplarite',
		hash: STARTID,
	},
	publication: {
		title: 'Publication',
		subpath: '/publication',
		hash: STARTID,
	},
} satisfies Record<
	string,
	{
		title: string;
		subpath: '' | `/${string}`;
		hash?: string;
	}
>;

export const typeTooltip = writable<boolean>(false);

export const formProject = writable<LayoutData['project']>();
