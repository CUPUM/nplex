import { base } from '$app/paths';

/**
 * To do.
 */
export function getSegments(routePath: string) {
	return routePath
		.replace(base, '')
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
