ALTER TABLE "project_exemplarity_indicators_t" RENAME TO "project_exemplarity_markers_t";--> statement-breakpoint
ALTER TABLE "project_exemplarity_markers_t" DROP CONSTRAINT "project_exemplarity_indicators_t_lang_langs_lang_fk";
--> statement-breakpoint
ALTER TABLE "project_exemplarity_markers_t" DROP CONSTRAINT "project_exemplarity_indicators_t_id_project_exemplarity_markers_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_exemplarity_markers_t" ADD CONSTRAINT "project_exemplarity_markers_t_lang_langs_lang_fk" FOREIGN KEY ("lang") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_exemplarity_markers_t" ADD CONSTRAINT "project_exemplarity_markers_t_id_project_exemplarity_markers_id_fk" FOREIGN KEY ("id") REFERENCES "public"."project_exemplarity_markers"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
