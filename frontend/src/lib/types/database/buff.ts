import type { DeepReplace } from '$types/deepReplace';
import type { DeepOmit } from 'ts-essentials';
import type { Database } from './generated';
import type { PgCube, PgRange } from './utils';

export type BuffedDatabase = DeepReplace<
	DeepOmit<Database, { public: { Functions: { get_project_descriptors: { Returns: true } } } }> & {
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
							types_ids: Database['public']['Tables']['project_type']['Row']['id'][];
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
						cost_range: PgRange | 'empty';
					};
					Insert: {
						cost_range?: PgRange | null;
					};
					Update: {
						cost_range?: PgRange | null;
					};
				};
				projects_images: {
					Row: {
						color_dominant_hsl: PgCube;
						color_dominant_lab: PgCube;
						color_mean_hsl: PgCube;
						color_mean_lab: PgCube;
					};
					Insert: {
						color_dominant_hsl: PgCube;
						color_dominant_lab: PgCube;
						color_mean_hsl: PgCube;
						color_mean_lab: PgCube;
					};
					Update: {
						color_dominant_hsl: PgCube;
						color_dominant_lab: PgCube;
						color_mean_hsl: PgCube;
						color_mean_lab: PgCube;
					};
				};
				projects_location: {
					Row: {
						geometry?: GeoJSON.Point;
					};
				};
			};
		};
	}
>;
