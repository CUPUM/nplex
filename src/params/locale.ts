import { isLocale } from '$lib/i18n/validation';
import type { ParamMatcher } from '@sveltejs/kit';

export const match = isLocale satisfies ParamMatcher;
