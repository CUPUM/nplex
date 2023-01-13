// /// <reference types="@sveltejs/kit" />

import type { POPOVER_OPEN_ATTR } from '$components/Popover.svelte';
import type { Database } from '$types/database';
import type { DeepReplace } from '$types/utils';
import type { Category } from '$utils/enums';
import type { ThemeName } from '$utils/themes';
import type { AuthSession, PostgrestError, SupabaseClient } from '@supabase/supabase-js';
import type { DeepOmit, DeepPick } from 'ts-essentials';

type Session = DeepOmit<AuthSession, { user: { role: never } }> & {
	user: { role: App.DatabaseSchema['public']['Enums']['user_role'] } & Pick<
		App.DatabaseSchema['public']['Tables']['users']['Row'],
		'avatar_url' | 'first_name' | 'public_email'
	>;
};

type CostRange = `[${number},${number}]`;
type ColorVector = `(${number}, ${number}, ${number})`;

declare global {
	namespace svelte.JSX {
		// Extend elements typing to allow custom attributes added using `use` directives (actions).
		interface HTMLAttributes<T> {
			'onclickoutside'?: (event?: CustomEvent<Event>) => unknown;
			'onenter'?: (event?: CustomEvent) => unknown;
			'onleave'?: (event?: CustomEvent) => unknown;
			[POPOVER_OPEN_ATTR]?: '';
			'data-theme'?: ThemeName;
		}
	}
	namespace App {
		type DatabaseSchema = DeepReplace<
			DeepOmit<
				Database,
				{ public: { Functions: { get_project_descriptors: { Returns: true } } } }
			> & {
				public: {
					Functions: {
						get_project_descriptors: {
							Returns: {
								types: (Database['public']['Tables']['project_type']['Row'] & {
									works: ({
										type_id: Database['public']['Tables']['project_type']['Row']['id'];
									} & Database['public']['Tables']['project_work']['Row'])[];
								})[];
								works: (Database['public']['Tables']['project_work']['Row'] & {
									type_ids: Database['public']['Tables']['project_type']['Row']['id'][];
								})[];
								siteOwnerships: Database['public']['Tables']['project_site_ownership']['Row'][];
								siteUsagesCategories: Database['public']['Tables']['project_site_usage_category']['Row'][];
								siteUsages: (Database['public']['Tables']['project_site_usage']['Row'] & {
									category_ids: Database['public']['Tables']['project_site_usage_site_usage_category']['Row']['category_id'][];
								})[];
								implantationModes: Database['public']['Tables']['project_implantation_mode']['Row'][];
								materialOrigins: Database['public']['Tables']['project_material_origin']['Row'][];
								materialTypes: Database['public']['Tables']['project_material_type']['Row'][];
								materialUses: Database['public']['Tables']['project_material_use']['Row'][];
								eventTypes: Database['public']['Tables']['project_event_type']['Row'][];
								exemplarityIndicatorsCategories: Database['public']['Tables']['project_exemplarity_indicator_category']['Row'][];
								exemplarityIndicators: Database['public']['Tables']['project_exemplarity_indicator']['Row'][];
							};
						};
					};
				};
			},
			{
				public: {
					Tables: {
						projects: {
							Row: {
								cost_range: CostRange;
							};
							Insert: {
								cost_range?: CostRange;
							};
							Update: {
								cost_range?: CostRange;
							};
						};
						projects_images: {
							Row: {
								color_dominant_hsl: ColorVector;
								color_dominant_lab: ColorVector;
								color_mean_hsl: ColorVector;
								color_mean_lab: ColorVector;
							};
							Insert: {
								color_dominant_hsl: ColorVector;
								color_dominant_lab: ColorVector;
								color_mean_hsl: ColorVector;
								color_mean_lab: ColorVector;
							};
							Update: {
								color_dominant_hsl: ColorVector;
								color_dominant_lab: ColorVector;
								color_mean_hsl: ColorVector;
								color_mean_lab: ColorVector;
							};
						};
					};
				};
			}
		>;
		interface PageData {
			/**
			 * Nplex-specific session derived from Supabase session.
			 */
			session?: Session;
			category?: Category;
			showCategoryNav?: boolean;
			showFooter?: boolean;
			theme?: ThemeName;
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
		interface Error {
			// Has message prop by default ($page.error.message).
			// Code is also accessible in $page.status
			proposeAuth?: boolean;
			database?: PostgrestError;
		}
		// interface Platform {}
	}
}
