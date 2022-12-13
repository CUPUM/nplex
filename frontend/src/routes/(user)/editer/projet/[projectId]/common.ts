interface ProjectEditorRoute {
	title: string;
	subpath: '' | `/${string}`;
	tag?: string;
}

export const GALLERY_UPLOAD_FORM_ID = 'gallery-upload';

/**
 * Sub-forms of the project editor.
 */
export const routes = [
	{
		title: 'Général',
		subpath: '',
	},
	{
		title: 'Galerie',
		subpath: '/galerie',
		tag: GALLERY_UPLOAD_FORM_ID,
	},
	{
		title: 'Site',
		subpath: '/site',
	},
	{
		title: 'Bâtiment',
		subpath: '/batiment',
	},
	{
		title: 'Processus',
		subpath: '/processus',
	},
	{
		title: 'Exemplarité',
		subpath: '/exemplarite',
	},
	{
		title: 'Visibilité',
		subpath: '/parametres',
	},
] satisfies ProjectEditorRoute[];

/**
 * Explicit constant form naming (id) required for the menu's buttons' "form" attribute.
 */
export const EDITOR_FORM_ID = 'project-editor';
