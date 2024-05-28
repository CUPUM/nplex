// See https://kit.svelte.dev/docs/types#app

import type { AvailableLanguageTag } from '$i18n/runtime';
import type { ToastData } from '$lib/components/Toast.svelte';
import type { ModeSetting } from '$lib/modes/constants';
import type { Presentation } from '$lib/presentation/constants';
import type { Session, User } from 'lucia';
import type { ComponentType } from 'svelte';

declare global {
	namespace App {
		// See https://github.com/ciscoheat/sveltekit-superforms/issues/261
		namespace Superforms {
			type Message =
				| string
				| (Pick<ToastData, 'title' | 'description' | 'type'> & {
						closeDelay?: number;
				  });
		}
		interface Error {
			code?: string;
			message: string;
		}
		interface Locals {
			authed: {
				user: User;
				session: Session;
			} | null;
			mode: ModeSetting;
			lang: AvailableLanguageTag;
			presentation: Presentation;
		}
		interface PageData {
			lang: AvailableLanguageTag;
			user: User | null;
			presentation: Presentation;
			navbar?: {};
			footer?: {
				hidden?: boolean;
			};
			dashboard?: {
				header?: ComponentType;
				sidebar?: ComponentType;
				footer?: ComponentType;
			};
		}
	}
}

export {};
