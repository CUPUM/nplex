// See https://kit.svelte.dev/docs/types#app

import type { AvailableLanguageTag } from '$i18n/runtime';
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
			code: string;
			message: string;
		}
		interface Locals {
			user: User | null;
			session: Session | null;
			mode: Mode;
			lang: AvailableLanguageTag;
		}
		interface PageData extends LayoutData {
			navbar?: {};
			footer?: {
				hidden?: boolean;
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
