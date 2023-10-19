ALTER TABLE "projects_images_credits_details" RENAME TO "projects_gallery_credits";--> statement-breakpoint
ALTER TABLE "project_image_temporalities_t" DROP CONSTRAINT "project_image_temporalities_t_id_project_image_types_id_fk";
--> statement-breakpoint
ALTER TABLE "projects_images_credits" DROP CONSTRAINT "projects_images_credits_credit_details_id_projects_images_credits_details_id_fk";
--> statement-breakpoint
ALTER TABLE "projects_gallery_credits" DROP CONSTRAINT "projects_images_credits_details_project_id_projects_id_fk";
--> statement-breakpoint
ALTER TABLE "projects_gallery_credits" DROP CONSTRAINT "projects_images_credits_details_organization_id_organizations_id_fk";
--> statement-breakpoint
ALTER TABLE "projects_gallery_credits" DROP CONSTRAINT "projects_images_credits_details_user_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_image_temporalities_t" ADD CONSTRAINT "project_image_temporalities_t_id_project_image_temporalities_id_fk" FOREIGN KEY ("id") REFERENCES "project_image_temporalities"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_images_credits" ADD CONSTRAINT "projects_images_credits_credit_details_id_projects_gallery_credits_id_fk" FOREIGN KEY ("credit_details_id") REFERENCES "projects_gallery_credits"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_gallery_credits" ADD CONSTRAINT "projects_gallery_credits_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_gallery_credits" ADD CONSTRAINT "projects_gallery_credits_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_gallery_credits" ADD CONSTRAINT "projects_gallery_credits_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "accounts"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "projects_images" ADD CONSTRAINT "projects_images_storage_name_unique" UNIQUE("storage_name");