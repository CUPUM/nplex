DROP TABLE "auth"."user_roles_t";--> statement-breakpoint
DROP TABLE "projects_views";--> statement-breakpoint
ALTER TABLE "auth"."users_sessions" RENAME TO "sessions";--> statement-breakpoint
ALTER TABLE "auth"."password_reset_tokens" DROP CONSTRAINT "password_reset_tokens_id_unique";--> statement-breakpoint
ALTER TABLE "auth"."sessions" DROP CONSTRAINT "users_sessions_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "auth"."password_reset_tokens" DROP COLUMN IF EXISTS "expires";--> statement-breakpoint
ALTER TABLE "auth"."email_verification_codes" ALTER COLUMN "code" SET DEFAULT nanoid(size => 8,alphabet => '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');--> statement-breakpoint
ALTER TABLE "auth"."email_verification_codes" ALTER COLUMN "expires_at" SET DEFAULT (now() + (interval '1 hours'));--> statement-breakpoint
ALTER TABLE "auth"."password_reset_tokens" ADD PRIMARY KEY ("user_id");--> statement-breakpoint
ALTER TABLE "auth"."sessions" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "auth"."password_reset_tokens" ADD COLUMN "token" text DEFAULT nanoid(size => 16,alphabet => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789^çàèé.,ÉÀÈÙù!@#$%?&*()_+') NOT NULL;--> statement-breakpoint
ALTER TABLE "auth"."password_reset_tokens" ADD COLUMN "expires_at" timestamp with time zone DEFAULT (now() + (interval '1 hours')) NOT NULL;--> statement-breakpoint
ALTER TABLE "i18n"."langs" ADD COLUMN "regconfig" "regconfig";
UPDATE "i18n"."langs" SET "regconfig" = CASE WHEN "lang" = 'en' THEN 'english'::regconfig WHEN "lang" = 'fr' THEN 'french'::regconfig END;
ALTER TABLE "i18n"."langs" ALTER COLUMN "regconfig" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "views" integer DEFAULT 0;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "auth"."notification_types_t" DROP COLUMN IF EXISTS "regconfig";--> statement-breakpoint
ALTER TABLE "auth"."password_reset_tokens" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "auth"."user_occupations_t" DROP COLUMN IF EXISTS "regconfig";--> statement-breakpoint
ALTER TABLE "organization_duties_t" DROP COLUMN IF EXISTS "regconfig";--> statement-breakpoint
ALTER TABLE "organization_expertises_t" DROP COLUMN IF EXISTS "regconfig";--> statement-breakpoint
ALTER TABLE "organization_types_t" DROP COLUMN IF EXISTS "regconfig";--> statement-breakpoint
ALTER TABLE "organizations_t" DROP COLUMN IF EXISTS "regconfig";--> statement-breakpoint
ALTER TABLE "project_building_level_types_t" DROP COLUMN IF EXISTS "regconfig";--> statement-breakpoint
ALTER TABLE "project_exemplarity_categories_t" DROP COLUMN IF EXISTS "regconfig";--> statement-breakpoint
ALTER TABLE "project_exemplarity_indicators_t" DROP COLUMN IF EXISTS "regconfig";--> statement-breakpoint
ALTER TABLE "project_image_temporalities_t" DROP COLUMN IF EXISTS "regconfig";--> statement-breakpoint
ALTER TABLE "project_image_types_t" DROP COLUMN IF EXISTS "regconfig";--> statement-breakpoint
ALTER TABLE "project_implantation_types_t" DROP COLUMN IF EXISTS "regconfig";--> statement-breakpoint
ALTER TABLE "project_intervention_categories_t" DROP COLUMN IF EXISTS "regconfig";--> statement-breakpoint
ALTER TABLE "project_interventions_t" DROP COLUMN IF EXISTS "regconfig";--> statement-breakpoint
ALTER TABLE "project_site_ownerships_t" DROP COLUMN IF EXISTS "regconfig";--> statement-breakpoint
ALTER TABLE "project_types_t" DROP COLUMN IF EXISTS "regconfig";--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN IF EXISTS "location";--> statement-breakpoint
ALTER TABLE "projects_images_t" DROP COLUMN IF EXISTS "regconfig";--> statement-breakpoint
ALTER TABLE "projects_t" DROP COLUMN IF EXISTS "regconfig";