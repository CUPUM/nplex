import { browser } from '$app/environment';
import { page } from '$app/stores';
import { availableLanguageTags, languageTag, type AvailableLanguageTag } from '$i18n/runtime';

let currentUrl = $state<URL>();

if (browser) {
	page.subscribe(({ url }) => {
		currentUrl = url;
	});
}

/**
 * Split an app-relative location into its lang param and the tail end of the href.
 */
export function splitLang(location: string) {
	const [_, maybeLang, ...tail] = location.split('/');
	const lang = availableLanguageTags.includes(maybeLang as AvailableLanguageTag)
		? (maybeLang as AvailableLanguageTag)
		: undefined;
	return {
		lang,
		tail: `/${tail.join('/')}`,
	};
}

/**
 * Remove the lang param from an app-relative location if any root lang param is found.
 */
export function removeLang<T extends string>(location: `/${AvailableLanguageTag}${T}` | T) {
	const { lang, tail } = splitLang(location);
	if (lang) {
		return tail as T;
	}
	return location as T;
}

/**
 * Prepend a lang param to an app-relative location without lang param.
 */
export function withLang<T extends string>(
	location: T,
	lang: AvailableLanguageTag = languageTag()
) {
	return `/${lang}${location}` as `/${typeof lang}${T}`;
}

/**
 * Detect if a given app-relaative location is the client's current location. Handles a few fallback
 * cases with hash and search params.
 */
function isCurrentLocation(location: string) {
	let current = $derived(
		currentUrl &&
			(currentUrl.pathname === location ||
				`${currentUrl.pathname}${currentUrl.hash}` ||
				currentUrl.href.replace(currentUrl.origin, '') === location)
			? ('page' as const)
			: undefined
	);
	return {
		get() {
			return current;
		},
	};
}

export function link<T extends string>(location: T, lang: AvailableLanguageTag = languageTag()) {
	const href = withLang(location, lang);
	const current = isCurrentLocation(href);
	return {
		href,
		get 'aria-current'() {
			return current.get();
		},
	};
}
