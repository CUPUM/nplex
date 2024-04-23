import { availableLanguageTags, languageTag, type AvailableLanguageTag } from '$i18n/runtime';
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
export function withLang(location: string, lang: AvailableLanguageTag = languageTag()) {
	if (location.startsWith('/')) {
		return `/${lang}${location}`;
	}
	return location;
}
