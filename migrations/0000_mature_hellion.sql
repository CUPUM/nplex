CREATE SCHEMA "auth";
--> statement-breakpoint
CREATE SCHEMA "i18n";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."auth_keys" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"hashed_password" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."auth_sessions" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"active_expires" bigint NOT NULL,
	"idle_expires" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."user_occupations" (
	"id" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."user_occupations_t" (
	"id" serial NOT NULL,
	"locale" text,
	"title" text,
	"description" text,
	CONSTRAINT user_occupations_t_id_locale PRIMARY KEY("id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."user_roles" (
	"role" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."user_roles_t" (
	"role" text,
	"locale" text,
	"title" text,
	"description" text,
	CONSTRAINT user_roles_t_role_locale PRIMARY KEY("role","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."users" (
	"id" varchar(15) PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"role" text DEFAULT 'visitor' NOT NULL,
	"email" text,
	"username" text,
	"first_name" text,
	"middle_name" text,
	"last_name" text,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."users_occupations" (
	"user_id" varchar,
	"occupation_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "i18n"."locales" (
	"locale" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "locales_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_event_types" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_exemplarity_categories" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_exemplarity_types" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_image_types" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_implantation_types" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_intervention_categories" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_intervention_types" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_types" (
	"id" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_types_to_intervention_types" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_types_t" (
	"id" serial NOT NULL,
	"locale" text,
	"title" text,
	"description" text,
	CONSTRAINT project_types_t_id_locale PRIMARY KEY("id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" varchar NOT NULL,
	"updated_by" varchar NOT NULL,
	"type_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects_events" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects_likes" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects_t" (
	"id" uuid,
	"locale" text,
	"title" text,
	"description" text,
	CONSTRAINT projects_t_id_locale PRIMARY KEY("id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects_users" (

);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."auth_keys" ADD CONSTRAINT "auth_keys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."auth_sessions" ADD CONSTRAINT "auth_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "auth"."user_occupations_t" ADD CONSTRAINT "user_occupations_t_locale_locales_locale_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."locales"("locale") ON DELETE cascade ON UPDATE cascade;
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
 ALTER TABLE "auth"."user_roles_t" ADD CONSTRAINT "user_roles_t_locale_locales_locale_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."locales"("locale") ON DELETE cascade ON UPDATE cascade;
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
 ALTER TABLE "auth"."users_occupations" ADD CONSTRAINT "users_occupations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."users_occupations" ADD CONSTRAINT "users_occupations_occupation_id_user_occupations_id_fk" FOREIGN KEY ("occupation_id") REFERENCES "auth"."user_occupations"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_types_t" ADD CONSTRAINT "project_types_t_id_project_types_id_fk" FOREIGN KEY ("id") REFERENCES "project_types"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_types_t" ADD CONSTRAINT "project_types_t_locale_locales_locale_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."locales"("locale") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_type_id_project_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "project_types"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_t" ADD CONSTRAINT "projects_t_id_projects_id_fk" FOREIGN KEY ("id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_t" ADD CONSTRAINT "projects_t_locale_locales_locale_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."locales"("locale") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
