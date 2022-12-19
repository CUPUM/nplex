// /// <reference types="@sveltejs/kit" />

import type { Database } from '$types/database';
import type { DatabaseBuff } from '$types/databaseBuff';
import type { Category } from '$utils/enums';
import type { AuthSession, SupabaseClient } from '@supabase/supabase-js';
import type { DeepOmit, DeepPick } from 'ts-essentials';

type Session = DeepOmit<AuthSession, { user: { role: never } }> & {
	user: { role: Database['public']['Enums']['user_role'] } & Pick<
		App.DatabaseSchema['public']['Tables']['users']['Row'],
		'avatar_url' | 'first_name' | 'public_email'
	>;
};

declare global {
	namespace svelte.JSX {
		// Extend elements typing to allow custom attributes added using `use` directives (actions).
		interface HTMLAttributes<T> {
			onclickoutside?: (event?: CustomEvent) => unknown;
			onenter?: (event?: CustomEvent) => unknown;
			onleave?: (event?: CustomEvent) => unknown;
		}
	}
	namespace App {
		type DatabaseSchema = Database & DatabaseBuff;
		interface PageData {
			/**
			 * Nplex-specific session derived from Supabase session.
			 */
			session?: Session;
			category?: Category;
			showCategoryNav: boolean;
			showFooter: boolean;
		}
		interface Locals {
			/**
			 * 1-to-1 correspondance with the app session cookie, used as source to populate locals. Keep
			 * content to a minimum (essential data only) while adhering to a partial App.PageData shape.
			 */
			session?: DeepPick<
				Session,
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
			 * Database client instance confined to lifecycle of individual request event.
			 */
			db?: SupabaseClient<App.DatabaseSchema>;
		}
		// interface Error extends Partial<PostgrestError> {
		// 	// Add additional custom error props here.
		// }
		// interface Platform {}
	}
}
