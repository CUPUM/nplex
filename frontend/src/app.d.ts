/// <reference types="@sveltejs/kit" />

import type { Category } from '$types/categories';
import type { Database } from '$types/database';
import type { DatabaseRpc } from '$types/databaseRpc';
import type { PostgrestError, Session, SupabaseClient } from '@supabase/supabase-js';
import type { DeepOmit, DeepPick } from 'ts-essentials';

// type NplexSession = Omit<Session, 'user'> & { user: Omit<Session['user'], 'role'> } & {
// 	user: { role: Database['public']['Enums']['user_role'] };
// };

type NplexSession = DeepOmit<Session, { user: { role: never } }> & {
	user: { role: Database['public']['Enums']['user_role'] };
};

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
		type DatabaseSchema = Database & DatabaseRpc;
		interface PageData {
			/**
			 * Nplex-specific session derived from Supabase session.
			 */
			session: NplexSession | null;
			category: Category | null;
			showCategoryNav: boolean;
			showFooter: boolean;
		}
		interface Locals {
			/**
			 * 1-to-1 correspondance with the nplex_session cookie since locals are populated with
			 * it. Keep content to a minimum (essential data only) while adhering to a partial
			 * App.PageData shape.
			 */
			session: DeepPick<
				NplexSession,
				{
					access_token: true;
					refresh_token: true;
					expires_at: true;
					expires_in: true;
					provider_refresh_token: true;
					provider_token: true;
					user: { id: true; role: true };
				}
			> | null;
			/**
			 * Database client instance confined to individual request event lifecycle.
			 */
			db?: SupabaseClient<App.DatabaseSchema>;
		}
		interface Error extends Partial<PostgrestError> {
			// Add additional custom error props here.
		}
		interface Platform {}
	}
}
