// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { Locale } from '$lib/i18n/locales';
import type { Theme } from '$lib/theming/themes';

declare global {
	/**
	 * @see https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md#im-using-an-attributeevent-on-a-dom-element-and-it-throws-a-type-error
	 */
	namespace svelteHTML {
		interface HTMLAttributes<T> {
			'data-theme-mode'?: ThemeMode;
		}
	}

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
			/**
			 * Request-scoped db client.
			 */
			db?: any;
			/**
			 * Authed user's session.
			 */
			session?: any;
		}
		interface PageData {
			locale: App.Locals['locale'];
			session?: App.Locals['session'];
			theme: App.Locals['theme'];
		}
		// interface Platform {}
	}
}

export {};
