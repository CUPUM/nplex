export function route(projectId: string, subpath: `/${string}` | '') {
	return `/editer/projet/${projectId}${subpath}`;
}

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
		title: 'Exemplarité & indicateurs',
		subpath: '/exemplarite',
	},
] as const;

/**
 * Explicit constant form naming (id) required for the menu's buttons' "form" attribute.
 */
export const formid = 'project-editor';
