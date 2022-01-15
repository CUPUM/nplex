// export function getSegments(url?: string): string[] {
// 	url = url || location.pathname;
// 	return url.replace(/#.*$/,'').replace(/^\/+/, '').split('/').map(segment => '/' + segment);
// };

/**
 * @param obj
 * @returns
 */
export function objectToURLSearchParams(obj: Record<string, unknown>): URLSearchParams {
	Object.entries(obj);
	return;
}

/**
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

/**
 * @param obj Object to be cleaned
 * @returns Object stripped of keys with empty values
 */
export function removeEmptyKeys(obj: Record<string | number, unknown>) {
	return Object.fromEntries(
		Object.entries(obj)
			.filter(([k, v]) => v != null || v != '')
			.map(([k, v]) => [
				k,
				typeof v === 'object' ? removeEmptyKeys(v as Record<string | number, unknown>) : v
			])
	);
}

/**
 * @param f
 * @param delay
 * @returns
 */
export function debounce(f: (...args) => unknown, delay = 250) {
	let timer = null;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			timer = null;
			f(...args);
		}, delay);
	};
}
