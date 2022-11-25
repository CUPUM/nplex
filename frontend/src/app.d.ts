/// <reference types="@sveltejs/kit" />

import type { ThemeClass } from '$routes/AppThemes.svelte';
import type { Category } from '$types/categories';
import type { Database } from '$types/database';
import type { DatabaseRpc } from '$types/databaseRpc';
import type { PostgrestError, Session, SupabaseClient } from '@supabase/supabase-js';
import type { DeepOmit, DeepPick } from 'ts-essentials';

type NplexSession = DeepOmit<Session, { user: { role: never } }> & {
	user: { role: Database['public']['Enums']['user_role'] } & Pick<
		App.DatabaseSchema['public']['Tables']['users']['Row'],
		'avatar_url' | 'first_name' | 'public_email'
	>;
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
			session?: NplexSession;
			category?: Category;
			showCategoryNav: boolean;
			showFooter: boolean;
			theme: keyof typeof ThemeClass;
		}
		interface Locals {
			/**
			 * 1-to-1 correspondance with the nplex_session cookie since locals are populated with
			 * it. Keep content to a minimum (essential data only) while adhering to a partial
			 * App.PageData shape.
			 */
			session?: DeepPick<
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
			>;
			/**
			 * Database client instance confined to individual request event lifecycle.
			 */
			db?: SupabaseClient<App.DatabaseSchema>;
			theme: App.PageData['theme'];
		}
		interface Error extends Partial<PostgrestError> {
			// Add additional custom error props here.
		}
		interface Platform {}
	}
}
