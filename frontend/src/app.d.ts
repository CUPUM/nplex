// /// <reference types="@sveltejs/kit" />

import type { POPOVER_OPEN_ATTR } from '$components/Popover.svelte';
import type { BuffedDatabase } from '$types/database/buff';
import type { ViewRow } from '$types/database/utils';
import type { NonUndefinable } from '$types/utils';
import type { Category } from '$utils/enums';
import type { ThemeName } from '$utils/themes';
import type { AuthSession, SupabaseClient } from '@supabase/supabase-js';
import type { SvelteComponent } from 'svelte';
import type { DeepOmit, DeepPick } from 'ts-essentials';

declare global {
	/**
	 * @see https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md#im-using-an-attributeevent-on-a-dom-element-and-it-throws-a-type-error
	 */
	namespace svelteHTML {
		interface HTMLAttributes<T> {
			[POPOVER_OPEN_ATTR]?: '';
			'data-theme'?: ThemeName;
		}
	}

	// Force-adding typing for svelte's internally used element property.
	interface HTMLOptionElement {
		__value: unknown;
	}
	interface HTMLInputElement {
		__value?: unknown;
	}

	namespace App {
		/**
		 * Database's general schema, including manual buffs.
		 */
		type Database = BuffedDatabase;
		/**
		 * Database client type, including general schema typings.
		 */
		type DatabaseClient = SupabaseClient<App.Database>;
		/**
		 * Database user role enum.
		 */
		type UserRole = App.Database['public']['Enums']['app_role'];
		/**
		 * Database entries publication status enum.
		 */
		type PublicationStatus = App.Database['public']['Enums']['publication_status'];
		/**
		 * Base (minimal) page data available everywhere.
		 */
		interface PageData {
			session?: DeepOmit<AuthSession, { user: { role: never } }> & {
				user: Pick<
					ViewRow<'users_session'>,
					| 'avatar_url'
					| 'first_name'
					| 'last_name'
					| 'public_email'
					| 'role'
					| 'role_title'
					| 'role_description'
				>;
			};
			category?: Category;
			showCategoryNavbar?: boolean;
			showFooter?: boolean;
			theme?: ThemeName;
			editorBreadcrumbs?: {
				title: string;
				href: string;
				matcher?: RegExp;
			}[];
			// editorLinks?: {
			// 	title: string;
			// 	pathname: string;
			// 	hash?: string;
			// }[];
			editorHeader?: typeof SvelteComponent;
			editorSidebar?: typeof SvelteComponent;
		}
		interface Locals {
			/**
			 * 1-to-1 correspondance with the app session cookie, used as source to populate locals. Keep
			 * content to a minimum (essential data only) while adhering to a partial App.PageData shape.
			 */
			session?: DeepPick<
				NonUndefinable<App.PageData['session']>,
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
			db: App.DatabaseClient;
		}
		// interface ActionFailure {
		// 	messages: Record<MessageType, string[]>;
		// }
	}
}
