import { writable } from 'svelte/store';
import { EDITOR_FORM_ID } from '../../constants';
import type { LayoutData } from './$types';

export const descriptors = writable<LayoutData['descriptors']>();

export const project = writable<LayoutData['project']>();

export function composeSectionHref(projectId: string, subpath: string, hash?: string) {
	return '/editer/projet/' + projectId + subpath + (hash ? `#${hash}` : '');
}

export const essentials = [
	{
		subpath: '',
		title: 'Général',
	},
	{
		subpath: '/lieu',
		title: 'Lieu',
		hash: EDITOR_FORM_ID,
	},
	{
		subpath: '/exemplarite',
		title: 'Exemplarité',
		hash: EDITOR_FORM_ID,
	},
	{
		subpath: '/galerie',
		title: 'Galerie',
		hash: EDITOR_FORM_ID,
	},
];

export const complements = [
	{
		subpath: '/intervenant-e-s',
		title: 'Intervenant·e·s',
		hash: EDITOR_FORM_ID,
	},
	{
		subpath: '/echeancier',
		title: 'Échéancier',
		hash: EDITOR_FORM_ID,
	},
	{
		subpath: '/materiaux',
		title: 'Matériaux',
		hash: EDITOR_FORM_ID,
	},
];
