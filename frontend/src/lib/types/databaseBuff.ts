import type { Database } from './database';

/**
 * Since the type generation does not include RPC (Postgres functions) return types and doesn't
 * properly resolve certain data types (such as ranges), we here define the relevant ones manually
 * with more precision.
 *
 * The underlying interface should be extended with the generated types when instanciating the
 * supabase client.
 */
export interface DatabaseBuff {
	public: {
		Tables: {
			projects: {
				Row: {
					cost_range: `[${number},${number}]`;
				};
			};
			projects_gallery_images: {
				Row: {
					color_dominant: `(${number}, ${number}, ${number})`;
					color_mean: `(${number}, ${number}, ${number})`;
				};
			};
		};
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
					siteUsages: Database['public']['Tables']['project_site_usage']['Row'][];
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
}
