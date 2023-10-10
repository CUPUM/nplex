ALTER TABLE "projects_images" ALTER COLUMN "project_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "projects_images" ALTER COLUMN "public_url" DROP NOT NULL;