ALTER TABLE "projects_images" DROP CONSTRAINT "projects_images_project_id_is_banner_unique";--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "banner_id" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_banner_id_projects_images_id_fk" FOREIGN KEY ("banner_id") REFERENCES "projects_images"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "projects_images" DROP COLUMN IF EXISTS "is_banner";