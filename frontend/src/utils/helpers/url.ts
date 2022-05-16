import { base } from '$app/paths';

export function getSegments(url: URL) {
	return url.pathname
		.replace(base, '')
		.replace(/^\/+/, '')
		.split('/')
		.map((segment) => '/' + segment);
}

/**
 * To do
 *
 * @param obj
 * @returns
 */
export function objectToURLSearchParams(obj: Record<string, unknown>): URLSearchParams {
	Object.entries(obj);
	return;
}

/**
 * To do
 *
 * @param params
 * @returns
 */
export function URLSearchParamsToObject(params: URLSearchParams) {
	const obj = {};
	params.forEach((v: string, k: string) => {
		obj[k] = v;
	});
	return obj;
}
