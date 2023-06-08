// See https://kit.svelte.dev/docs/types#app

import type { Locale } from '$lib/i18n/locales';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locale: Locale;
			db: any;
		}
		interface PageData {
			locale: Locale;
		}
		// interface Platform {}
	}
}

export {};
