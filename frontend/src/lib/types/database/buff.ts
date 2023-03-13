import type { DeepReplace } from '$types/deepReplace';
import type { DeepOmit } from 'ts-essentials';
import type { Database } from './generated';
import type { PgCube, PgRange, TableRow } from './utils';

export type BuffedDatabase = DeepReplace<
	DeepOmit<Database, { public: { Functions: { project_descriptors: { Returns: true } } } }> & {
		public: {
			Functions: {
				project_descriptors: {
					Returns: {
						types: (TableRow<'project_type'> & {
							works: ({
								type_id: TableRow<'project_type'>['id'];
							} & TableRow<'project_work'>)[];
						})[];
						workCategories: TableRow<'project_work_category'>[];
						works: (TableRow<'project_work'> & {
							types_ids: TableRow<'project_type'>['id'][];
						})[];
						siteOwnerships: TableRow<'project_site_ownership'>[];
						siteUsagesCategories: TableRow<'project_site_usage_category'>[];
						siteUsages: (TableRow<'project_site_usage'> & {
							category_ids: TableRow<'project_site_usage_site_usage_category'>['category_id'][];
						})[];
						implantationModes: TableRow<'project_implantation_mode'>[];
						materialOrigins: TableRow<'project_material_origin'>[];
						materialTypes: TableRow<'project_material_type'>[];
						materialUses: TableRow<'project_material_use'>[];
						eventTypes: TableRow<'project_event_type'>[];
						exemplarityIndicatorsCategories: TableRow<'project_exemplarity_indicator_category'>[];
						exemplarityIndicators: TableRow<'project_exemplarity_indicator'>[];
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