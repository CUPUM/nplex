// /// <reference types="@sveltejs/kit" />

import type { POPOVER_OPEN_ATTR } from '$components/Popover.svelte';
import type { BuffedDatabase } from '$types/database/buff';
import type { TableRow } from '$types/database/utils';
import type { Category } from '$utils/enums';
import type { ThemeName } from '$utils/themes';
import type { AuthSession, SupabaseClient } from '@supabase/supabase-js';
import type { DeepOmit, DeepPick } from 'ts-essentials';

type UserSession = DeepOmit<AuthSession, { user: { role: never } }> & {
	user: { role: App.Database['public']['Enums']['app_role'] } & Pick<
		TableRow<'users'>,
		'avatar_url' | 'first_name' | 'public_email'
	>;
};

declare global {
	// For reference, read: https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md#im-using-an-attributeevent-on-a-dom-element-and-it-throws-a-type-error
	namespace svelteHTML {
		interface HTMLAttributes<T> {
			[POPOVER_OPEN_ATTR]?: '';
			'data-theme'?: ThemeName;
		}
	}

	interface HTMLOptionElement {
		__value: unknown;
	}

	interface HTMLInputElement {
		__value?: unknown;
	}

	namespace App {
		type Database = BuffedDatabase;
		interface PageData {
			/**
			 * Nplex-specific session derived from Supabase session.
			 */
			session?: UserSession;
			category?: Category;
			showCategoryNavbar?: boolean;
			showFooter?: boolean;
			theme?: ThemeName;
		}
		interface Locals {
			/**
			 * 1-to-1 correspondance with the app session cookie, used as source to populate locals. Keep
			 * content to a minimum (essential data only) while adhering to a partial App.PageData shape.
			 */
			session?: DeepPick<
				UserSession,
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
			db?: SupabaseClient<App.Database>;
		}
	}
}
