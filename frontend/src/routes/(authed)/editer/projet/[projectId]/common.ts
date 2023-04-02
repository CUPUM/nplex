import { enhance } from '$app/forms';
import { page } from '$app/stores';
import { messages } from '$routes/MessagesOutlet.svelte';
import { getFailureMessages } from '$utils/validation';
import type { ActionResult } from '@sveltejs/kit';
import { get, writable, type Writable } from 'svelte/store';
import { updating } from '../../common';
import { EDITOR_FORM_ID } from '../../constants';
import type { LayoutData } from './$types';

export const descriptors = writable<LayoutData['descriptors']>();

export const project = writable<LayoutData['project']>();

export function composeSectionHref(projectId: string, subpath: string, hash?: string) {
	return '/editer/projet/' + projectId + subpath + (hash ? `#${hash}` : '');
}

export function enhanceProjectForm(
	form: HTMLFormElement,
	{
		stateStore = updating,
		afterUpdate,
	}: { stateStore?: Writable<boolean>; afterUpdate?: (result: ActionResult) => any } = {}
) {
	enhance(form, (submit) => {
		stateStore.set(true);
		return async (action) => {
			await action.update({ reset: false });
			if (action.action.pathname !== get(page).url.pathname)
				if (action.result.type === 'failure') {
					messages.error(...getFailureMessages(action.result));
				}
			afterUpdate && afterUpdate(action.result);
			stateStore.set(false);
		};
	});
}

// enhance={(a) => {
// 	creating = true;
// 	return async (f) => {
// 		await f.update({ reset: false });
// 		creating = false;
// 		if (f.result.type === 'success') {
// 			close();
// 		} else if (f.result.type === 'failure') {
// 			messages.error(...getFailureMessages(f.result));
// 		}
// 	};
// }}

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
		subpath: '/contributions',
		title: 'Contributions',
		hash: EDITOR_FORM_ID,
	},
	{
		subpath: '/calendrier',
		title: 'Calendrier',
		hash: EDITOR_FORM_ID,
	},
	{
		subpath: '/materiaux',
		title: 'Matériaux',
		hash: EDITOR_FORM_ID,
	},
];

export const settings = {
	subpath: '/parametres',
	title: 'Paramètres',
	hash: EDITOR_FORM_ID,
};
