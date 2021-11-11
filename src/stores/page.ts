import { page } from '$app/stores';
import { getSegments } from '$utils/url';
import { derived } from 'svelte/store';

export const pagePath = derived(
	page,
	page => getSegments(page.path)
);