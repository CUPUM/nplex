ALTER TABLE "projects_images" ADD COLUMN "color_palette_lab" vector(3)[5] NOT NULL;--> statement-breakpoint
ALTER TABLE "projects_images" DROP COLUMN IF EXISTS "palette";