CREATE TABLE IF NOT EXISTS "projects_types" (
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"project_id" text NOT NULL,
	"type_id" text NOT NULL,
	CONSTRAINT "projects_types_project_id_type_id_pk" PRIMARY KEY("project_id","type_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_types" ADD CONSTRAINT "projects_types_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_types" ADD CONSTRAINT "projects_types_type_id_project_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."project_types"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
