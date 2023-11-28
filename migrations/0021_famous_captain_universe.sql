ALTER TABLE "i18n"."locales" RENAME TO "langs";--> statement-breakpoint
ALTER TABLE "i18n"."langs" RENAME COLUMN "locale" TO "lang";--> statement-breakpoint
ALTER TABLE "accounts"."user_occupations_t" DROP CONSTRAINT "user_occupations_t_id_locale";--> statement-breakpoint
ALTER TABLE "accounts"."user_roles_t" DROP CONSTRAINT "user_roles_t_role_locale";--> statement-breakpoint
ALTER TABLE "accounts"."users_occupations" DROP CONSTRAINT "users_occupations_occupation_id_user_id";--> statement-breakpoint
ALTER TABLE "accounts"."users_collections_items" DROP CONSTRAINT "users_collections_items_collection_id_project_id";--> statement-breakpoint
ALTER TABLE "organization_duties_t" DROP CONSTRAINT "organization_duties_t_id_locale";--> statement-breakpoint
ALTER TABLE "organization_expertises_t" DROP CONSTRAINT "organization_expertises_t_id_locale";--> statement-breakpoint
ALTER TABLE "organization_types_t" DROP CONSTRAINT "organization_types_t_id_locale";--> statement-breakpoint
ALTER TABLE "organizations_expertises" DROP CONSTRAINT "organizations_expertises_expertise_id_organization_id";--> statement-breakpoint
ALTER TABLE "organizations_t" DROP CONSTRAINT "organizations_t_id_locale";--> statement-breakpoint
ALTER TABLE "organizations_users" DROP CONSTRAINT "organizations_users_organization_id_user_id";--> statement-breakpoint
ALTER TABLE "project_building_level_types_t" DROP CONSTRAINT "project_building_level_types_t_id_locale";--> statement-breakpoint
ALTER TABLE "project_exemplarity_categories_t" DROP CONSTRAINT "project_exemplarity_categories_t_id_locale";--> statement-breakpoint
ALTER TABLE "project_exemplarity_indicators_t" DROP CONSTRAINT "project_exemplarity_indicators_t_id_locale";--> statement-breakpoint
ALTER TABLE "project_image_temporalities_t" DROP CONSTRAINT "project_image_temporalities_t_id_locale";--> statement-breakpoint
ALTER TABLE "project_image_types_t" DROP CONSTRAINT "project_image_types_t_id_locale";--> statement-breakpoint
ALTER TABLE "project_implantation_types_t" DROP CONSTRAINT "project_implantation_types_t_id_locale";--> statement-breakpoint
ALTER TABLE "project_intervention_categories_t" DROP CONSTRAINT "project_intervention_categories_t_id_locale";--> statement-breakpoint
ALTER TABLE "project_interventions_t" DROP CONSTRAINT "project_interventions_t_id_locale";--> statement-breakpoint
ALTER TABLE "project_site_ownerships_t" DROP CONSTRAINT "project_site_ownerships_t_id_locale";--> statement-breakpoint
ALTER TABLE "project_types_to_intervention" DROP CONSTRAINT "project_types_to_intervention_type_id_intervention_id";--> statement-breakpoint
ALTER TABLE "project_types_t" DROP CONSTRAINT "project_types_t_id_locale";--> statement-breakpoint
ALTER TABLE "projects_exemplarity_indicators" DROP CONSTRAINT "projects_exemplarity_indicators_project_id_exemplarity_indicator_id";--> statement-breakpoint
ALTER TABLE "projects_images_credits" DROP CONSTRAINT "projects_images_credits_image_id_credit_details_id";--> statement-breakpoint
ALTER TABLE "projects_images_t" DROP CONSTRAINT "projects_images_t_id_locale";--> statement-breakpoint
ALTER TABLE "projects_interventions" DROP CONSTRAINT "projects_interventions_project_id_intervention_id";--> statement-breakpoint
ALTER TABLE "projects_likes" DROP CONSTRAINT "projects_likes_project_id_user_id";--> statement-breakpoint
ALTER TABLE "projects_organizations" DROP CONSTRAINT "projects_organizations_organization_id_project_id";--> statement-breakpoint
ALTER TABLE "projects_t" DROP CONSTRAINT "projects_t_id_locale";--> statement-breakpoint
ALTER TABLE "projects_users" DROP CONSTRAINT "projects_users_project_id_user_id";--> statement-breakpoint
ALTER TABLE "i18n"."langs" DROP CONSTRAINT "locales_name_unique";--> statement-breakpoint
ALTER TABLE "accounts"."notification_types_t" DROP CONSTRAINT "notification_types_t_locale_locales_locale_fk";
--> statement-breakpoint
ALTER TABLE "accounts"."user_occupations_t" DROP CONSTRAINT "user_occupations_t_locale_locales_locale_fk";
--> statement-breakpoint
ALTER TABLE "accounts"."user_roles_t" DROP CONSTRAINT "user_roles_t_locale_locales_locale_fk";
--> statement-breakpoint
ALTER TABLE "organization_duties_t" DROP CONSTRAINT "organization_duties_t_locale_locales_locale_fk";
--> statement-breakpoint
ALTER TABLE "organization_expertises_t" DROP CONSTRAINT "organization_expertises_t_locale_locales_locale_fk";
--> statement-breakpoint
ALTER TABLE "organization_types_t" DROP CONSTRAINT "organization_types_t_locale_locales_locale_fk";
--> statement-breakpoint
ALTER TABLE "organizations_t" DROP CONSTRAINT "organizations_t_locale_locales_locale_fk";
--> statement-breakpoint
ALTER TABLE "project_building_level_types_t" DROP CONSTRAINT "project_building_level_types_t_locale_locales_locale_fk";
--> statement-breakpoint
ALTER TABLE "project_exemplarity_categories_t" DROP CONSTRAINT "project_exemplarity_categories_t_locale_locales_locale_fk";
--> statement-breakpoint
ALTER TABLE "project_exemplarity_indicators_t" DROP CONSTRAINT "project_exemplarity_indicators_t_locale_locales_locale_fk";
--> statement-breakpoint
ALTER TABLE "project_image_temporalities_t" DROP CONSTRAINT "project_image_temporalities_t_locale_locales_locale_fk";
--> statement-breakpoint
ALTER TABLE "project_image_types_t" DROP CONSTRAINT "project_image_types_t_locale_locales_locale_fk";
--> statement-breakpoint
ALTER TABLE "project_implantation_types_t" DROP CONSTRAINT "project_implantation_types_t_locale_locales_locale_fk";
--> statement-breakpoint
ALTER TABLE "project_intervention_categories_t" DROP CONSTRAINT "project_intervention_categories_t_locale_locales_locale_fk";
--> statement-breakpoint
ALTER TABLE "project_interventions_t" DROP CONSTRAINT "project_interventions_t_locale_locales_locale_fk";
--> statement-breakpoint
ALTER TABLE "project_site_ownerships_t" DROP CONSTRAINT "project_site_ownerships_t_locale_locales_locale_fk";
--> statement-breakpoint
ALTER TABLE "project_types_t" DROP CONSTRAINT "project_types_t_locale_locales_locale_fk";
--> statement-breakpoint
ALTER TABLE "projects_images_t" DROP CONSTRAINT "projects_images_t_locale_locales_locale_fk";
--> statement-breakpoint
ALTER TABLE "projects_t" DROP CONSTRAINT "projects_t_locale_locales_locale_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."notification_types_t" ADD CONSTRAINT "notification_types_t_locale_langs_lang_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."user_occupations_t" ADD CONSTRAINT "user_occupations_t_locale_langs_lang_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."user_roles_t" ADD CONSTRAINT "user_roles_t_locale_langs_lang_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_duties_t" ADD CONSTRAINT "organization_duties_t_locale_langs_lang_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_expertises_t" ADD CONSTRAINT "organization_expertises_t_locale_langs_lang_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_types_t" ADD CONSTRAINT "organization_types_t_locale_langs_lang_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations_t" ADD CONSTRAINT "organizations_t_locale_langs_lang_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_building_level_types_t" ADD CONSTRAINT "project_building_level_types_t_locale_langs_lang_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_exemplarity_categories_t" ADD CONSTRAINT "project_exemplarity_categories_t_locale_langs_lang_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_exemplarity_indicators_t" ADD CONSTRAINT "project_exemplarity_indicators_t_locale_langs_lang_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_image_temporalities_t" ADD CONSTRAINT "project_image_temporalities_t_locale_langs_lang_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_image_types_t" ADD CONSTRAINT "project_image_types_t_locale_langs_lang_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_implantation_types_t" ADD CONSTRAINT "project_implantation_types_t_locale_langs_lang_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_intervention_categories_t" ADD CONSTRAINT "project_intervention_categories_t_locale_langs_lang_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_interventions_t" ADD CONSTRAINT "project_interventions_t_locale_langs_lang_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_site_ownerships_t" ADD CONSTRAINT "project_site_ownerships_t_locale_langs_lang_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_types_t" ADD CONSTRAINT "project_types_t_locale_langs_lang_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_images_t" ADD CONSTRAINT "projects_images_t_locale_langs_lang_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_t" ADD CONSTRAINT "projects_t_locale_langs_lang_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "accounts"."user_occupations_t" ADD CONSTRAINT "user_occupations_t_id_locale_pk" PRIMARY KEY("id","locale");--> statement-breakpoint
ALTER TABLE "accounts"."user_roles_t" ADD CONSTRAINT "user_roles_t_role_locale_pk" PRIMARY KEY("role","locale");--> statement-breakpoint
ALTER TABLE "accounts"."users_occupations" ADD CONSTRAINT "users_occupations_occupation_id_user_id_pk" PRIMARY KEY("occupation_id","user_id");--> statement-breakpoint
ALTER TABLE "accounts"."users_collections_items" ADD CONSTRAINT "users_collections_items_collection_id_project_id_pk" PRIMARY KEY("collection_id","project_id");--> statement-breakpoint
ALTER TABLE "organization_duties_t" ADD CONSTRAINT "organization_duties_t_id_locale_pk" PRIMARY KEY("id","locale");--> statement-breakpoint
ALTER TABLE "organization_expertises_t" ADD CONSTRAINT "organization_expertises_t_id_locale_pk" PRIMARY KEY("id","locale");--> statement-breakpoint
ALTER TABLE "organization_types_t" ADD CONSTRAINT "organization_types_t_id_locale_pk" PRIMARY KEY("id","locale");--> statement-breakpoint
ALTER TABLE "organizations_expertises" ADD CONSTRAINT "organizations_expertises_expertise_id_organization_id_pk" PRIMARY KEY("expertise_id","organization_id");--> statement-breakpoint
ALTER TABLE "organizations_t" ADD CONSTRAINT "organizations_t_id_locale_pk" PRIMARY KEY("id","locale");--> statement-breakpoint
ALTER TABLE "organizations_users" ADD CONSTRAINT "organizations_users_organization_id_user_id_pk" PRIMARY KEY("organization_id","user_id");--> statement-breakpoint
ALTER TABLE "project_building_level_types_t" ADD CONSTRAINT "project_building_level_types_t_id_locale_pk" PRIMARY KEY("id","locale");--> statement-breakpoint
ALTER TABLE "project_exemplarity_categories_t" ADD CONSTRAINT "project_exemplarity_categories_t_id_locale_pk" PRIMARY KEY("id","locale");--> statement-breakpoint
ALTER TABLE "project_exemplarity_indicators_t" ADD CONSTRAINT "project_exemplarity_indicators_t_id_locale_pk" PRIMARY KEY("id","locale");--> statement-breakpoint
ALTER TABLE "project_image_temporalities_t" ADD CONSTRAINT "project_image_temporalities_t_id_locale_pk" PRIMARY KEY("id","locale");--> statement-breakpoint
ALTER TABLE "project_image_types_t" ADD CONSTRAINT "project_image_types_t_id_locale_pk" PRIMARY KEY("id","locale");--> statement-breakpoint
ALTER TABLE "project_implantation_types_t" ADD CONSTRAINT "project_implantation_types_t_id_locale_pk" PRIMARY KEY("id","locale");--> statement-breakpoint
ALTER TABLE "project_intervention_categories_t" ADD CONSTRAINT "project_intervention_categories_t_id_locale_pk" PRIMARY KEY("id","locale");--> statement-breakpoint
ALTER TABLE "project_interventions_t" ADD CONSTRAINT "project_interventions_t_id_locale_pk" PRIMARY KEY("id","locale");--> statement-breakpoint
ALTER TABLE "project_site_ownerships_t" ADD CONSTRAINT "project_site_ownerships_t_id_locale_pk" PRIMARY KEY("id","locale");--> statement-breakpoint
ALTER TABLE "project_types_to_intervention" ADD CONSTRAINT "project_types_to_intervention_type_id_intervention_id_pk" PRIMARY KEY("type_id","intervention_id");--> statement-breakpoint
ALTER TABLE "project_types_t" ADD CONSTRAINT "project_types_t_id_locale_pk" PRIMARY KEY("id","locale");--> statement-breakpoint
ALTER TABLE "projects_exemplarity_indicators" ADD CONSTRAINT "projects_exemplarity_indicators_project_id_exemplarity_indicator_id_pk" PRIMARY KEY("project_id","exemplarity_indicator_id");--> statement-breakpoint
ALTER TABLE "projects_images_credits" ADD CONSTRAINT "projects_images_credits_image_id_credit_details_id_pk" PRIMARY KEY("image_id","credit_details_id");--> statement-breakpoint
ALTER TABLE "projects_images_t" ADD CONSTRAINT "projects_images_t_id_locale_pk" PRIMARY KEY("id","locale");--> statement-breakpoint
ALTER TABLE "projects_interventions" ADD CONSTRAINT "projects_interventions_project_id_intervention_id_pk" PRIMARY KEY("project_id","intervention_id");--> statement-breakpoint
ALTER TABLE "projects_likes" ADD CONSTRAINT "projects_likes_project_id_user_id_pk" PRIMARY KEY("project_id","user_id");--> statement-breakpoint
ALTER TABLE "projects_organizations" ADD CONSTRAINT "projects_organizations_organization_id_project_id_pk" PRIMARY KEY("organization_id","project_id");--> statement-breakpoint
ALTER TABLE "projects_t" ADD CONSTRAINT "projects_t_id_locale_pk" PRIMARY KEY("id","locale");--> statement-breakpoint
ALTER TABLE "projects_users" ADD CONSTRAINT "projects_users_project_id_user_id_pk" PRIMARY KEY("project_id","user_id");--> statement-breakpoint
ALTER TABLE "i18n"."langs" ADD CONSTRAINT "langs_name_unique" UNIQUE("name");