// export function getSegments(url?: string): string[] {
// 	url = url || location.pathname;
// 	return url.replace(/#.*$/,'').replace(/^\/+/, '').split('/').map(segment => '/' + segment);
// };

export function objectToURLSearchParams(obj: Record<string, unknown>): URLSearchParams {
	Object.entries(obj);
	return 
}

export function URLSearchParamsToObject(params: URLSearchParams) {
	const obj = {};
	params.forEach((v: string, k: string) => {
	  obj[k] = v;
	});
	return obj;
};