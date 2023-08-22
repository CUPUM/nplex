// See https://kit.svelte.dev/docs/types#app

import type { Locale } from '$lib/i18n/constants';
import type { Theme } from '$lib/themes/validation';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			/**
			 * Client's language as determined by the i18n middleware.
			 */
			locale: Locale;
			/**
			 * Private theme_mode value for handle hook.
			 */
			theme: Theme;
		}
		interface PageData {
			/**
			 * Client-forwarded locals.locale
			 */
			locale: App.Locals['locale'];
			/**
			 * Client-forwarded locals.theme
			 */
			theme: App.Locals['theme'];
		}
		// interface Platform {}
	}
}

export {};
