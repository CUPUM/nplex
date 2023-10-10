ALTER TABLE "projects_images" ADD COLUMN "name_sm" text NOT NULL;--> statement-breakpoint
ALTER TABLE "projects_images" ADD COLUMN "name_md" text NOT NULL;--> statement-breakpoint
ALTER TABLE "projects_images" ADD COLUMN "name_lg" text NOT NULL;--> statement-breakpoint
ALTER TABLE "projects_images" ADD COLUMN "url_sm" text NOT NULL;--> statement-breakpoint
ALTER TABLE "projects_images" ADD COLUMN "url_md" text NOT NULL;--> statement-breakpoint
ALTER TABLE "projects_images" ADD COLUMN "url_lg" text NOT NULL;--> statement-breakpoint
ALTER TABLE "projects_images" DROP COLUMN IF EXISTS "public_url";--> statement-breakpoint
ALTER TABLE "projects_images" DROP COLUMN IF EXISTS "storage_name";