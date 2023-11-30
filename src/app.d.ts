// See https://kit.svelte.dev/docs/types#app

import type { AvailableLanguageTag } from '$i18n/runtime';
import type { Auth as LuciaAuth } from '$lib/auth/auth.server';
import type { ToastData } from '$lib/components/Toast.svelte';
import type { users } from '$lib/db/schema/accounts';
import type { createEventRedirect } from '$lib/i18n/event';
import type { eventLocalize } from '$lib/i18n/localize.server';
import type { Mode } from '$lib/modes/constants';
import type { Setout } from '$lib/setout/constants';
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
	namespace svelteHTML {
		interface HTMLAttributes {
			// In-markup narrowing is not happening.
			'data-mode'?: Mode;
		}
	}
	namespace App {
		// See https://github.com/ciscoheat/sveltekit-superforms/issues/261
		namespace Superforms {
			type Message = Pick<ToastData, 'title' | 'description' | 'type'> & {
				closeDelay?: number;
			};
		}
		// Svelte-kit related types.
		interface Error {
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
			lang: AvailableLanguageTag;
			/**
			 * Pre-localized redirect helper.
			 */
			redirect: ReturnType<typeof createEventRedirect>;
			/**
			 * Event-scoped location formatter.
			 */
			localize: ReturnType<typeof eventLocalize>;
		}
		interface PageData {
			/**
			 * Client-forwarded locals.lang.
			 */
			lang: App.Locals['lang'];
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
			 * Optionally hide navbar's scrolled bg.
			 */
			navbar?: {
				noBackground?: boolean;
			};
			/**
			 * Dashboard ((private) route group) compositional components and data.
			 */
			dashboard?: {
				header?: ComponentType;
				sidebar?: ComponentType;
				footer?: ComponentType;
			};
			/**
			 * Short-life cookie-persisted flash message.
			 */
			flash?: App.Superforms.Message;
		}
		// interface Platform {}
	}
}

export {};
