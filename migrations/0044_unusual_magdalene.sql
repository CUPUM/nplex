ALTER TABLE "projects_exemplarity_markers" RENAME COLUMN "exemplarity_indicator_id" TO "marker_id";--> statement-breakpoint
ALTER TABLE "projects_exemplarity_markers" DROP CONSTRAINT "projects_exemplarity_markers_exemplarity_indicator_id_project_exemplarity_markers_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_exemplarity_markers" ADD CONSTRAINT "projects_exemplarity_markers_marker_id_project_exemplarity_markers_id_fk" FOREIGN KEY ("marker_id") REFERENCES "public"."project_exemplarity_markers"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
