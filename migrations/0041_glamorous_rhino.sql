ALTER TABLE "project_exemplarity_indicators" RENAME TO "project_exemplarity_markers";--> statement-breakpoint
ALTER TABLE "project_exemplarity_markers" DROP CONSTRAINT "project_exemplarity_indicators_category_id_project_exemplarity_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "project_exemplarity_indicators_t" DROP CONSTRAINT "project_exemplarity_indicators_t_id_project_exemplarity_indicators_id_fk";
--> statement-breakpoint
ALTER TABLE "projects_exemplarity_markers" DROP CONSTRAINT "projects_exemplarity_markers_exemplarity_indicator_id_project_exemplarity_indicators_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_exemplarity_markers" ADD CONSTRAINT "project_exemplarity_markers_category_id_project_exemplarity_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."project_exemplarity_categories"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_exemplarity_indicators_t" ADD CONSTRAINT "project_exemplarity_indicators_t_id_project_exemplarity_markers_id_fk" FOREIGN KEY ("id") REFERENCES "public"."project_exemplarity_markers"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_exemplarity_markers" ADD CONSTRAINT "projects_exemplarity_markers_exemplarity_indicator_id_project_exemplarity_markers_id_fk" FOREIGN KEY ("exemplarity_indicator_id") REFERENCES "public"."project_exemplarity_markers"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
