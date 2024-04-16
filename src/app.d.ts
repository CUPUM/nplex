// See https://kit.svelte.dev/docs/types#app

import type { AvailableLanguageTag } from '$i18n/runtime';
import type { Arrangement } from '$lib/arrangement/constants';
import type { createSetEventArrangement } from '$lib/arrangement/event';
import type { ToastData } from '$lib/components/Toast.svelte';
import type { Mode } from '$lib/modes/constants';
import type { Session, User } from 'lucia';
import type { ComponentType } from 'svelte';
import type { LayoutData } from './routes/[[lang=lang]]/$types';

declare global {
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
			/**
			 * Authenticated user.
			 */
			user: User | null;
			/**
			 * Authentication session.
			 */
			session: Session | null;
			/**
			 * Private theme_mode value for handle hook.
			 */
			mode: Mode;
			/**
			 * Layout types that can then be used for conditional styling such as navbar's max width.
			 */
			setout?: Arrangement;
			/**
			 * Set a new setout and return the value to pass it down through event data.
			 */
			setArrangement: ReturnType<typeof createSetEventArrangement>;
			/**
			 * Client's language as determined by the i18n middleware.
			 */
			lang: AvailableLanguageTag;
		}
		interface PageData extends LayoutData {
			setout?: Arrangement;
			navbar?: {};
			footer?: {
				hide?: boolean;
			};
			dashboard?: {
				header?: ComponentType;
				sidebar?: ComponentType;
				footer?: ComponentType;
			};
			flash?: App.Superforms.Message;
		}
	}
}

export {};
