ALTER TABLE "organization_types_t" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "organization_types_t" ALTER COLUMN "title" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "project_building_level_types_t" ALTER COLUMN "id" SET NOT NULL;