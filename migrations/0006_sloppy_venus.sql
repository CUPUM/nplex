CREATE TABLE IF NOT EXISTS "project_image_temporalities" (
	"id" text PRIMARY KEY DEFAULT "extensions"."nanoid"(6) NOT NULL,
	"time_index" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_image_temporalities_t" (
	"id" text NOT NULL,
	"locale" text NOT NULL,
	"title" text,
	"description" text,
	CONSTRAINT project_image_temporalities_t_id_locale PRIMARY KEY("id","locale")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_image_temporalities_t" ADD CONSTRAINT "project_image_temporalities_t_id_project_image_types_id_fk" FOREIGN KEY ("id") REFERENCES "project_image_types"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_image_temporalities_t" ADD CONSTRAINT "project_image_temporalities_t_locale_locales_locale_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."locales"("locale") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
