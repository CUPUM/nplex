/// <reference types="@sveltejs/kit" />

import type { Database } from '$types/database';
import type { Session } from '@supabase/supabase-js';

declare global {
	// Extend elements typing to allow custom attributes added using `use` directives (actions).
	namespace svelte.JSX {
		interface HTMLAttributes<T> {
			onclickoutside?: (event?: CustomEvent) => unknown;
			onenter?: (event?: CustomEvent) => unknown;
			onleave?: (event?: CustomEvent) => unknown;
		}
	}
	// Customize svelte's globals.
	namespace App {
		interface PageData {
			session?:
				| (Session & {
						user: Omit<Session['user'], 'role'> & {
							role: Database['public']['Tables']['users_roles']['Row']['role'];
						};
				  })
				| null;
			category: Category;
			showCategoryNav: boolean;
			showFooter: boolean;
		}
		interface Locals {
			session: App.PageData['session'];
		}
		interface Error {
			notify?: boolean;
		}
		interface Platform {}
	}
}
