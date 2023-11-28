import { availableLanguageTags, type AvailableLanguageTag } from '$i18n/runtime';
import { z } from 'zod';

export function isAvailableLang(maybeLang: unknown): maybeLang is AvailableLanguageTag {
	return availableLanguageTags.indexOf(maybeLang as AvailableLanguageTag) > -1;
}

export const langSchema = z.custom<AvailableLanguageTag>((val) => isAvailableLang(val));
