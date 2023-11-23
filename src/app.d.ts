// See https://kit.svelte.dev/docs/types#app

import type { Auth as LuciaAuth } from '$lib/auth/auth.server';
import type { ToastData } from '$lib/components/Toast.svelte';
import type { users } from '$lib/db/schema/accounts';
import type { Locale } from '$lib/i18n/constants';
import type { eventLocalize } from '$lib/i18n/localize.server';
import type { eventI18nRedirect } from '$lib/i18n/redirect.server';
import type { eventCreateTranslations } from '$lib/i18n/translate';
import type { Mode } from '$lib/modes/constants';
import type { createSetEventSetout } from '$lib/setout/event';
import type { InferSelectModel } from 'drizzle-orm';
import type { AuthRequest, User } from 'lucia';
import type { ComponentType } from 'svelte';

// for information about these interfaces
declare global {
	// See https://lucia-auth.com/getting-started
	namespace Lucia {
		type Auth = LuciaAuth;
		type DatabaseUserAttributes = Pick<
			InferSelectModel<typeof users, { dbColumnNames: true }>,
			'email' | 'email_verified' | 'role' | 'github_username'
		>;
		type DatabaseSessionAttributes = {
			// to do
		};
	}
	namespace App {
		// See https://github.com/ciscoheat/sveltekit-superforms/issues/261
		namespace Superforms {
			type Message = (Pick<ToastData, 'title' | 'description' | 'type'> & {
				closeDelay?: number;
			})[];
		}
		// Svelte-kit related types.
		interface Error {
			code?: number;
			title?: string;
			message: string;
		}
		interface Locals {
			auth: AuthRequest;
			/**
			 * Private theme_mode value for handle hook.
			 */
			mode: Mode;
			/**
			 * Layout types that can then be used for conditional styling such as navbar's max width.
			 */
			setout?: Setout;
			/**
			 * Set a new setout and return the value to pass it down through event data.
			 */
			setSetout: ReturnType<typeof createSetEventSetout>;
			/**
			 * Client's language as determined by the i18n middleware.
			 */
			locale: Locale;
			/**
			 * Pre-localized redirect helper.
			 */
			redirect: ReturnType<typeof eventI18nRedirect>;
			/**
			 * Event-scoped location formatter.
			 */
			localize: ReturnType<typeof eventLocalize>;
			/**
			 * Event-localized translations helper.
			 */
			createTranslations: ReturnType<typeof eventCreateTranslations>;
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
			/**
			 * Populating the client $page.data store with a minimal user for simple UI checks.
			 */
			user?: Omit<User, 'userId'>;
			/**
			 * Granular server and client setable layout type.
			 */
			setout?: Setout;
			/**
			 * Dashboard ((private) route group) compositional components and data.
			 */
			dashboard?: {
				header?: ComponentType;
				sidebar?: ComponentType;
				footer?: ComponentType;
			};
			flash?: App.Superforms.Message;
		}
		// interface Platform {}
	}
}

export {};
