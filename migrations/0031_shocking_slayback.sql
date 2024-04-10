-- Custom SQL migration file, put you code below! --
-- ALTER TABLE "auth"."notification_types_t" ADD COLUMN "regconfig" "regconfig";
UPDATE "auth"."notification_types_t" SET regconfig = (CASE
  WHEN "lang" = 'fr' THEN 'french'::regconfig
  WHEN "lang" = 'en' THEN 'english'::regconfig
END);
--> statement-breakpoint
-- ALTER TABLE "auth"."user_occupations_t" ADD COLUMN "regconfig" "regconfig";
UPDATE "auth"."user_occupations_t" SET regconfig = (CASE
  WHEN "lang" = 'fr' THEN 'french'::regconfig
  WHEN "lang" = 'en' THEN 'english'::regconfig
END);
--> statement-breakpoint
-- ALTER TABLE "auth"."user_roles_t" ADD COLUMN "regconfig" "regconfig";
UPDATE "auth"."user_roles_t" SET regconfig = (CASE
  WHEN "lang" = 'fr' THEN 'french'::regconfig
  WHEN "lang" = 'en' THEN 'english'::regconfig
END);
--> statement-breakpoint
-- ALTER TABLE "organization_duties_t" ADD COLUMN "regconfig" "regconfig";
UPDATE "organization_duties_t" SET regconfig = (CASE
  WHEN "lang" = 'fr' THEN 'french'::regconfig
  WHEN "lang" = 'en' THEN 'english'::regconfig
END);
--> statement-breakpoint
-- ALTER TABLE "organization_expertises_t" ADD COLUMN "regconfig" "regconfig";
UPDATE "organization_expertises_t" SET regconfig = (CASE
  WHEN "lang" = 'fr' THEN 'french'::regconfig
  WHEN "lang" = 'en' THEN 'english'::regconfig
END);
--> statement-breakpoint
-- ALTER TABLE "organization_types_t" ADD COLUMN "regconfig" "regconfig";
UPDATE "organization_types_t" SET regconfig = (CASE
  WHEN "lang" = 'fr' THEN 'french'::regconfig
  WHEN "lang" = 'en' THEN 'english'::regconfig
END);
--> statement-breakpoint
-- ALTER TABLE "organizations_t" ADD COLUMN "regconfig" "regconfig";
UPDATE "organizations_t" SET regconfig = (CASE
  WHEN "lang" = 'fr' THEN 'french'::regconfig
  WHEN "lang" = 'en' THEN 'english'::regconfig
END);
--> statement-breakpoint
-- ALTER TABLE "project_building_level_types_t" ADD COLUMN "regconfig" "regconfig";
UPDATE "project_building_level_types_t" SET regconfig = (CASE
  WHEN "lang" = 'fr' THEN 'french'::regconfig
  WHEN "lang" = 'en' THEN 'english'::regconfig
END);
--> statement-breakpoint
-- ALTER TABLE "project_exemplarity_categories_t" ADD COLUMN "regconfig" "regconfig";
UPDATE "project_exemplarity_categories_t" SET regconfig = (CASE
  WHEN "lang" = 'fr' THEN 'french'::regconfig
  WHEN "lang" = 'en' THEN 'english'::regconfig
END);
--> statement-breakpoint
-- ALTER TABLE "project_exemplarity_indicators_t" ADD COLUMN "regconfig" "regconfig";
UPDATE "project_exemplarity_indicators_t" SET regconfig = (CASE
  WHEN "lang" = 'fr' THEN 'french'::regconfig
  WHEN "lang" = 'en' THEN 'english'::regconfig
END);
--> statement-breakpoint
-- ALTER TABLE "project_image_temporalities_t" ADD COLUMN "regconfig" "regconfig";
UPDATE "project_image_temporalities_t" SET regconfig = (CASE
  WHEN "lang" = 'fr' THEN 'french'::regconfig
  WHEN "lang" = 'en' THEN 'english'::regconfig
END);
--> statement-breakpoint
-- ALTER TABLE "project_image_types_t" ADD COLUMN "regconfig" "regconfig";
UPDATE "project_image_types_t" SET regconfig = (CASE
  WHEN "lang" = 'fr' THEN 'french'::regconfig
  WHEN "lang" = 'en' THEN 'english'::regconfig
END);
--> statement-breakpoint
-- ALTER TABLE "project_implantation_types_t" ADD COLUMN "regconfig" "regconfig";
UPDATE "project_implantation_types_t" SET regconfig = (CASE
  WHEN "lang" = 'fr' THEN 'french'::regconfig
  WHEN "lang" = 'en' THEN 'english'::regconfig
END);
--> statement-breakpoint
-- ALTER TABLE "project_intervention_categories_t" ADD COLUMN "regconfig" "regconfig";
UPDATE "project_intervention_categories_t" SET regconfig = (CASE
  WHEN "lang" = 'fr' THEN 'french'::regconfig
  WHEN "lang" = 'en' THEN 'english'::regconfig
END);
--> statement-breakpoint
-- ALTER TABLE "project_interventions_t" ADD COLUMN "regconfig" "regconfig";
UPDATE "project_interventions_t" SET regconfig = (CASE
  WHEN "lang" = 'fr' THEN 'french'::regconfig
  WHEN "lang" = 'en' THEN 'english'::regconfig
END);
--> statement-breakpoint
-- ALTER TABLE "project_site_ownerships_t" ADD COLUMN "regconfig" "regconfig";
UPDATE "project_site_ownerships_t" SET regconfig = (CASE
  WHEN "lang" = 'fr' THEN 'french'::regconfig
  WHEN "lang" = 'en' THEN 'english'::regconfig
END);
--> statement-breakpoint
-- ALTER TABLE "project_types_t" ADD COLUMN "regconfig" "regconfig";
UPDATE "project_types_t" SET regconfig = (CASE
  WHEN "lang" = 'fr' THEN 'french'::regconfig
  WHEN "lang" = 'en' THEN 'english'::regconfig
END);
--> statement-breakpoint
-- ALTER TABLE "projects_images_t" ADD COLUMN "regconfig" "regconfig";
UPDATE "projects_images_t" SET regconfig = (CASE
  WHEN "lang" = 'fr' THEN 'french'::regconfig
  WHEN "lang" = 'en' THEN 'english'::regconfig
END);
--> statement-breakpoint
-- ALTER TABLE "projects_t" ADD COLUMN "regconfig" "regconfig";
UPDATE "projects_t" SET regconfig = (CASE
  WHEN "lang" = 'fr' THEN 'french'::regconfig
  WHEN "lang" = 'en' THEN 'english'::regconfig
END);
