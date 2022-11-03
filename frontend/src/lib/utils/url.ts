import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { base } from '$app/paths';
import { page } from '$app/stores';
import type { projectsFilters } from '$stores/projects';
import type { StoreValue } from '$types/helpers';
import { get } from 'svelte/store';

const DEBOUNCE_RATE = 500;
const BASE_REGEX = RegExp('^' + base);

/**
 * Create an URL object from or for a relative url to facilitate URL parsing and other tasks when the full href isn't
 * necessary. Useful for handling params when concerned with in-app, root-relative, URLs.
 */
export class RelativeURL extends URL {
	constructor(url: ConstructorParameters<typeof URL>[0]) {
		const fallbackBase = 'http://www.himom.com';
		super(url, fallbackBase);
	}
	get href() {
		return super.href.replace(super.origin, '');
	}
	get host() {
		return '';
	}
	get hostname() {
		return '';
	}
	get origin() {
		return '';
	}
	get port() {
		return '';
	}
	get protocol() {
		return '';
	}
	toString() {
		return super.toString().replace(super.origin, '');
	}
	toJSON() {
		return super.toJSON().replace(super.origin, '');
	}
}

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

// /**
//  * To do.
//  */
// export function objectToURLSearchParams(obj: Record<string, unknown>): URLSearchParams {
// 	Object.entries(obj);
// 	return;
// }

// /**
//  * To do.
//  */
// export function URLSearchParamsToObject(params: URLSearchParams) {
// 	const obj = {};
// 	params.forEach((v: string, k: string) => {
// 		obj[k] = v;
// 	});
// 	return obj;
// }

let projectsFiltersUrlDebouncer: any;

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
