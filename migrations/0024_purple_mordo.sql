ALTER SCHEMA "accounts" RENAME TO "auth";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."email_verification_codes" (
	"user_id" text PRIMARY KEY NOT NULL,
	"code" text DEFAULT "extensions"."nanoid"(6,'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ') NOT NULL,
	"email" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."oauth_users" (
	"user_id" text NOT NULL,
	"provider" text NOT NULL,
	"provider_user_id" text NOT NULL,
	CONSTRAINT "oauth_users_provider_provider_user_id_pk" PRIMARY KEY("provider","provider_user_id")
);
--> statement-breakpoint
DROP TABLE "auth"."email_verification_tokens";--> statement-breakpoint
ALTER TABLE "auth"."auth_keys" DROP CONSTRAINT "auth_keys_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "auth"."notification_types_t" DROP CONSTRAINT "notification_types_t_id_notification_types_id_fk";
--> statement-breakpoint
ALTER TABLE "auth"."password_reset_tokens" DROP CONSTRAINT "password_reset_tokens_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "auth"."auth_sessions" DROP CONSTRAINT "auth_sessions_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "auth"."user_occupations_t" DROP CONSTRAINT "user_occupations_t_id_user_occupations_id_fk";
--> statement-breakpoint
ALTER TABLE "auth"."user_roles_t" DROP CONSTRAINT "user_roles_t_role_user_roles_role_fk";
--> statement-breakpoint
ALTER TABLE "auth"."users" DROP CONSTRAINT "users_role_user_roles_role_fk";
--> statement-breakpoint
ALTER TABLE "auth"."users_notifications" DROP CONSTRAINT "users_notifications_type_id_notification_types_id_fk";
--> statement-breakpoint
ALTER TABLE "auth"."users_occupations" DROP CONSTRAINT "users_occupations_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "auth"."users_projects_collections" DROP CONSTRAINT "users_projects_collections_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "auth"."users_collections_items" DROP CONSTRAINT "users_collections_items_collection_id_users_projects_collections_id_fk";
--> statement-breakpoint
ALTER TABLE "auth"."users_roles_requests" DROP CONSTRAINT "users_roles_requests_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_created_by_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "organizations_users" DROP CONSTRAINT "organizations_users_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "projects" DROP CONSTRAINT "projects_created_by_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "projects_gallery_credits" DROP CONSTRAINT "projects_gallery_credits_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "projects_images" DROP CONSTRAINT "projects_images_created_by_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "projects_likes" DROP CONSTRAINT "projects_likes_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "projects_publication_requests" DROP CONSTRAINT "projects_publication_requests_requested_by_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "projects_users" DROP CONSTRAINT "projects_users_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "projects_views" DROP CONSTRAINT "projects_views_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "projects_t" DROP COLUMN "ts";
ALTER TABLE "projects_t" ADD COLUMN "ts" tsvector generated always as (setweight(to_tsvector((case when lang = 'en' then 'english'::regconfig when lang = 'fr' then 'french'::regconfig end), coalesce(title, '')), 'A') || setweight(to_tsvector((case when lang = 'en' then 'english'::regconfig when lang = 'fr' then 'french'::regconfig end), coalesce(summary, '')), 'B') || setweight(to_tsvector((case when lang = 'en' then 'english'::regconfig when lang = 'fr' then 'french'::regconfig end), coalesce(description, '')), 'C')) stored;--> statement-breakpoint
ALTER TABLE "auth"."auth_sessions" ADD COLUMN "expires_at" timestamp with time zone;
UPDATE "auth"."auth_sessions" SET expires_at = to_timestamp(idle_expires / 1000);
ALTER TABLE "auth"."auth_sessions" ALTER COLUMN "expires_at" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "hashed_password" varchar(255);
UPDATE "auth"."users" SET hashed_password = ak.hashed_password FROM (SELECT "user_id", "hashed_password" FROM "auth"."auth_keys") as ak
WHERE id = ak.user_id AND ak.hashed_password IS NOT NULL;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."auth_keys" ADD CONSTRAINT "auth_keys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."notification_types_t" ADD CONSTRAINT "notification_types_t_id_notification_types_id_fk" FOREIGN KEY ("id") REFERENCES "auth"."notification_types"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."auth_sessions" ADD CONSTRAINT "auth_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."user_occupations_t" ADD CONSTRAINT "user_occupations_t_id_user_occupations_id_fk" FOREIGN KEY ("id") REFERENCES "auth"."user_occupations"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."user_roles_t" ADD CONSTRAINT "user_roles_t_role_user_roles_role_fk" FOREIGN KEY ("role") REFERENCES "auth"."user_roles"("role") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."users" ADD CONSTRAINT "users_role_user_roles_role_fk" FOREIGN KEY ("role") REFERENCES "auth"."user_roles"("role") ON DELETE set default ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."users_notifications" ADD CONSTRAINT "users_notifications_type_id_notification_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "auth"."notification_types"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."users_occupations" ADD CONSTRAINT "users_occupations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."users_projects_collections" ADD CONSTRAINT "users_projects_collections_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."users_collections_items" ADD CONSTRAINT "users_collections_items_collection_id_users_projects_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "auth"."users_projects_collections"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."users_roles_requests" ADD CONSTRAINT "users_roles_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "organizations_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "auth"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations_users" ADD CONSTRAINT "organizations_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "auth"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_gallery_credits" ADD CONSTRAINT "projects_gallery_credits_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_images" ADD CONSTRAINT "projects_images_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "auth"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_likes" ADD CONSTRAINT "projects_likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_publication_requests" ADD CONSTRAINT "projects_publication_requests_requested_by_id_users_id_fk" FOREIGN KEY ("requested_by_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_users" ADD CONSTRAINT "projects_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_views" ADD CONSTRAINT "projects_views_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "auth"."auth_sessions" DROP COLUMN IF EXISTS "active_expires";--> statement-breakpoint
ALTER TABLE "auth"."auth_sessions" DROP COLUMN IF EXISTS "idle_expires";--> statement-breakpoint
ALTER TABLE "auth"."users" DROP COLUMN IF EXISTS "github_username";--> statement-breakpoint
ALTER TABLE "auth"."users" DROP COLUMN IF EXISTS "google_username";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."email_verification_codes" ADD CONSTRAINT "email_verification_codes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."oauth_users" ADD CONSTRAINT "oauth_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
