// See https://kit.svelte.dev/docs/types#app

import type { AvailableLanguageTag } from '$i18n/runtime';
import type { ToastData } from '$lib/components/Toast.svelte';
import type { Mode } from '$lib/modes/constants';
import type { Setout } from '$lib/setout/constants';
import type { createSetEventSetout } from '$lib/setout/event';
import type { Session, User } from 'lucia';
import type { ComponentType } from 'svelte';
import type { LayoutData } from './routes/[[lang=lang]]/$types';

declare global {
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
			user: User | null;
			session: Session | null;
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
			 * Optionally control display of footer.
			 */
			footer?: {
				hide?: boolean;
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
