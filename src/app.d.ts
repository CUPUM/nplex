// See https://kit.svelte.dev/docs/types#app

import type { AvailableLanguageTag } from '$i18n/runtime';
import type { ToastParameters } from '$lib/builders/toasts.svelte';
import type { Presentation } from '$lib/presentation/constants';
import type { ThemeSetting } from '$lib/theme/constants';
import type { ParaglideLocals } from '@inlang/paraglide-sveltekit';
import type { Session, User } from 'lucia';

declare global {
	namespace App {
		namespace Superforms {
			type Message = string | ToastParameters<string>;
		}
		interface Error {
			code?: string;
			message: string;
		}
		interface Locals {
			user: User | null;
			session: Session | null;
			theme: ThemeSetting;
			paraglide: ParaglideLocals<AvailableLanguageTag>;
			presentation: Presentation;
		}
		interface PageData {
			flash?: ToastParameters<string>;
			user: User | null;
			presentation: Presentation;
			navbar?: {};
			footer?: {
				hidden?: boolean;
			};
		}
		interface PageState {}
	}
}

export {};
