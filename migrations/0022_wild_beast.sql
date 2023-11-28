ALTER TABLE "accounts"."notification_types_t" RENAME COLUMN "locale" TO "lang";--> statement-breakpoint
ALTER TABLE "accounts"."user_occupations_t" RENAME COLUMN "locale" TO "lang";--> statement-breakpoint
ALTER TABLE "accounts"."user_roles_t" RENAME COLUMN "locale" TO "lang";--> statement-breakpoint
ALTER TABLE "organization_duties_t" RENAME COLUMN "locale" TO "lang";--> statement-breakpoint
ALTER TABLE "organization_expertises_t" RENAME COLUMN "locale" TO "lang";--> statement-breakpoint
ALTER TABLE "organization_types_t" RENAME COLUMN "locale" TO "lang";--> statement-breakpoint
ALTER TABLE "organizations_t" RENAME COLUMN "locale" TO "lang";--> statement-breakpoint
ALTER TABLE "project_building_level_types_t" RENAME COLUMN "locale" TO "lang";--> statement-breakpoint
ALTER TABLE "project_exemplarity_categories_t" RENAME COLUMN "locale" TO "lang";--> statement-breakpoint
ALTER TABLE "project_exemplarity_indicators_t" RENAME COLUMN "locale" TO "lang";--> statement-breakpoint
ALTER TABLE "project_image_temporalities_t" RENAME COLUMN "locale" TO "lang";--> statement-breakpoint
ALTER TABLE "project_image_types_t" RENAME COLUMN "locale" TO "lang";--> statement-breakpoint
ALTER TABLE "project_implantation_types_t" RENAME COLUMN "locale" TO "lang";--> statement-breakpoint
ALTER TABLE "project_intervention_categories_t" RENAME COLUMN "locale" TO "lang";--> statement-breakpoint
ALTER TABLE "project_interventions_t" RENAME COLUMN "locale" TO "lang";--> statement-breakpoint
ALTER TABLE "project_site_ownerships_t" RENAME COLUMN "locale" TO "lang";--> statement-breakpoint
ALTER TABLE "project_types_t" RENAME COLUMN "locale" TO "lang";--> statement-breakpoint
ALTER TABLE "projects_images_t" RENAME COLUMN "locale" TO "lang";--> statement-breakpoint
ALTER TABLE "projects_t" RENAME COLUMN "locale" TO "lang";--> statement-breakpoint
ALTER TABLE "accounts"."user_occupations_t" DROP CONSTRAINT "user_occupations_t_id_locale_pk";--> statement-breakpoint
ALTER TABLE "accounts"."user_roles_t" DROP CONSTRAINT "user_roles_t_role_locale_pk";--> statement-breakpoint
ALTER TABLE "organization_duties_t" DROP CONSTRAINT "organization_duties_t_id_locale_pk";--> statement-breakpoint
ALTER TABLE "organization_expertises_t" DROP CONSTRAINT "organization_expertises_t_id_locale_pk";--> statement-breakpoint
ALTER TABLE "organization_types_t" DROP CONSTRAINT "organization_types_t_id_locale_pk";--> statement-breakpoint
ALTER TABLE "organizations_t" DROP CONSTRAINT "organizations_t_id_locale_pk";--> statement-breakpoint
ALTER TABLE "project_building_level_types_t" DROP CONSTRAINT "project_building_level_types_t_id_locale_pk";--> statement-breakpoint
ALTER TABLE "project_exemplarity_categories_t" DROP CONSTRAINT "project_exemplarity_categories_t_id_locale_pk";--> statement-breakpoint
ALTER TABLE "project_exemplarity_indicators_t" DROP CONSTRAINT "project_exemplarity_indicators_t_id_locale_pk";--> statement-breakpoint
ALTER TABLE "project_image_temporalities_t" DROP CONSTRAINT "project_image_temporalities_t_id_locale_pk";--> statement-breakpoint
ALTER TABLE "project_image_types_t" DROP CONSTRAINT "project_image_types_t_id_locale_pk";--> statement-breakpoint
ALTER TABLE "project_implantation_types_t" DROP CONSTRAINT "project_implantation_types_t_id_locale_pk";--> statement-breakpoint
ALTER TABLE "project_intervention_categories_t" DROP CONSTRAINT "project_intervention_categories_t_id_locale_pk";--> statement-breakpoint
ALTER TABLE "project_interventions_t" DROP CONSTRAINT "project_interventions_t_id_locale_pk";--> statement-breakpoint
ALTER TABLE "project_site_ownerships_t" DROP CONSTRAINT "project_site_ownerships_t_id_locale_pk";--> statement-breakpoint
ALTER TABLE "project_types_t" DROP CONSTRAINT "project_types_t_id_locale_pk";--> statement-breakpoint
ALTER TABLE "projects_images_t" DROP CONSTRAINT "projects_images_t_id_locale_pk";--> statement-breakpoint
ALTER TABLE "projects_t" DROP CONSTRAINT "projects_t_id_locale_pk";--> statement-breakpoint
ALTER TABLE "accounts"."user_roles_t" DROP CONSTRAINT "user_roles_t_locale_title_unique";--> statement-breakpoint
ALTER TABLE "organizations_t" DROP CONSTRAINT "organizations_t_name_locale_unique";--> statement-breakpoint
ALTER TABLE "accounts"."notification_types_t" DROP CONSTRAINT "notification_types_t_locale_langs_lang_fk";
--> statement-breakpoint
ALTER TABLE "accounts"."user_occupations_t" DROP CONSTRAINT "user_occupations_t_locale_langs_lang_fk";
--> statement-breakpoint
ALTER TABLE "accounts"."user_roles_t" DROP CONSTRAINT "user_roles_t_locale_langs_lang_fk";
--> statement-breakpoint
ALTER TABLE "organization_duties_t" DROP CONSTRAINT "organization_duties_t_locale_langs_lang_fk";
--> statement-breakpoint
ALTER TABLE "organization_expertises_t" DROP CONSTRAINT "organization_expertises_t_locale_langs_lang_fk";
--> statement-breakpoint
ALTER TABLE "organization_types_t" DROP CONSTRAINT "organization_types_t_locale_langs_lang_fk";
--> statement-breakpoint
ALTER TABLE "organizations_t" DROP CONSTRAINT "organizations_t_locale_langs_lang_fk";
--> statement-breakpoint
ALTER TABLE "project_building_level_types_t" DROP CONSTRAINT "project_building_level_types_t_locale_langs_lang_fk";
--> statement-breakpoint
ALTER TABLE "project_exemplarity_categories_t" DROP CONSTRAINT "project_exemplarity_categories_t_locale_langs_lang_fk";
--> statement-breakpoint
ALTER TABLE "project_exemplarity_indicators_t" DROP CONSTRAINT "project_exemplarity_indicators_t_locale_langs_lang_fk";
--> statement-breakpoint
ALTER TABLE "project_image_temporalities_t" DROP CONSTRAINT "project_image_temporalities_t_locale_langs_lang_fk";
--> statement-breakpoint
ALTER TABLE "project_image_types_t" DROP CONSTRAINT "project_image_types_t_locale_langs_lang_fk";
--> statement-breakpoint
ALTER TABLE "project_implantation_types_t" DROP CONSTRAINT "project_implantation_types_t_locale_langs_lang_fk";
--> statement-breakpoint
ALTER TABLE "project_intervention_categories_t" DROP CONSTRAINT "project_intervention_categories_t_locale_langs_lang_fk";
--> statement-breakpoint
ALTER TABLE "project_interventions_t" DROP CONSTRAINT "project_interventions_t_locale_langs_lang_fk";
--> statement-breakpoint
ALTER TABLE "project_site_ownerships_t" DROP CONSTRAINT "project_site_ownerships_t_locale_langs_lang_fk";
--> statement-breakpoint
ALTER TABLE "project_types_t" DROP CONSTRAINT "project_types_t_locale_langs_lang_fk";
--> statement-breakpoint
ALTER TABLE "projects_images_t" DROP CONSTRAINT "projects_images_t_locale_langs_lang_fk";
--> statement-breakpoint
ALTER TABLE "projects_t" DROP CONSTRAINT "projects_t_locale_langs_lang_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."notification_types_t" ADD CONSTRAINT "notification_types_t_lang_langs_lang_fk" FOREIGN KEY ("lang") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."user_occupations_t" ADD CONSTRAINT "user_occupations_t_lang_langs_lang_fk" FOREIGN KEY ("lang") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."user_roles_t" ADD CONSTRAINT "user_roles_t_lang_langs_lang_fk" FOREIGN KEY ("lang") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_duties_t" ADD CONSTRAINT "organization_duties_t_lang_langs_lang_fk" FOREIGN KEY ("lang") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_expertises_t" ADD CONSTRAINT "organization_expertises_t_lang_langs_lang_fk" FOREIGN KEY ("lang") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_types_t" ADD CONSTRAINT "organization_types_t_lang_langs_lang_fk" FOREIGN KEY ("lang") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations_t" ADD CONSTRAINT "organizations_t_lang_langs_lang_fk" FOREIGN KEY ("lang") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_building_level_types_t" ADD CONSTRAINT "project_building_level_types_t_lang_langs_lang_fk" FOREIGN KEY ("lang") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_exemplarity_categories_t" ADD CONSTRAINT "project_exemplarity_categories_t_lang_langs_lang_fk" FOREIGN KEY ("lang") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_exemplarity_indicators_t" ADD CONSTRAINT "project_exemplarity_indicators_t_lang_langs_lang_fk" FOREIGN KEY ("lang") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_image_temporalities_t" ADD CONSTRAINT "project_image_temporalities_t_lang_langs_lang_fk" FOREIGN KEY ("lang") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_image_types_t" ADD CONSTRAINT "project_image_types_t_lang_langs_lang_fk" FOREIGN KEY ("lang") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_implantation_types_t" ADD CONSTRAINT "project_implantation_types_t_lang_langs_lang_fk" FOREIGN KEY ("lang") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_intervention_categories_t" ADD CONSTRAINT "project_intervention_categories_t_lang_langs_lang_fk" FOREIGN KEY ("lang") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_interventions_t" ADD CONSTRAINT "project_interventions_t_lang_langs_lang_fk" FOREIGN KEY ("lang") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_site_ownerships_t" ADD CONSTRAINT "project_site_ownerships_t_lang_langs_lang_fk" FOREIGN KEY ("lang") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_types_t" ADD CONSTRAINT "project_types_t_lang_langs_lang_fk" FOREIGN KEY ("lang") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_images_t" ADD CONSTRAINT "projects_images_t_lang_langs_lang_fk" FOREIGN KEY ("lang") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_t" ADD CONSTRAINT "projects_t_lang_langs_lang_fk" FOREIGN KEY ("lang") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "accounts"."user_occupations_t" ADD CONSTRAINT "user_occupations_t_id_lang_pk" PRIMARY KEY("id","lang");--> statement-breakpoint
ALTER TABLE "accounts"."user_roles_t" ADD CONSTRAINT "user_roles_t_role_lang_pk" PRIMARY KEY("role","lang");--> statement-breakpoint
ALTER TABLE "organization_duties_t" ADD CONSTRAINT "organization_duties_t_id_lang_pk" PRIMARY KEY("id","lang");--> statement-breakpoint
ALTER TABLE "organization_expertises_t" ADD CONSTRAINT "organization_expertises_t_id_lang_pk" PRIMARY KEY("id","lang");--> statement-breakpoint
ALTER TABLE "organization_types_t" ADD CONSTRAINT "organization_types_t_id_lang_pk" PRIMARY KEY("id","lang");--> statement-breakpoint
ALTER TABLE "organizations_t" ADD CONSTRAINT "organizations_t_id_lang_pk" PRIMARY KEY("id","lang");--> statement-breakpoint
ALTER TABLE "project_building_level_types_t" ADD CONSTRAINT "project_building_level_types_t_id_lang_pk" PRIMARY KEY("id","lang");--> statement-breakpoint
ALTER TABLE "project_exemplarity_categories_t" ADD CONSTRAINT "project_exemplarity_categories_t_id_lang_pk" PRIMARY KEY("id","lang");--> statement-breakpoint
ALTER TABLE "project_exemplarity_indicators_t" ADD CONSTRAINT "project_exemplarity_indicators_t_id_lang_pk" PRIMARY KEY("id","lang");--> statement-breakpoint
ALTER TABLE "project_image_temporalities_t" ADD CONSTRAINT "project_image_temporalities_t_id_lang_pk" PRIMARY KEY("id","lang");--> statement-breakpoint
ALTER TABLE "project_image_types_t" ADD CONSTRAINT "project_image_types_t_id_lang_pk" PRIMARY KEY("id","lang");--> statement-breakpoint
ALTER TABLE "project_implantation_types_t" ADD CONSTRAINT "project_implantation_types_t_id_lang_pk" PRIMARY KEY("id","lang");--> statement-breakpoint
ALTER TABLE "project_intervention_categories_t" ADD CONSTRAINT "project_intervention_categories_t_id_lang_pk" PRIMARY KEY("id","lang");--> statement-breakpoint
ALTER TABLE "project_interventions_t" ADD CONSTRAINT "project_interventions_t_id_lang_pk" PRIMARY KEY("id","lang");--> statement-breakpoint
ALTER TABLE "project_site_ownerships_t" ADD CONSTRAINT "project_site_ownerships_t_id_lang_pk" PRIMARY KEY("id","lang");--> statement-breakpoint
ALTER TABLE "project_types_t" ADD CONSTRAINT "project_types_t_id_lang_pk" PRIMARY KEY("id","lang");--> statement-breakpoint
ALTER TABLE "projects_images_t" ADD CONSTRAINT "projects_images_t_id_lang_pk" PRIMARY KEY("id","lang");--> statement-breakpoint
ALTER TABLE "projects_t" ADD CONSTRAINT "projects_t_id_lang_pk" PRIMARY KEY("id","lang");--> statement-breakpoint
ALTER TABLE "accounts"."user_roles_t" ADD CONSTRAINT "user_roles_t_lang_title_unique" UNIQUE("lang","title");--> statement-breakpoint
ALTER TABLE "organizations_t" ADD CONSTRAINT "organizations_t_name_lang_unique" UNIQUE("name","lang");