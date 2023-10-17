ALTER TABLE "projects_images" ADD COLUMN "storage_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "projects_images" DROP COLUMN IF EXISTS "name_sm";--> statement-breakpoint
ALTER TABLE "projects_images" DROP COLUMN IF EXISTS "name_md";--> statement-breakpoint
ALTER TABLE "projects_images" DROP COLUMN IF EXISTS "name_lg";--> statement-breakpoint
ALTER TABLE "projects_images" DROP COLUMN IF EXISTS "url_sm";--> statement-breakpoint
ALTER TABLE "projects_images" DROP COLUMN IF EXISTS "url_md";--> statement-breakpoint
ALTER TABLE "projects_images" DROP COLUMN IF EXISTS "url_lg";