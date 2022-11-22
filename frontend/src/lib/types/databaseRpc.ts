import type { Database } from './database';

/**
 * Since the open-api type generation does not include RPC (Postgres functions) return types, we
 * here define the relevant ones manually with more precision.
 *
 * The underlying interface should be extended with the generated types when instanciating the
 * supabase client.
 */
export interface DatabaseRpc {
	public: {
		Functions: {
			get_project_descriptors: {
				Returns: {
					types: Database['public']['Tables']['project_type']['Row'][];
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
