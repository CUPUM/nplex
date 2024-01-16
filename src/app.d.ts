// See https://kit.svelte.dev/docs/types#app

import type { AvailableLanguageTag } from '$i18n/runtime';
import type { Auth as LuciaAuth } from '$lib/auth/authentication.server';
import type { ToastData } from '$lib/components/Toast.svelte';
import type { AuthorizeRequest } from '$lib/db/handle.server';
import type { users } from '$lib/db/schema/accounts';
import type { Mode } from '$lib/modes/constants';
import type { Setout } from '$lib/setout/constants';
import type { createSetEventSetout } from '$lib/setout/event';
import type { InferSelectModel } from 'drizzle-orm';
import type { AuthRequest } from 'lucia';
import type { ComponentType } from 'svelte';
import type { LayoutData } from './routes/[[lang=lang]]/$types';

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
		interface Error {
			title?: string;
			message: string;
		}
		interface PageState {
			/**
			 * Project descriptor id or string literal for new descriptors modal.
			 */
			editor?: unknown;
		}
		interface Locals {
			auth: AuthRequest;
			authorize: AuthorizeRequest;
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
		}
		interface PageData extends LayoutData {
			// /**
			//  * Authorization policy boolean values.
			//  *
			//  * @todo Strictly type record keys.
			//  */
			// authorize: Record<string, boolean>;
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
