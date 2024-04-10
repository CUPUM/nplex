-- ALTER TABLE "projects" RENAME COLUMN "location" TO "ST_AsGeoJSON("location") as location";--> statement-breakpoint
ALTER TABLE "auth"."email_verification_codes" ALTER COLUMN "code" SET DEFAULT nanoid(size => 6,alphabet => '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');--> statement-breakpoint
ALTER TABLE "auth"."notification_types" ALTER COLUMN "id" SET DEFAULT nanoid(size => 6);--> statement-breakpoint
ALTER TABLE "auth"."user_occupations" ALTER COLUMN "id" SET DEFAULT nanoid(size => 6);--> statement-breakpoint
ALTER TABLE "auth"."users" ALTER COLUMN "id" SET DEFAULT nanoid(size => 15);--> statement-breakpoint
ALTER TABLE "auth"."users_notifications" ALTER COLUMN "id" SET DEFAULT nanoid();--> statement-breakpoint
ALTER TABLE "auth"."users_projects_collections" ALTER COLUMN "id" SET DEFAULT nanoid();--> statement-breakpoint
ALTER TABLE "organization_duties" ALTER COLUMN "id" SET DEFAULT nanoid(size => 6);--> statement-breakpoint
ALTER TABLE "organization_expertises" ALTER COLUMN "id" SET DEFAULT nanoid(size => 6);--> statement-breakpoint
ALTER TABLE "organization_types" ALTER COLUMN "id" SET DEFAULT nanoid(size => 6);--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "id" SET DEFAULT nanoid();--> statement-breakpoint
ALTER TABLE "project_building_level_type" ALTER COLUMN "id" SET DEFAULT nanoid(size => 6);--> statement-breakpoint
ALTER TABLE "project_exemplarity_categories" ALTER COLUMN "id" SET DEFAULT nanoid(size => 6);--> statement-breakpoint
ALTER TABLE "project_exemplarity_indicators" ALTER COLUMN "id" SET DEFAULT nanoid(size => 6);--> statement-breakpoint
ALTER TABLE "project_image_temporalities" ALTER COLUMN "id" SET DEFAULT nanoid(size => 6);--> statement-breakpoint
ALTER TABLE "project_image_types" ALTER COLUMN "id" SET DEFAULT nanoid(size => 6);--> statement-breakpoint
ALTER TABLE "project_implantation_types" ALTER COLUMN "id" SET DEFAULT nanoid(size => 6);--> statement-breakpoint
ALTER TABLE "project_interventions" ALTER COLUMN "id" SET DEFAULT nanoid(size => 6);--> statement-breakpoint
ALTER TABLE "project_intervention_categories" ALTER COLUMN "id" SET DEFAULT nanoid(size => 6);--> statement-breakpoint
ALTER TABLE "project_site_ownerships" ALTER COLUMN "id" SET DEFAULT nanoid(size => 6);--> statement-breakpoint
ALTER TABLE "project_types" ALTER COLUMN "id" SET DEFAULT nanoid(size => 6);--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "id" SET DEFAULT nanoid();--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "cost_range" SET DEFAULT 'empty';--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "location" SET DATA TYPE geography(Point);--> statement-breakpoint
ALTER TABLE "projects_building_levels" ALTER COLUMN "id" SET DEFAULT nanoid();--> statement-breakpoint
ALTER TABLE "projects_gallery_credits" ALTER COLUMN "id" SET DEFAULT nanoid();--> statement-breakpoint
ALTER TABLE "projects_images" ALTER COLUMN "id" SET DEFAULT nanoid();--> statement-breakpoint
ALTER TABLE "projects_images" ALTER COLUMN "palette" SET DATA TYPE cube[5];--> statement-breakpoint
ALTER TABLE "projects_views" ALTER COLUMN "id" SET DEFAULT nanoid();--> statement-breakpoint
ALTER TABLE "projects_t" DROP COLUMN IF EXISTS "ts";