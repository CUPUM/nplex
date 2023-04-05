import { enhance } from '$app/forms';
import { page } from '$app/stores';
import { messages } from '$routes/MessagesOutlet.svelte';
import { createDirtyStores } from '$utils/store';
import { getFailureMessages } from '$utils/validation';
import type { ActionResult } from '@sveltejs/kit';
import { get, writable, type Writable } from 'svelte/store';

export const { dirtyValues, isDirty } = createDirtyStores();

export const updating = writable(false);

export function enhanceEditor(
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
