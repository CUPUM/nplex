import { base } from '$app/paths';

const DEBOUNCE_RATE = 500;
const BASE_REGEX = RegExp('^' + base);

/**
 * Create an URL object from an optionally relative href string to facilitate URL parsing and other
 * tasks with independant URL components. Useful for handling params when concerned with in-app,
 * root-relative, URLs.
 */
export class UnbasedURL extends URL {
	constructor(url: ConstructorParameters<typeof URL>[0]) {
		super(
			url,
			url instanceof URL || !url.startsWith('/') ? undefined : 'http://www.placeholder.com'
		);
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
 * Takes a given href slices the first character and prepends a slash. Useful to sanitize urls
 * obtrained form redirect search params by breaking non-internal hrefs, effectively leading to 404s
 * in unsafe cases.
 */
export function forceInternalHref(href: string) {
	return `/${href.slice(1)}`;
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
// export function objectToURLSEARCH_PARAMSs(obj: Record<string, unknown>): URLSEARCH_PARAMSs {
// 	Object.entries(obj);
// 	return;
// }

// /**
//  * To do.
//  */
// export function URLSEARCH_PARAMSsToObject(params: URLSEARCH_PARAMSs) {
// 	const obj = {};
// 	params.forEach((v: string, k: string) => {
// 		obj[k] = v;
// 	});
// 	return obj;
// }

// let projectsFiltersUrlDebouncer: any;

// export function updateURLFromProjectsFilters(filters: StoreValue<typeof projectsFilters>) {
// 	if (browser) {
// 		if (projectsFiltersUrlDebouncer) clearTimeout(projectsFiltersUrlDebouncer);
// 		const newUrl = get(page).url;
// 		projectsFiltersUrlDebouncer = setTimeout(() => {
// 			// Update client's url.
// 			Object.keys(filters).map((k) => {
// 				// Clear search params of any ignored values.
// 				const encodedKey = encodeURIComponent(k);
// 				if (filters[k].ignore) {
// 					if (newUrl.searchParams.has(encodedKey)) {
// 						newUrl.searchParams.delete(encodedKey);
// 					}
// 				}
// 				// Else set non-ignored values.
// 				else {
// 					newUrl.searchParams.set(encodedKey, encodeURIComponent(JSON.stringify(filters[k].value)));
// 				}
// 			});
// 			// Update the url in the client's navbar.
// 			goto(newUrl, {
// 				replaceState: true,
// 				keepfocus: true,
// 				noscroll: true,
// 			});
// 		}, DEBOUNCE_RATE);
// 	}
// }
