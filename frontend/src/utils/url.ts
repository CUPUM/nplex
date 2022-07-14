import { browser } from '$app/env';
import { goto } from '$app/navigation';
import { base } from '$app/paths';
import { page } from '$app/stores';
import type { projectsFilters } from '$stores/projects';
import type { StoreValue } from '$types/helpers';
import { get } from 'svelte/store';

/**
 * Debounce interval for reactive percolation to client's navbar url. In miliseconds.
 */
const DEBOUNCE_RATE = 500;

const BASE_REGEX = RegExp('^' + base);

/**
 * To do.
 */
export function getSegments(routePath: string) {
	return routePath
		.replace(BASE_REGEX, '')
		.replace(/^\/+/, '')
		.split('/')
		.map((segment) => '/' + segment);
}

/**
 * To do.
 */
export function objectToURLSearchParams(obj: Record<string, unknown>): URLSearchParams {
	Object.entries(obj);
	return;
}

/**
 * To do.
 */
export function URLSearchParamsToObject(params: URLSearchParams) {
	const obj = {};
	params.forEach((v: string, k: string) => {
		obj[k] = v;
	});
	return obj;
}

let projectsFiltersUrlDebouncer;

export function updateURLFromProjectsFilters(filters: StoreValue<typeof projectsFilters>) {
	if (browser) {
		if (projectsFiltersUrlDebouncer) clearTimeout(projectsFiltersUrlDebouncer);
		const newUrl = get(page).url;
		projectsFiltersUrlDebouncer = setTimeout(() => {
			// Update client's url.
			Object.keys(filters).map((k) => {
				// Clear search params of any ignored values.
				const encodedKey = encodeURIComponent(k);
				if (filters[k].ignore) {
					if (newUrl.searchParams.has(encodedKey)) {
						newUrl.searchParams.delete(encodedKey);
					}
				}
				// Else set non-ignored values.
				else {
					newUrl.searchParams.set(encodedKey, encodeURIComponent(JSON.stringify(filters[k].value)));
				}
			});
			// Update the url in the client's navbar.
			goto(newUrl, {
				replaceState: true,
				keepfocus: true,
				noscroll: true,
			});
		}, DEBOUNCE_RATE);
	}
}
