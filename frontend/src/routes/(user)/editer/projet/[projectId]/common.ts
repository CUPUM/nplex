/**
 * Explicit constant form naming (id) required for the menu's buttons' "form" attribute.
 */
export const EDITOR_FORM_ID = 'project-editor';

export const GALLERY_UPLOAD_FORM_ID = 'gallery-upload';

export interface EditorNavRoute {
	title: string;
	subpath: '' | `/${string}`;
	hash?: string;
}

/**
 * Sub-forms of the project editor.
 */
export const EDITOR_NAV_ROUTES = {
	GENERAL: {
		title: 'Général',
		subpath: '',
	},
	GALLERY: {
		title: 'Galerie',
		subpath: '/galerie',
		hash: GALLERY_UPLOAD_FORM_ID,
	},
	SITE: {
		title: 'Site',
		subpath: '/site',
	},
	BUILDING: {
		title: 'Bâtiment',
		subpath: '/batiment',
	},
	PROCESS: {
		title: 'Processus',
		subpath: '/processus',
	},
	EXAMPLARITY: {
		title: 'Exemplarité',
		subpath: '/exemplarite',
	},
	VISIBILITY: {
		title: 'Visibilité',
		subpath: '/parametres',
	},
} as const satisfies Record<string, EditorNavRoute>;

export const EDITOR_NAV_ROUTES_ARR = Object.values(EDITOR_NAV_ROUTES);
