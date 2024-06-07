ALTER SCHEMA "auth" RENAME TO "users";
--> statement-breakpoint
ALTER TABLE "users"."user_roles" RENAME TO "roles";--> statement-breakpoint
ALTER TABLE "users"."email_verification_codes" DROP CONSTRAINT "email_verification_codes_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users"."notification_types_t" DROP CONSTRAINT "notification_types_t_id_notification_types_id_fk";
--> statement-breakpoint
ALTER TABLE "users"."oauth_users" DROP CONSTRAINT "oauth_users_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users"."password_reset_tokens" DROP CONSTRAINT "password_reset_tokens_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users"."sessions" DROP CONSTRAINT "sessions_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users"."user_occupations_t" DROP CONSTRAINT "user_occupations_t_id_user_occupations_id_fk";
--> statement-breakpoint
ALTER TABLE "users"."users" DROP CONSTRAINT "users_role_user_roles_role_fk";
--> statement-breakpoint
ALTER TABLE "users"."users_notifications" DROP CONSTRAINT "users_notifications_type_id_notification_types_id_fk";
--> statement-breakpoint
ALTER TABLE "users"."users_notifications" DROP CONSTRAINT "users_notifications_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users"."users_notifications" DROP CONSTRAINT "users_notifications_sent_by_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users"."users_occupations" DROP CONSTRAINT "users_occupations_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users"."users_occupations" DROP CONSTRAINT "users_occupations_occupation_id_user_occupations_id_fk";
--> statement-breakpoint
ALTER TABLE "users"."users_projects_collections" DROP CONSTRAINT "users_projects_collections_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users"."users_collections_items" DROP CONSTRAINT "users_collections_items_collection_id_users_projects_collections_id_fk";
--> statement-breakpoint
ALTER TABLE "users"."users_roles_requests" DROP CONSTRAINT "users_roles_requests_requested_role_user_roles_role_fk";
--> statement-breakpoint
ALTER TABLE "users"."users_roles_requests" DROP CONSTRAINT "users_roles_requests_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_created_by_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_updated_by_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "organizations_users" DROP CONSTRAINT "organizations_users_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "projects" DROP CONSTRAINT "projects_created_by_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "projects" DROP CONSTRAINT "projects_updated_by_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "projects_gallery_credits" DROP CONSTRAINT "projects_gallery_credits_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "projects_images" DROP CONSTRAINT "projects_images_created_by_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "projects_images" DROP CONSTRAINT "projects_images_updated_by_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "projects_likes" DROP CONSTRAINT "projects_likes_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "projects_publication_requests" DROP CONSTRAINT "projects_publication_requests_requested_by_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "projects_users" DROP CONSTRAINT "projects_users_role_user_roles_role_fk";
--> statement-breakpoint
ALTER TABLE "projects_users" DROP CONSTRAINT "projects_users_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users"."users" ALTER COLUMN "hashed_password" SET DATA TYPE text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users"."email_verification_codes" ADD CONSTRAINT "email_verification_codes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users"."notification_types_t" ADD CONSTRAINT "notification_types_t_id_notification_types_id_fk" FOREIGN KEY ("id") REFERENCES "users"."notification_types"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users"."oauth_users" ADD CONSTRAINT "oauth_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users"."password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users"."sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users"."user_occupations_t" ADD CONSTRAINT "user_occupations_t_id_user_occupations_id_fk" FOREIGN KEY ("id") REFERENCES "users"."user_occupations"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users"."users" ADD CONSTRAINT "users_role_roles_role_fk" FOREIGN KEY ("role") REFERENCES "users"."roles"("role") ON DELETE set default ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users"."users_notifications" ADD CONSTRAINT "users_notifications_type_id_notification_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "users"."notification_types"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users"."users_notifications" ADD CONSTRAINT "users_notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users"."users_notifications" ADD CONSTRAINT "users_notifications_sent_by_id_users_id_fk" FOREIGN KEY ("sent_by_id") REFERENCES "users"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users"."users_occupations" ADD CONSTRAINT "users_occupations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users"."users_occupations" ADD CONSTRAINT "users_occupations_occupation_id_user_occupations_id_fk" FOREIGN KEY ("occupation_id") REFERENCES "users"."user_occupations"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users"."users_projects_collections" ADD CONSTRAINT "users_projects_collections_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users"."users_collections_items" ADD CONSTRAINT "users_collections_items_collection_id_users_projects_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "users"."users_projects_collections"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users"."users_roles_requests" ADD CONSTRAINT "users_roles_requests_requested_role_roles_role_fk" FOREIGN KEY ("requested_role") REFERENCES "users"."roles"("role") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users"."users_roles_requests" ADD CONSTRAINT "users_roles_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "organizations_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "users"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "organizations_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "users"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations_users" ADD CONSTRAINT "organizations_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "users"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "users"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_gallery_credits" ADD CONSTRAINT "projects_gallery_credits_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_images" ADD CONSTRAINT "projects_images_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "users"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_images" ADD CONSTRAINT "projects_images_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "users"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_likes" ADD CONSTRAINT "projects_likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_publication_requests" ADD CONSTRAINT "projects_publication_requests_requested_by_id_users_id_fk" FOREIGN KEY ("requested_by_id") REFERENCES "users"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_users" ADD CONSTRAINT "projects_users_role_roles_role_fk" FOREIGN KEY ("role") REFERENCES "users"."roles"("role") ON DELETE set default ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_users" ADD CONSTRAINT "projects_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
