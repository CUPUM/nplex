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

// export class AppURL extends URL {
// 	#lang;
// 	constructor(
// 		url: string | AppURL,
// 		{ protocol = 'https', lang }: { protocol?: 'https' | 'http'; lang?: AvailableLanguageTag } = {}
// 	) {
// 		const base = [];
// 		const path = [];
// 		if (protocol) {
// 			base.push(protocol + '://');
// 		}
// 		base.push(PUBLIC_DOMAIN_NAME);
// 		if (lang) {
// 			path.push(lang);
// 		}
// 		path.push(url);
// 		super(path.join('/'), base.join(''));
// 		this.#lang = lang;
// 	}

// 	get lang() {
// 		return this.#lang;
// 	}

// 	set lang(value: AvailableLanguageTag | undefined) {
// 		const nolang = removeLang(this.pathname);
// 		this.pathname = value ? withLang(nolang, value) : nolang;
// 	}
// }
