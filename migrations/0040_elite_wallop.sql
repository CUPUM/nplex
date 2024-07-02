ALTER TABLE "projects_exemplarity_indicators" RENAME TO "projects_exemplarity_markers";--> statement-breakpoint
ALTER TABLE "projects_exemplarity_markers" DROP CONSTRAINT "projects_exemplarity_indicators_project_id_projects_id_fk";
--> statement-breakpoint
ALTER TABLE "projects_exemplarity_markers" DROP CONSTRAINT "projects_exemplarity_indicators_exemplarity_indicator_id_project_exemplarity_indicators_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_exemplarity_markers" ADD CONSTRAINT "projects_exemplarity_markers_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_exemplarity_markers" ADD CONSTRAINT "projects_exemplarity_markers_exemplarity_indicator_id_project_exemplarity_indicators_id_fk" FOREIGN KEY ("exemplarity_indicator_id") REFERENCES "public"."project_exemplarity_indicators"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
