import type { DeepReplace } from '$types/deepReplace';
import type { DeepOmit } from 'ts-essentials';
import type { Database } from './generated';
import type { PgCube, PgRange, TableRow } from './utils';

/**
 * Manually buffing the generated types where the CLI has trouble.
 */
export type BuffedDatabase = DeepReplace<
	DeepOmit<Database, { public: { Functions: { get_project_descriptors: { Returns: true } } } }> & {
		public: {
			Functions: {
				get_project_descriptors: {
					Returns: {
						types: (TableRow<'project_type'> & {
							interventions: ({
								type: TableRow<'project_type'>['id'];
							} & TableRow<'project_intervention'>)[];
						})[];
						interventionCategories: TableRow<'project_intervention_category'>[];
						interventions: (TableRow<'project_intervention'> & {
							types: TableRow<'project_type'>['id'][];
						})[];
						siteOwnerships: TableRow<'project_site_ownership'>[];
						siteUsagesCategories: TableRow<'project_site_usage_category'>[];
						siteUsages: (TableRow<'project_site_usage'> & {
							categories: TableRow<'project_site_usage_by_category'>['category'][];
						})[];
						implantationModes: TableRow<'project_implantation_mode'>[];
						materialOrigins: TableRow<'project_material_origin'>[];
						materialTypes: TableRow<'project_material_type'>[];
						materialUses: TableRow<'project_material_use'>[];
						eventTypes: TableRow<'project_event'>[] & {
							subevents: TableRow<'project_event'>[];
						};
						exemplarityCategories: (TableRow<'project_exemplarity_category'> & {
							indicators: TableRow<'project_exemplarity_indicator'>[];
						})[];
						exemplarityIndicators: TableRow<'project_exemplarity_indicator'>[];
						imageTypes: TableRow<'project_image_type'>[];
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
						location?: GeoJSON.Point;
						location_obfuscated?: GeoJSON.Point;
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
						color_average_hsl: PgCube;
						color_average_lab: PgCube;
					};
					Insert: {
						color_dominant_hsl: PgCube;
						color_dominant_lab: PgCube;
						color_average_hsl: PgCube;
						color_average_lab: PgCube;
					};
					Update: {
						color_dominant_hsl: PgCube;
						color_dominant_lab: PgCube;
						color_average_hsl: PgCube;
						color_average_lab: PgCube;
					};
				};
			};
			Views: {
				explore_projects: {
					Row: {
						location_obfuscated: GeoJSON.Point;
					};
				};
			};
		};
	}
>;
