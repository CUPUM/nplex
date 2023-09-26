CREATE SCHEMA "accounts";
--> statement-breakpoint
CREATE SCHEMA "i18n";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts"."email_verification_tokens" (
	"id" text NOT NULL,
	"expires" bigint PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	CONSTRAINT "email_verification_tokens_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts"."auth_keys" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"hashed_password" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts"."notification_types" (
	"id" text PRIMARY KEY DEFAULT "extensions"."nanoid"(6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts"."notification_types_t" (
	"id" text,
	"locale" text,
	"title" text,
	"body" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts"."password_reset_tokens" (
	"id" text NOT NULL,
	"expires" bigint PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	CONSTRAINT "password_reset_tokens_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts"."auth_sessions" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"active_expires" bigint NOT NULL,
	"idle_expires" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts"."user_occupations" (
	"id" text PRIMARY KEY DEFAULT "extensions"."nanoid"(6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts"."user_occupations_t" (
	"id" text,
	"locale" text,
	"title" text NOT NULL,
	"description" text,
	CONSTRAINT user_occupations_t_id_locale PRIMARY KEY("id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts"."user_roles" (
	"role" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts"."user_roles_t" (
	"role" text,
	"locale" text,
	"title" text NOT NULL,
	"description" text,
	CONSTRAINT user_roles_t_role_locale PRIMARY KEY("role","locale"),
	CONSTRAINT "user_roles_t_locale_title_unique" UNIQUE("locale","title")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts"."users" (
	"id" varchar(15) PRIMARY KEY DEFAULT "extensions"."nanoid"(15) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"role" text DEFAULT 'visitor' NOT NULL,
	"email" text,
	"email_verified" boolean DEFAULT false NOT NULL,
	"public_email" text,
	"public_email_verified" boolean DEFAULT false NOT NULL,
	"github_username" text,
	"google_username" text,
	"first_name" text,
	"middle_name" text,
	"last_name" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts"."users_notifications" (
	"id" varchar(21) PRIMARY KEY DEFAULT "extensions"."nanoid"(21) NOT NULL,
	"type_id" text,
	"user_id" varchar(15),
	"read_at" timestamp with time zone,
	"sent_by_id" varchar(15),
	"sent_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts"."users_occupations" (
	"user_id" varchar(15),
	"occupation_id" text,
	CONSTRAINT users_occupations_occupation_id_user_id PRIMARY KEY("occupation_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts"."users_projects_collections" (
	"id" varchar(21) PRIMARY KEY DEFAULT "extensions"."nanoid"(21) NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"title" text NOT NULL,
	"description" text,
	CONSTRAINT "users_projects_collections_title_user_id_unique" UNIQUE("title","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts"."users_collections_items" (
	"collection_id" varchar(21),
	"project_id" varchar(21),
	"note" text,
	CONSTRAINT users_collections_items_collection_id_project_id PRIMARY KEY("collection_id","project_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts"."users_roles_requests" (
	"user_id" varchar(15) PRIMARY KEY NOT NULL,
	"requested_role" text,
	"requested_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "i18n"."locales" (
	"locale" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "locales_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization_duties" (
	"id" text PRIMARY KEY DEFAULT "extensions"."nanoid"(6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization_duties_t" (
	"id" text,
	"locale" text,
	"title" text NOT NULL,
	"description" text,
	CONSTRAINT organization_duties_t_id_locale PRIMARY KEY("id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization_expertises" (
	"id" text PRIMARY KEY DEFAULT "extensions"."nanoid"(6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization_expertises_t" (
	"id" text,
	"locale" text,
	"title" text NOT NULL,
	"description" text,
	CONSTRAINT organization_expertises_t_id_locale PRIMARY KEY("id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization_types" (
	"id" text PRIMARY KEY DEFAULT "extensions"."nanoid"(6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization_types_t" (
	"id" text,
	"locale" text,
	"title" text NOT NULL,
	"description" text,
	CONSTRAINT organization_types_t_id_locale PRIMARY KEY("id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organizations" (
	"id" varchar(21) PRIMARY KEY DEFAULT "extensions"."nanoid"(21) NOT NULL,
	"created_by_id" varchar(15) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by_id" varchar(15),
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"type_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organizations_expertises" (
	"organization_id" varchar(21),
	"expertise_id" text,
	CONSTRAINT organizations_expertises_expertise_id_organization_id PRIMARY KEY("expertise_id","organization_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organizations_t" (
	"id" varchar(21),
	"locale" text,
	"name" text NOT NULL,
	"summary" text,
	"description" text,
	CONSTRAINT organizations_t_id_locale PRIMARY KEY("id","locale"),
	CONSTRAINT "organizations_t_name_locale_unique" UNIQUE("name","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organizations_users" (
	"organization_id" varchar(21),
	"user_id" varchar(15),
	CONSTRAINT organizations_users_organization_id_user_id PRIMARY KEY("organization_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_exemplarity_categories" (
	"id" text PRIMARY KEY DEFAULT "extensions"."nanoid"(6) NOT NULL,
	"index" integer,
	CONSTRAINT "project_exemplarity_categories_index_unique" UNIQUE("index")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_exemplarity_categories_t" (
	"id" text,
	"locale" text,
	"title" text NOT NULL,
	"description" text,
	CONSTRAINT project_exemplarity_categories_t_id_locale PRIMARY KEY("id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_exemplarity_indicators" (
	"id" text PRIMARY KEY DEFAULT "extensions"."nanoid"(6) NOT NULL,
	"category_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_exemplarity_indicators_t" (
	"id" text,
	"locale" text,
	"title" text NOT NULL,
	"short_title" text NOT NULL,
	"description" text,
	CONSTRAINT project_exemplarity_indicators_t_id_locale PRIMARY KEY("id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_image_types" (
	"id" text PRIMARY KEY DEFAULT "extensions"."nanoid"(6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_image_types_t" (
	"id" text,
	"locale" text,
	"title" text NOT NULL,
	"description" text,
	CONSTRAINT project_image_types_t_id_locale PRIMARY KEY("id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_implantation_types" (
	"id" text PRIMARY KEY DEFAULT "extensions"."nanoid"(6) NOT NULL,
	"index" integer,
	CONSTRAINT "project_implantation_types_index_unique" UNIQUE("index")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_implantation_types_t" (
	"id" text,
	"locale" text,
	"title" text NOT NULL,
	"description" text,
	CONSTRAINT project_implantation_types_t_id_locale PRIMARY KEY("id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_intervention_categories" (
	"id" text PRIMARY KEY DEFAULT "extensions"."nanoid"(6) NOT NULL,
	"index" integer,
	CONSTRAINT "project_intervention_categories_index_unique" UNIQUE("index")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_intervention_categories_t" (
	"id" text,
	"locale" text,
	"title" text NOT NULL,
	"description" text,
	CONSTRAINT project_intervention_categories_t_id_locale PRIMARY KEY("id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_interventions" (
	"id" text PRIMARY KEY DEFAULT "extensions"."nanoid"(6) NOT NULL,
	"category_id" text NOT NULL,
	"maybe_permit" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_interventions_t" (
	"id" text,
	"locale" text,
	"title" text NOT NULL,
	"description" text,
	CONSTRAINT project_interventions_t_id_locale PRIMARY KEY("id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_site_ownerships" (
	"id" text PRIMARY KEY DEFAULT "extensions"."nanoid"(6) NOT NULL,
	"index" integer,
	CONSTRAINT "project_site_ownerships_index_unique" UNIQUE("index")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_site_ownerships_t" (
	"id" text,
	"locale" text,
	"title" text NOT NULL,
	"description" text,
	CONSTRAINT project_site_ownerships_t_id_locale PRIMARY KEY("id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_types" (
	"id" text PRIMARY KEY DEFAULT "extensions"."nanoid"(6) NOT NULL,
	"index" integer,
	CONSTRAINT "project_types_index_unique" UNIQUE("index")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_types_to_intervention" (
	"type_id" text,
	"intervention_id" text,
	CONSTRAINT project_types_to_intervention_type_id_intervention_id PRIMARY KEY("type_id","intervention_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_types_t" (
	"id" text,
	"locale" text,
	"title" text NOT NULL,
	"description" text,
	CONSTRAINT project_types_t_id_locale PRIMARY KEY("id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" varchar(21) PRIMARY KEY DEFAULT "extensions"."nanoid"(21) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by_id" varchar(15) NOT NULL,
	"updated_by_id" varchar(15),
	"published_at" timestamp with time zone,
	"type_id" text,
	"site_ownership_id" text,
	"implantation_type_id" text,
	"adjacent_streets" integer,
	"adjacent_alleys" integer,
	"cost_range" "int4"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects_exemplarity_indicators" (
	"project_id" varchar(21),
	"exemplarity_indicator_id" text,
	CONSTRAINT projects_exemplarity_indicators_project_id_exemplarity_indicator_id PRIMARY KEY("project_id","exemplarity_indicator_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects_images" (
	"id" varchar(21) PRIMARY KEY DEFAULT "extensions"."nanoid"(21) NOT NULL,
	"project_id" varchar(21),
	"date" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by_id" varchar(15) NOT NULL,
	"updated_by_id" varchar(15),
	"index" integer,
	"public_url" text NOT NULL,
	"storage_name" text NOT NULL,
	"type_id" text,
	CONSTRAINT "projects_images_project_id_index_unique" UNIQUE("project_id","index")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects_images_credits_details" (
	"id" varchar(21) PRIMARY KEY DEFAULT "extensions"."nanoid"(21) NOT NULL,
	"project_id" varchar(21) NOT NULL,
	"first_name" text,
	"middle_name" text,
	"last_name" text,
	"url" text,
	"description" text,
	"organization_id" varchar(21),
	"user_id" varchar(15)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects_images_credits" (
	"image_id" varchar(21),
	"credit_details_id" varchar(21),
	"legend" text,
	CONSTRAINT projects_images_credits_image_id_credit_details_id PRIMARY KEY("image_id","credit_details_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects_images_t" (
	"id" varchar(21),
	"locale" text,
	"description" text,
	CONSTRAINT projects_images_t_id_locale PRIMARY KEY("id","locale")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects_interventions" (
	"project_id" varchar(21),
	"intervention_id" text,
	CONSTRAINT projects_interventions_project_id_intervention_id PRIMARY KEY("project_id","intervention_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects_likes" (
	"user_id" varchar(15),
	"project_id" varchar(21),
	CONSTRAINT projects_likes_project_id_user_id PRIMARY KEY("project_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects_organizations" (
	"project_id" varchar(21),
	"organization_id" varchar(21),
	CONSTRAINT projects_organizations_organization_id_project_id PRIMARY KEY("organization_id","project_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects_publication_requests" (
	"project_id" varchar(21) PRIMARY KEY NOT NULL,
	"requested_at" timestamp with time zone DEFAULT now() NOT NULL,
	"requested_by_id" varchar(15) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects_t" (
	"id" varchar(21),
	"locale" text,
	"title" text NOT NULL,
	"summary" text,
	"description" text,
	CONSTRAINT projects_t_id_locale PRIMARY KEY("id","locale"),
	CONSTRAINT "projects_t_locale_title_unique" UNIQUE("locale","title")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects_users" (
	"user_id" varchar(15),
	"project_id" varchar(21),
	"role" text DEFAULT 'visitor',
	CONSTRAINT projects_users_project_id_user_id PRIMARY KEY("project_id","user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."email_verification_tokens" ADD CONSTRAINT "email_verification_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "accounts"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."auth_keys" ADD CONSTRAINT "auth_keys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "accounts"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."notification_types_t" ADD CONSTRAINT "notification_types_t_id_notification_types_id_fk" FOREIGN KEY ("id") REFERENCES "accounts"."notification_types"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."notification_types_t" ADD CONSTRAINT "notification_types_t_locale_locales_locale_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."locales"("locale") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "accounts"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."auth_sessions" ADD CONSTRAINT "auth_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "accounts"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."user_occupations_t" ADD CONSTRAINT "user_occupations_t_id_user_occupations_id_fk" FOREIGN KEY ("id") REFERENCES "accounts"."user_occupations"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."user_occupations_t" ADD CONSTRAINT "user_occupations_t_locale_locales_locale_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."locales"("locale") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."user_roles_t" ADD CONSTRAINT "user_roles_t_role_user_roles_role_fk" FOREIGN KEY ("role") REFERENCES "accounts"."user_roles"("role") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."user_roles_t" ADD CONSTRAINT "user_roles_t_locale_locales_locale_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."locales"("locale") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."users" ADD CONSTRAINT "users_role_user_roles_role_fk" FOREIGN KEY ("role") REFERENCES "accounts"."user_roles"("role") ON DELETE set default ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."users_notifications" ADD CONSTRAINT "users_notifications_type_id_notification_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "accounts"."notification_types"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."users_notifications" ADD CONSTRAINT "users_notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "accounts"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."users_notifications" ADD CONSTRAINT "users_notifications_sent_by_id_users_id_fk" FOREIGN KEY ("sent_by_id") REFERENCES "accounts"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."users_occupations" ADD CONSTRAINT "users_occupations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "accounts"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."users_occupations" ADD CONSTRAINT "users_occupations_occupation_id_user_occupations_id_fk" FOREIGN KEY ("occupation_id") REFERENCES "accounts"."user_occupations"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."users_projects_collections" ADD CONSTRAINT "users_projects_collections_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "accounts"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."users_collections_items" ADD CONSTRAINT "users_collections_items_collection_id_users_projects_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "accounts"."users_projects_collections"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."users_collections_items" ADD CONSTRAINT "users_collections_items_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."users_roles_requests" ADD CONSTRAINT "users_roles_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "accounts"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts"."users_roles_requests" ADD CONSTRAINT "users_roles_requests_requested_role_user_roles_role_fk" FOREIGN KEY ("requested_role") REFERENCES "accounts"."user_roles"("role") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_duties_t" ADD CONSTRAINT "organization_duties_t_id_organization_duties_id_fk" FOREIGN KEY ("id") REFERENCES "organization_duties"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_duties_t" ADD CONSTRAINT "organization_duties_t_locale_locales_locale_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."locales"("locale") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_expertises_t" ADD CONSTRAINT "organization_expertises_t_id_organization_expertises_id_fk" FOREIGN KEY ("id") REFERENCES "organization_expertises"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_expertises_t" ADD CONSTRAINT "organization_expertises_t_locale_locales_locale_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."locales"("locale") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_types_t" ADD CONSTRAINT "organization_types_t_id_organization_types_id_fk" FOREIGN KEY ("id") REFERENCES "organization_types"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_types_t" ADD CONSTRAINT "organization_types_t_locale_locales_locale_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."locales"("locale") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "organizations_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "accounts"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "organizations_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "accounts"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "organizations_type_id_organization_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "organization_types"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations_expertises" ADD CONSTRAINT "organizations_expertises_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations_expertises" ADD CONSTRAINT "organizations_expertises_expertise_id_organization_expertises_id_fk" FOREIGN KEY ("expertise_id") REFERENCES "organization_expertises"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations_t" ADD CONSTRAINT "organizations_t_id_organizations_id_fk" FOREIGN KEY ("id") REFERENCES "organizations"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations_t" ADD CONSTRAINT "organizations_t_locale_locales_locale_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."locales"("locale") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations_users" ADD CONSTRAINT "organizations_users_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations_users" ADD CONSTRAINT "organizations_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "accounts"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_exemplarity_categories_t" ADD CONSTRAINT "project_exemplarity_categories_t_id_project_exemplarity_categories_id_fk" FOREIGN KEY ("id") REFERENCES "project_exemplarity_categories"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_exemplarity_categories_t" ADD CONSTRAINT "project_exemplarity_categories_t_locale_locales_locale_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."locales"("locale") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_exemplarity_indicators" ADD CONSTRAINT "project_exemplarity_indicators_category_id_project_exemplarity_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "project_exemplarity_categories"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_exemplarity_indicators_t" ADD CONSTRAINT "project_exemplarity_indicators_t_id_project_exemplarity_indicators_id_fk" FOREIGN KEY ("id") REFERENCES "project_exemplarity_indicators"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_exemplarity_indicators_t" ADD CONSTRAINT "project_exemplarity_indicators_t_locale_locales_locale_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."locales"("locale") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_image_types_t" ADD CONSTRAINT "project_image_types_t_id_project_image_types_id_fk" FOREIGN KEY ("id") REFERENCES "project_image_types"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_image_types_t" ADD CONSTRAINT "project_image_types_t_locale_locales_locale_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."locales"("locale") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_implantation_types_t" ADD CONSTRAINT "project_implantation_types_t_id_project_implantation_types_id_fk" FOREIGN KEY ("id") REFERENCES "project_implantation_types"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_implantation_types_t" ADD CONSTRAINT "project_implantation_types_t_locale_locales_locale_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."locales"("locale") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_intervention_categories_t" ADD CONSTRAINT "project_intervention_categories_t_id_project_intervention_categories_id_fk" FOREIGN KEY ("id") REFERENCES "project_intervention_categories"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_intervention_categories_t" ADD CONSTRAINT "project_intervention_categories_t_locale_locales_locale_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."locales"("locale") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_interventions" ADD CONSTRAINT "project_interventions_category_id_project_intervention_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "project_intervention_categories"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_interventions_t" ADD CONSTRAINT "project_interventions_t_id_project_interventions_id_fk" FOREIGN KEY ("id") REFERENCES "project_interventions"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_interventions_t" ADD CONSTRAINT "project_interventions_t_locale_locales_locale_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."locales"("locale") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_site_ownerships_t" ADD CONSTRAINT "project_site_ownerships_t_id_project_site_ownerships_id_fk" FOREIGN KEY ("id") REFERENCES "project_site_ownerships"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_site_ownerships_t" ADD CONSTRAINT "project_site_ownerships_t_locale_locales_locale_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."locales"("locale") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_types_to_intervention" ADD CONSTRAINT "project_types_to_intervention_type_id_project_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "project_types"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_types_to_intervention" ADD CONSTRAINT "project_types_to_intervention_intervention_id_project_interventions_id_fk" FOREIGN KEY ("intervention_id") REFERENCES "project_interventions"("id") ON DELETE cascade ON UPDATE cascade;
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
 ALTER TABLE "projects" ADD CONSTRAINT "projects_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "accounts"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "accounts"."users"("id") ON DELETE set null ON UPDATE cascade;
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
 ALTER TABLE "projects" ADD CONSTRAINT "projects_site_ownership_id_project_site_ownerships_id_fk" FOREIGN KEY ("site_ownership_id") REFERENCES "project_site_ownerships"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_implantation_type_id_project_implantation_types_id_fk" FOREIGN KEY ("implantation_type_id") REFERENCES "project_implantation_types"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_exemplarity_indicators" ADD CONSTRAINT "projects_exemplarity_indicators_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_exemplarity_indicators" ADD CONSTRAINT "projects_exemplarity_indicators_exemplarity_indicator_id_project_exemplarity_indicators_id_fk" FOREIGN KEY ("exemplarity_indicator_id") REFERENCES "project_exemplarity_indicators"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_images" ADD CONSTRAINT "projects_images_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_images" ADD CONSTRAINT "projects_images_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "accounts"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_images" ADD CONSTRAINT "projects_images_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "accounts"."users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_images" ADD CONSTRAINT "projects_images_type_id_project_image_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "project_image_types"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_images_credits_details" ADD CONSTRAINT "projects_images_credits_details_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_images_credits_details" ADD CONSTRAINT "projects_images_credits_details_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_images_credits_details" ADD CONSTRAINT "projects_images_credits_details_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "accounts"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_images_credits" ADD CONSTRAINT "projects_images_credits_image_id_projects_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "projects_images"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_images_credits" ADD CONSTRAINT "projects_images_credits_credit_details_id_projects_images_credits_details_id_fk" FOREIGN KEY ("credit_details_id") REFERENCES "projects_images_credits_details"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_images_t" ADD CONSTRAINT "projects_images_t_id_projects_images_id_fk" FOREIGN KEY ("id") REFERENCES "projects_images"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_images_t" ADD CONSTRAINT "projects_images_t_locale_locales_locale_fk" FOREIGN KEY ("locale") REFERENCES "i18n"."locales"("locale") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_interventions" ADD CONSTRAINT "projects_interventions_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_interventions" ADD CONSTRAINT "projects_interventions_intervention_id_project_interventions_id_fk" FOREIGN KEY ("intervention_id") REFERENCES "project_interventions"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_likes" ADD CONSTRAINT "projects_likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "accounts"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_likes" ADD CONSTRAINT "projects_likes_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_organizations" ADD CONSTRAINT "projects_organizations_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_organizations" ADD CONSTRAINT "projects_organizations_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_publication_requests" ADD CONSTRAINT "projects_publication_requests_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_publication_requests" ADD CONSTRAINT "projects_publication_requests_requested_by_id_users_id_fk" FOREIGN KEY ("requested_by_id") REFERENCES "accounts"."users"("id") ON DELETE cascade ON UPDATE cascade;
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_users" ADD CONSTRAINT "projects_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "accounts"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_users" ADD CONSTRAINT "projects_users_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_users" ADD CONSTRAINT "projects_users_role_user_roles_role_fk" FOREIGN KEY ("role") REFERENCES "accounts"."user_roles"("role") ON DELETE set default ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
