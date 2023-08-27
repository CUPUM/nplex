// See https://kit.svelte.dev/docs/types#app

import type { Auth as LuciaAuth } from '$lib/auth/auth.server';
import type { users } from '$lib/db/schema/users';
import type { Locale } from '$lib/i18n/constants';
import type { Mode } from '$lib/modes/constants';
import type { InferSelectModel } from 'drizzle-orm';
import type { AuthRequest } from 'lucia';

// See https://lucia-auth.com/getting-started
declare global {
	namespace Lucia {
		type Auth = LuciaAuth;
		type DatabaseUserAttributes = InferSelectModel<typeof users>;
		type DatabaseSessionAttributes = {
			//
		};
	}
}

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: AuthRequest;
			user: Lucia.DatabaseUserAttributes;
			session: Lucia.DatabaseSessionAttributes;
			/**
			 * Client's language as determined by the i18n middleware.
			 */
			locale: Locale;
			/**
			 * Private theme_mode value for handle hook.
			 */
			mode: Mode;
		}
		interface PageData {
			/**
			 * Client-forwarded locals.locale.
			 */
			locale: App.Locals['locale'];
			/**
			 * Client-forwarded locals.theme.
			 */
			mode: App.Locals['mode'];
		}
		// interface Platform {}
	}
}

export {};
