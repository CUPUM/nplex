import { PUBLIC_DOMAIN_NAME } from '$env/static/public';
import type { AvailableLanguageTag } from '$i18n/runtime';

/**
 * Prepend the necessary url components to have a full app url for external use, such as in emails.
 *
 * @param href Application-oriented absolute href, must start with a '/'.
 */
export function appUrl(
	href: string,
	{
		protocol = 'https',
		lang,
	}: {
		protocol?: 'https' | 'http' | undefined;
		lang?: AvailableLanguageTag;
	} = {}
) {
	const _protocol = protocol ? `${protocol}://` : '';
	const _base = `${PUBLIC_DOMAIN_NAME}/`;
	const _lang = lang || '';
	return `${_protocol}${_base}${_lang}${href}`;
}

/**
 * Helper to do inline deletion of search params and get back the result as a new search params
 * instance.
 */
export function deleteSearchParams(searchParams: URLSearchParams, ...remove: string[]) {
	const params = new URLSearchParams(searchParams);
	remove.forEach((key) => params.delete(key));
	return params;
}

/**
 * Helper to do inline update of search params and get back the result as a new search params
 * instance.
 */
export function setSearchParams(searchParams: URLSearchParams, ...set: [string, string][]) {
	const params = new URLSearchParams(searchParams);
	set.forEach(([key, value]) => params.set(key, value));
	return params;
}
