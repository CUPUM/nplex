/// <reference types="@sveltejs/kit" />

import type { Category } from '$types/categories';
import type { Database } from '$types/database';
import type { PostgrestError, Session } from '@supabase/supabase-js';

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
			/**
			 * Nplex-specific session derived from Supabase session.
			 */
			session:
				| (Session & {
						user: Omit<Session['user'], 'role'> & {
							role: Database['public']['Tables']['users_roles']['Row']['role'];
						};
				  })
				| null;
			/**
			 * User id of the previous auth attempt returned by invalidating /api/auth/session.json.
			 */
			previousSessionId: string | null;
			category: Category;
			showCategoryNav: boolean;
			showFooter: boolean;
		}
		interface Locals {
			session: App.PageData['session'];
		}
		interface Error extends Partial<PostgrestError> {
			// Add additional custom error props here.
		}
		interface Platform {}
	}
}
