CREATE TABLE IF NOT EXISTS "projects_organizations_t" (
	"lang" text NOT NULL,
	"project_id" text NOT NULL,
	"organization_id" text NOT NULL,
	"description" text,
	CONSTRAINT "projects_organizations_t_project_id_organization_id_pk" PRIMARY KEY("project_id","organization_id")
);
--> statement-breakpoint
ALTER TABLE "projects_likes" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "projects_organizations" ADD COLUMN "role" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_organizations_t" ADD CONSTRAINT "projects_organizations_t_lang_langs_lang_fk" FOREIGN KEY ("lang") REFERENCES "i18n"."langs"("lang") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_organizations_t" ADD CONSTRAINT "projects_organizations_t_project_id_organization_id_projects_organizations_project_id_organization_id_fk" FOREIGN KEY ("project_id","organization_id") REFERENCES "public"."projects_organizations"("project_id","organization_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_organizations" ADD CONSTRAINT "projects_organizations_role_roles_role_fk" FOREIGN KEY ("role") REFERENCES "users"."roles"("role") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "projects_organizations" ADD CONSTRAINT "projects_organizations_project_id_organization_id_unique" UNIQUE("project_id","organization_id");