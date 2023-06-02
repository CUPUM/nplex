create type "public"."temporality" as enum ('before', 'during', 'after');

drop policy "Anyone can select orgs" on "public"."organizations";

drop policy "Authorize org update" on "public"."organizations";

drop policy "anyone can select" on "public"."project_event_type_subevent_type";

drop policy "anyone can select" on "public"."project_exemplarity_indicator_category";

drop policy "anyone can select" on "public"."project_site_usage_site_usage_category";

drop policy "anyone can select" on "public"."project_type_work";

drop policy "editors and admins can do anything" on "public"."project_type_work";

drop policy "Anyone can select" on "public"."project_work";

drop policy "Authorize project work delete" on "public"."project_work";

drop policy "Authorize project work insert" on "public"."project_work";

drop policy "Authorize project work update" on "public"."project_work";

drop policy "Anyone can select project work classifications" on "public"."project_work_category";

drop policy "Authorize delete" on "public"."project_work_category";

drop policy "Authorize insert" on "public"."project_work_category";

drop policy "Authorize update" on "public"."project_work_category";

drop policy "any project manager can manage respective project indicators" on "public"."projects_exemplarity_indicators";

drop policy "anyone can select indicators of public projects" on "public"."projects_exemplarity_indicators";

alter table "public"."actors" drop constraint "actors_created_by_id_fkey";

alter table "public"."actors" drop constraint "actors_updated_by_id_fkey";

alter table "public"."actors_users" drop constraint "actors_users_actor_id_fkey";

alter table "public"."actors_users" drop constraint "actors_users_user_id_fkey";

alter table "public"."organizations" drop constraint "organizations_created_by_id_fkey";

alter table "public"."organizations" drop constraint "organizations_updated_by_id_fkey";

alter table "public"."organizations_users" drop constraint "organizations_users_organization_id_fkey";

alter table "public"."organizations_users" drop constraint "organizations_users_user_id_fkey";

alter table "public"."project_event_type" drop constraint "project_event_type_created_by_id_fkey";

alter table "public"."project_event_type" drop constraint "project_event_type_updated_by_id_fkey";

alter table "public"."project_event_type_subevent_type" drop constraint "project_event_type_subevent_type_created_by_id_fkey";

alter table "public"."project_event_type_subevent_type" drop constraint "project_event_type_subevent_type_un";

alter table "public"."project_event_type_subevent_type" drop constraint "project_event_type_subevent_type_updated_by_id_fkey";

alter table "public"."project_exemplarity_indicator" drop constraint "project_exemplarity_indicator_category_id_fkey";

alter table "public"."project_exemplarity_indicator" drop constraint "project_exemplarity_indicator_created_by_id_fkey";

alter table "public"."project_exemplarity_indicator_category" drop constraint "project_exemplarity_indicator_category_created_by_id_fkey";

alter table "public"."project_exemplarity_indicator_category" drop constraint "project_exemplarity_indicator_category_un";

alter table "public"."project_exemplarity_indicator_category" drop constraint "project_exemplarity_indicator_category_updated_by_id_fkey";

alter table "public"."project_exemplarity_indicator_ressources" drop constraint "project_exemplarity_indicator_ressources_indicator_id_fkey";

alter table "public"."project_implantation_mode" drop constraint "project_implantation_mode_created_by_id_fkey";

alter table "public"."project_implantation_mode" drop constraint "project_implantation_mode_updated_by_id_fkey";

alter table "public"."project_material_origin" drop constraint "project_material_origin_created_by_id_fkey";

alter table "public"."project_material_origin" drop constraint "project_material_origin_updated_by_id_fkey";

alter table "public"."project_material_type" drop constraint "project_material_type_created_by_id_fkey";

alter table "public"."project_material_type" drop constraint "project_material_type_updated_by_id_fkey";

alter table "public"."project_material_use" drop constraint "project_material_use_created_by_id_fkey";

alter table "public"."project_material_use" drop constraint "project_material_use_updated_by_id_fkey";

alter table "public"."project_site_ownership" drop constraint "project_site_ownership_created_by_id_fkey";

alter table "public"."project_site_ownership" drop constraint "project_site_ownership_updated_by_id_fkey";

alter table "public"."project_site_usage" drop constraint "project_site_usage_created_by_id_fkey";

alter table "public"."project_site_usage" drop constraint "project_site_usage_updated_by_id_fkey";

alter table "public"."project_site_usage_category" drop constraint "project_site_usage_category_created_by_id_fkey";

alter table "public"."project_site_usage_category" drop constraint "project_site_usage_category_updated_by_id_fkey";

alter table "public"."project_site_usage_site_usage_category" drop constraint "project_site_usage_site_usage_category_created_by_id_fkey";

alter table "public"."project_site_usage_site_usage_category" drop constraint "project_site_usage_site_usage_category_un";

alter table "public"."project_site_usage_site_usage_category" drop constraint "project_site_usage_site_usage_category_updated_by_id_fkey";

alter table "public"."project_type" drop constraint "project_type_created_by_id_fkey";

alter table "public"."project_type" drop constraint "project_type_updated_by_id_fkey";

alter table "public"."project_type_work" drop constraint "project_type_category_un";

alter table "public"."project_type_work" drop constraint "project_type_work_created_by_id_fkey";

alter table "public"."project_type_work" drop constraint "project_type_work_type_id_fkey";

alter table "public"."project_type_work" drop constraint "project_type_work_updated_by_id_fkey";

alter table "public"."project_type_work" drop constraint "project_type_work_work_id_fkey";

alter table "public"."project_work" drop constraint "project_type_un";

alter table "public"."project_work" drop constraint "project_work_category_id_fkey";

alter table "public"."project_work" drop constraint "project_work_created_by_id_fkey";

alter table "public"."project_work" drop constraint "project_work_updated_by_id_fkey";

alter table "public"."projects" drop constraint "projects_banner_id_fkey";

alter table "public"."projects" drop constraint "projects_created_by_id_fkey";

alter table "public"."projects" drop constraint "projects_implantation_mode_id_fkey";

alter table "public"."projects" drop constraint "projects_site_ownership_id_fkey";

alter table "public"."projects" drop constraint "projects_type_id_fkey";

alter table "public"."projects" drop constraint "projects_updated_by_id_fkey";

alter table "public"."projects_exemplarity_indicators" drop constraint "projects_exemplarity_indicators_exemplarity_indicator_id_fkey";

alter table "public"."projects_exemplarity_indicators" drop constraint "projects_exemplarity_indicators_project_id_fkey";

alter table "public"."projects_exemplarity_indicators" drop constraint "projects_exemplarity_indicators_un";

alter table "public"."projects_images" drop constraint "projects_images_created_by_id_fkey";

alter table "public"."projects_images" drop constraint "projects_images_id_fkey";

alter table "public"."projects_images" drop constraint "projects_images_project_id_fkey";

alter table "public"."projects_images" drop constraint "projects_images_updated_by_id_fkey";

alter table "public"."projects_works" drop constraint "projects_works_work_id_fkey";

drop function if exists "public"."authorize_org_update"(org organizations);

drop view if exists "public"."editable_actors";

drop view if exists "public"."editable_organizations";

drop view if exists "public"."editable_projects";

drop view if exists "public"."random_project_images";

alter table "public"."actors_users" drop constraint "actors_users_pkey";

alter table "public"."organizations" drop constraint "organizations_pkey";

alter table "public"."organizations_users" drop constraint "organizations_users_pkey";

alter table "public"."project_event_type_subevent_type" drop constraint "project_event_type_subevent_type_pkey";

alter table "public"."project_exemplarity_indicator_category" drop constraint "project_exemplarity_indicator_category_pkey";

alter table "public"."project_exemplarity_indicator_ressources" drop constraint "project_exemplarity_indicator_ressources_pkey";

alter table "public"."project_site_usage_site_usage_category" drop constraint "project_site_usage_site_usage_category_pkey";

alter table "public"."project_type_work" drop constraint "project_type_work_pkey";

alter table "public"."project_work" drop constraint "project_type_pkey";

alter table "public"."project_work_category" drop constraint "project_work_classification_pkey";

alter table "public"."project_exemplarity_indicator" drop constraint "project_exemplarity_indicator_pkey";

alter table "public"."projects_exemplarity_indicators" drop constraint "projects_exemplarity_indicators_pkey";

drop index if exists "public"."actors_users_pkey";

drop index if exists "public"."organizations_users_pkey";

drop index if exists "public"."project_event_type_subevent_type_pkey";

drop index if exists "public"."project_exemplarity_indicator_ressources_pkey";

drop index if exists "public"."project_site_usage_site_usage_category_pkey";

drop index if exists "public"."projects_exemplarity_indicators_un";

drop index if exists "public"."organizations_pkey";

drop index if exists "public"."project_event_type_subevent_type_un";

drop index if exists "public"."project_exemplarity_indicator_category_pkey";

drop index if exists "public"."project_exemplarity_indicator_category_un";

drop index if exists "public"."project_exemplarity_indicator_pkey";

drop index if exists "public"."project_site_usage_site_usage_category_un";

drop index if exists "public"."project_type_category_un";

drop index if exists "public"."project_type_pkey";

drop index if exists "public"."project_type_un";

drop index if exists "public"."project_type_work_pkey";

drop index if exists "public"."project_work_classification_pkey";

drop index if exists "public"."projects_exemplarity_indicators_pkey";

drop table "public"."organizations";

drop table "public"."organizations_users";

drop table "public"."project_event_type_subevent_type";

drop table "public"."project_exemplarity_indicator_category";

drop table "public"."project_exemplarity_indicator_ressources";

drop table "public"."project_site_usage_site_usage_category";

drop table "public"."project_type_work";

drop table "public"."project_work";

drop table "public"."project_work_category";

create table "public"."organisations" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "created_at" timestamp with time zone not null default now(),
    "created_by" uuid not null default default_uid(),
    "updated_at" timestamp with time zone not null default now(),
    "updated_by" uuid not null default default_uid(),
    "name" text not null,
    "short_name" text,
    "about" text
);


alter table "public"."organisations" enable row level security;

create table "public"."organisations_users" (
    "created_at" timestamp with time zone not null default now(),
    "user" uuid not null,
    "organisation" uuid not null,
    "role" app_role
);


alter table "public"."organisations_users" enable row level security;

create table "public"."project_event_subtype_by_type" (
    "type" smallint not null,
    "subtype" smallint not null
);


alter table "public"."project_event_subtype_by_type" enable row level security;

create table "public"."project_exemplarity_category" (
    "id" smallint generated by default as identity not null,
    "title" text not null,
    "description" text,
    "short_title" text not null
);


alter table "public"."project_exemplarity_category" enable row level security;

create table "public"."project_image_type" (
    "id" smallint generated by default as identity not null,
    "title" text not null,
    "description" text not null
);


alter table "public"."project_image_type" enable row level security;

create table "public"."project_intervention" (
    "id" smallint generated by default as identity not null,
    "title" text not null,
    "description" text,
    "created_at" timestamp with time zone not null default now(),
    "created_by" uuid not null default default_uid(),
    "updated_at" timestamp with time zone not null default now(),
    "updated_by" uuid not null default default_uid(),
    "category" smallint not null,
    "maybe_permit" boolean
);


alter table "public"."project_intervention" enable row level security;

create table "public"."project_intervention_by_type" (
    "type" smallint not null,
    "intervention" smallint not null
);


alter table "public"."project_intervention_by_type" enable row level security;

create table "public"."project_intervention_category" (
    "id" smallint generated by default as identity not null,
    "title" text not null,
    "description" text,
    "short_title" text not null
);


alter table "public"."project_intervention_category" enable row level security;

create table "public"."project_site_usage_by_category" (
    "usage" smallint not null,
    "category" smallint not null
);


alter table "public"."project_site_usage_by_category" enable row level security;

create table "public"."projects_images_credits" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "name" text not null,
    "url" text,
    "project_image_id" uuid not null,
    "actor_id" uuid,
    "organisation_id" uuid
);


alter table "public"."projects_images_credits" enable row level security;

alter table "public"."actors" drop column "created_by_id";

alter table "public"."actors" drop column "updated_by_id";

alter table "public"."actors" add column "created_by" uuid not null default default_uid();

alter table "public"."actors" add column "updated_by" uuid not null default default_uid();

alter table "public"."actors_users" drop column "actor_id";

alter table "public"."actors_users" drop column "user_id";

alter table "public"."actors_users" add column "actor" uuid not null;

alter table "public"."actors_users" add column "user" uuid not null;

alter table "public"."project_event_type" drop column "created_at";

alter table "public"."project_event_type" drop column "created_by_id";

alter table "public"."project_event_type" drop column "updated_at";

alter table "public"."project_event_type" drop column "updated_by_id";

alter table "public"."project_exemplarity_indicator" drop column "category_id";

alter table "public"."project_exemplarity_indicator" drop column "created_by_id";

alter table "public"."project_exemplarity_indicator" drop column "label";

alter table "public"."project_exemplarity_indicator" drop column "updated_by_id";

alter table "public"."project_exemplarity_indicator" add column "category" smallint not null;

alter table "public"."project_exemplarity_indicator" add column "created_by" uuid not null default default_uid();

alter table "public"."project_exemplarity_indicator" add column "short_title" text not null;

alter table "public"."project_exemplarity_indicator" add column "updated_by" uuid default default_uid();

alter table "public"."project_implantation_mode" drop column "created_at";

alter table "public"."project_implantation_mode" drop column "created_by_id";

alter table "public"."project_implantation_mode" drop column "updated_at";

alter table "public"."project_implantation_mode" drop column "updated_by_id";

alter table "public"."project_material_origin" drop column "created_at";

alter table "public"."project_material_origin" drop column "created_by_id";

alter table "public"."project_material_origin" drop column "updated_at";

alter table "public"."project_material_origin" drop column "updated_by_id";

alter table "public"."project_material_type" drop column "created_by_id";

alter table "public"."project_material_type" drop column "updated_by_id";

alter table "public"."project_material_type" add column "created_by" uuid not null;

alter table "public"."project_material_type" add column "updated_by" uuid;

alter table "public"."project_material_use" drop column "created_by_id";

alter table "public"."project_material_use" drop column "updated_by_id";

alter table "public"."project_material_use" add column "created_by" uuid not null default default_uid();

alter table "public"."project_material_use" add column "short_title" text;

alter table "public"."project_material_use" add column "updated_by" uuid default default_uid();

alter table "public"."project_site_ownership" drop column "created_at";

alter table "public"."project_site_ownership" drop column "created_by_id";

alter table "public"."project_site_ownership" drop column "label";

alter table "public"."project_site_ownership" drop column "updated_at";

alter table "public"."project_site_ownership" drop column "updated_by_id";

alter table "public"."project_site_ownership" add column "short_title" text;

alter table "public"."project_site_usage" drop column "created_by_id";

alter table "public"."project_site_usage" drop column "updated_by_id";

alter table "public"."project_site_usage" add column "created_by" uuid not null default default_uid();

alter table "public"."project_site_usage" add column "updated_by" uuid default default_uid();

alter table "public"."project_site_usage_category" drop column "created_at";

alter table "public"."project_site_usage_category" drop column "created_by_id";

alter table "public"."project_site_usage_category" drop column "updated_at";

alter table "public"."project_site_usage_category" drop column "updated_by_id";

alter table "public"."project_type" drop column "created_at";

alter table "public"."project_type" drop column "created_by_id";

alter table "public"."project_type" drop column "updated_at";

alter table "public"."project_type" drop column "updated_by_id";

alter table "public"."projects" drop column "area";

alter table "public"."projects" drop column "banner_id";

alter table "public"."projects" drop column "created_by_id";

alter table "public"."projects" drop column "implantation_mode_id";

alter table "public"."projects" drop column "site_ownership_id";

alter table "public"."projects" drop column "type_id";

alter table "public"."projects" drop column "updated_by_id";

alter table "public"."projects" add column "banner" uuid;

alter table "public"."projects" add column "building_height" real;

alter table "public"."projects" add column "building_levels_basement" boolean[] not null default '{}'::boolean[];

alter table "public"."projects" add column "building_levels_main" boolean[] not null default '{}'::boolean[];

alter table "public"."projects" add column "building_levels_mezzanine" boolean[] not null default '{}'::boolean[];

alter table "public"."projects" add column "created_by" uuid not null default default_uid();

alter table "public"."projects" add column "implantation_mode" smallint;

alter table "public"."projects" add column "interventions_area" numeric;

alter table "public"."projects" add column "site_ownership" smallint;

alter table "public"."projects" add column "type" smallint;

alter table "public"."projects" add column "updated_by" uuid not null default default_uid();

alter table "public"."projects_exemplarity_indicators" drop column "created_by_id";

alter table "public"."projects_exemplarity_indicators" drop column "exemplarity_indicator_id";

alter table "public"."projects_exemplarity_indicators" drop column "project_id";

alter table "public"."projects_exemplarity_indicators" drop column "updated_by_id";

alter table "public"."projects_exemplarity_indicators" add column "created_by" uuid not null default default_uid();

alter table "public"."projects_exemplarity_indicators" add column "project" uuid not null;

alter table "public"."projects_exemplarity_indicators" add column "updated_by" uuid not null default default_uid();

alter table "public"."projects_images" add column "temporality" temporality not null;

alter table "public"."projects_images" add column "type" bigint not null;

CREATE UNIQUE INDEX actors_collaborators_pkey ON public.actors_users USING btree ("user", actor);

CREATE UNIQUE INDEX organisations_collaborators_pkey ON public.organisations_users USING btree ("user", organisation);

CREATE UNIQUE INDEX project_event_subtype_by_type_pkey ON public.project_event_subtype_by_type USING btree (type, subtype);

CREATE UNIQUE INDEX project_image_type_pkey ON public.project_image_type USING btree (id);

CREATE UNIQUE INDEX project_site_usage_by_category_pkey ON public.project_site_usage_by_category USING btree (usage, category);

CREATE UNIQUE INDEX projects_images_credits_pkey ON public.projects_images_credits USING btree (id, project_image_id);

CREATE UNIQUE INDEX organizations_pkey ON public.organisations USING btree (id);

CREATE UNIQUE INDEX project_event_type_subevent_type_un ON public.project_event_subtype_by_type USING btree (type, subtype);

CREATE UNIQUE INDEX project_exemplarity_indicator_category_pkey ON public.project_exemplarity_category USING btree (id);

CREATE UNIQUE INDEX project_exemplarity_indicator_category_un ON public.project_exemplarity_category USING btree (title);

CREATE UNIQUE INDEX project_exemplarity_indicator_pkey ON public.project_exemplarity_indicator USING btree (id, category);

CREATE UNIQUE INDEX project_site_usage_site_usage_category_un ON public.project_site_usage_by_category USING btree (usage, category);

CREATE UNIQUE INDEX project_type_category_un ON public.project_intervention_by_type USING btree (intervention, type);

CREATE UNIQUE INDEX project_type_pkey ON public.project_intervention USING btree (id);

CREATE UNIQUE INDEX project_type_un ON public.project_intervention USING btree (title);

CREATE UNIQUE INDEX project_type_work_pkey ON public.project_intervention_by_type USING btree (type, intervention);

CREATE UNIQUE INDEX project_work_classification_pkey ON public.project_intervention_category USING btree (id);

CREATE UNIQUE INDEX projects_exemplarity_indicators_pkey ON public.projects_exemplarity_indicators USING btree (project);

alter table "public"."actors_users" add constraint "actors_collaborators_pkey" PRIMARY KEY using index "actors_collaborators_pkey";

alter table "public"."organisations" add constraint "organizations_pkey" PRIMARY KEY using index "organizations_pkey";

alter table "public"."organisations_users" add constraint "organisations_collaborators_pkey" PRIMARY KEY using index "organisations_collaborators_pkey";

alter table "public"."project_event_subtype_by_type" add constraint "project_event_subtype_by_type_pkey" PRIMARY KEY using index "project_event_subtype_by_type_pkey";

alter table "public"."project_exemplarity_category" add constraint "project_exemplarity_indicator_category_pkey" PRIMARY KEY using index "project_exemplarity_indicator_category_pkey";

alter table "public"."project_image_type" add constraint "project_image_type_pkey" PRIMARY KEY using index "project_image_type_pkey";

alter table "public"."project_intervention" add constraint "project_type_pkey" PRIMARY KEY using index "project_type_pkey";

alter table "public"."project_intervention_by_type" add constraint "project_type_work_pkey" PRIMARY KEY using index "project_type_work_pkey";

alter table "public"."project_intervention_category" add constraint "project_work_classification_pkey" PRIMARY KEY using index "project_work_classification_pkey";

alter table "public"."project_site_usage_by_category" add constraint "project_site_usage_by_category_pkey" PRIMARY KEY using index "project_site_usage_by_category_pkey";

alter table "public"."projects_images_credits" add constraint "projects_images_credits_pkey" PRIMARY KEY using index "projects_images_credits_pkey";

alter table "public"."project_exemplarity_indicator" add constraint "project_exemplarity_indicator_pkey" PRIMARY KEY using index "project_exemplarity_indicator_pkey";

alter table "public"."projects_exemplarity_indicators" add constraint "projects_exemplarity_indicators_pkey" PRIMARY KEY using index "projects_exemplarity_indicators_pkey";

alter table "public"."actors" add constraint "actors_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."actors" validate constraint "actors_created_by_fkey";

alter table "public"."actors" add constraint "actors_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."actors" validate constraint "actors_updated_by_fkey";

alter table "public"."actors_users" add constraint "actors_users_actor_fkey" FOREIGN KEY (actor) REFERENCES actors(id) ON DELETE CASCADE not valid;

alter table "public"."actors_users" validate constraint "actors_users_actor_fkey";

alter table "public"."actors_users" add constraint "actors_users_user_fkey" FOREIGN KEY ("user") REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."actors_users" validate constraint "actors_users_user_fkey";

alter table "public"."organisations" add constraint "organisations_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."organisations" validate constraint "organisations_created_by_fkey";

alter table "public"."organisations" add constraint "organisations_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."organisations" validate constraint "organisations_updated_by_fkey";

alter table "public"."organisations_users" add constraint "organisations_users_organisation_fkey" FOREIGN KEY (organisation) REFERENCES organisations(id) ON DELETE CASCADE not valid;

alter table "public"."organisations_users" validate constraint "organisations_users_organisation_fkey";

alter table "public"."organisations_users" add constraint "organisations_users_user_fkey" FOREIGN KEY ("user") REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."organisations_users" validate constraint "organisations_users_user_fkey";

alter table "public"."project_event_subtype_by_type" add constraint "project_event_subtype_by_type_subtype_fkey" FOREIGN KEY (subtype) REFERENCES project_type(id) ON DELETE CASCADE not valid;

alter table "public"."project_event_subtype_by_type" validate constraint "project_event_subtype_by_type_subtype_fkey";

alter table "public"."project_event_subtype_by_type" add constraint "project_event_subtype_by_type_type_fkey" FOREIGN KEY (type) REFERENCES project_type(id) ON DELETE CASCADE not valid;

alter table "public"."project_event_subtype_by_type" validate constraint "project_event_subtype_by_type_type_fkey";

alter table "public"."project_event_subtype_by_type" add constraint "project_event_type_subevent_type_un" UNIQUE using index "project_event_type_subevent_type_un";

alter table "public"."project_exemplarity_category" add constraint "project_exemplarity_indicator_category_un" UNIQUE using index "project_exemplarity_indicator_category_un";

alter table "public"."project_exemplarity_indicator" add constraint "project_exemplarity_indicator_category_fkey" FOREIGN KEY (category) REFERENCES project_exemplarity_category(id) ON DELETE RESTRICT not valid;

alter table "public"."project_exemplarity_indicator" validate constraint "project_exemplarity_indicator_category_fkey";

alter table "public"."project_exemplarity_indicator" add constraint "project_exemplarity_indicator_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."project_exemplarity_indicator" validate constraint "project_exemplarity_indicator_created_by_fkey";

alter table "public"."project_exemplarity_indicator" add constraint "project_exemplarity_indicator_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."project_exemplarity_indicator" validate constraint "project_exemplarity_indicator_updated_by_fkey";

alter table "public"."project_intervention" add constraint "project_intervention_category_fkey" FOREIGN KEY (category) REFERENCES project_intervention_category(id) ON DELETE RESTRICT not valid;

alter table "public"."project_intervention" validate constraint "project_intervention_category_fkey";

alter table "public"."project_intervention" add constraint "project_intervention_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."project_intervention" validate constraint "project_intervention_created_by_fkey";

alter table "public"."project_intervention" add constraint "project_intervention_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."project_intervention" validate constraint "project_intervention_updated_by_fkey";

alter table "public"."project_intervention" add constraint "project_type_un" UNIQUE using index "project_type_un";

alter table "public"."project_intervention_by_type" add constraint "project_intervention_by_type_intervention_fkey" FOREIGN KEY (intervention) REFERENCES project_intervention(id) ON DELETE CASCADE not valid;

alter table "public"."project_intervention_by_type" validate constraint "project_intervention_by_type_intervention_fkey";

alter table "public"."project_intervention_by_type" add constraint "project_intervention_by_type_type_fkey" FOREIGN KEY (type) REFERENCES project_type(id) ON DELETE CASCADE not valid;

alter table "public"."project_intervention_by_type" validate constraint "project_intervention_by_type_type_fkey";

alter table "public"."project_intervention_by_type" add constraint "project_type_category_un" UNIQUE using index "project_type_category_un";

alter table "public"."project_material_type" add constraint "project_material_type_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."project_material_type" validate constraint "project_material_type_created_by_fkey";

alter table "public"."project_material_type" add constraint "project_material_type_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."project_material_type" validate constraint "project_material_type_updated_by_fkey";

alter table "public"."project_material_use" add constraint "project_material_use_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."project_material_use" validate constraint "project_material_use_created_by_fkey";

alter table "public"."project_material_use" add constraint "project_material_use_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."project_material_use" validate constraint "project_material_use_updated_by_fkey";

alter table "public"."project_site_usage" add constraint "project_site_usage_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."project_site_usage" validate constraint "project_site_usage_created_by_fkey";

alter table "public"."project_site_usage" add constraint "project_site_usage_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."project_site_usage" validate constraint "project_site_usage_updated_by_fkey";

alter table "public"."project_site_usage_by_category" add constraint "project_site_usage_by_category_category_fkey" FOREIGN KEY (category) REFERENCES project_site_usage_category(id) ON DELETE CASCADE not valid;

alter table "public"."project_site_usage_by_category" validate constraint "project_site_usage_by_category_category_fkey";

alter table "public"."project_site_usage_by_category" add constraint "project_site_usage_by_category_usage_fkey" FOREIGN KEY (usage) REFERENCES project_site_usage(id) ON DELETE CASCADE not valid;

alter table "public"."project_site_usage_by_category" validate constraint "project_site_usage_by_category_usage_fkey";

alter table "public"."project_site_usage_by_category" add constraint "project_site_usage_site_usage_category_un" UNIQUE using index "project_site_usage_site_usage_category_un";

alter table "public"."projects" add constraint "projects_banner_fkey" FOREIGN KEY (banner) REFERENCES projects_images(id) ON DELETE SET NULL not valid;

alter table "public"."projects" validate constraint "projects_banner_fkey";

alter table "public"."projects" add constraint "projects_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."projects" validate constraint "projects_created_by_fkey";

alter table "public"."projects" add constraint "projects_implantation_mode_fkey" FOREIGN KEY (implantation_mode) REFERENCES project_implantation_mode(id) ON DELETE SET NULL not valid;

alter table "public"."projects" validate constraint "projects_implantation_mode_fkey";

alter table "public"."projects" add constraint "projects_site_ownership_fkey" FOREIGN KEY (site_ownership) REFERENCES project_site_ownership(id) ON DELETE SET NULL not valid;

alter table "public"."projects" validate constraint "projects_site_ownership_fkey";

alter table "public"."projects" add constraint "projects_type_fkey" FOREIGN KEY (type) REFERENCES project_type(id) ON DELETE SET NULL not valid;

alter table "public"."projects" validate constraint "projects_type_fkey";

alter table "public"."projects" add constraint "projects_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."projects" validate constraint "projects_updated_by_fkey";

alter table "public"."projects_exemplarity_indicators" add constraint "projects_exemplarity_indicators_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."projects_exemplarity_indicators" validate constraint "projects_exemplarity_indicators_created_by_fkey";

alter table "public"."projects_exemplarity_indicators" add constraint "projects_exemplarity_indicators_project_fkey" FOREIGN KEY (project) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."projects_exemplarity_indicators" validate constraint "projects_exemplarity_indicators_project_fkey";

alter table "public"."projects_exemplarity_indicators" add constraint "projects_exemplarity_indicators_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."projects_exemplarity_indicators" validate constraint "projects_exemplarity_indicators_updated_by_fkey";

alter table "public"."projects_images" add constraint "projects_images_type_fkey" FOREIGN KEY (type) REFERENCES project_image_type(id) not valid;

alter table "public"."projects_images" validate constraint "projects_images_type_fkey";

alter table "public"."projects_images_credits" add constraint "projects_images_credits_actor_id_fkey" FOREIGN KEY (actor_id) REFERENCES actors(id) ON DELETE SET NULL not valid;

alter table "public"."projects_images_credits" validate constraint "projects_images_credits_actor_id_fkey";

alter table "public"."projects_images_credits" add constraint "projects_images_credits_organisation_id_fkey" FOREIGN KEY (organisation_id) REFERENCES organisations(id) ON DELETE SET NULL not valid;

alter table "public"."projects_images_credits" validate constraint "projects_images_credits_organisation_id_fkey";

alter table "public"."projects_images_credits" add constraint "projects_images_credits_project_image_id_fkey" FOREIGN KEY (project_image_id) REFERENCES projects_images(id) ON DELETE CASCADE not valid;

alter table "public"."projects_images_credits" validate constraint "projects_images_credits_project_image_id_fkey";

alter table "public"."projects_images" add constraint "projects_images_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."projects_images" validate constraint "projects_images_created_by_id_fkey";

alter table "public"."projects_images" add constraint "projects_images_id_fkey" FOREIGN KEY (id) REFERENCES storage.objects(id) ON DELETE CASCADE not valid;

alter table "public"."projects_images" validate constraint "projects_images_id_fkey";

alter table "public"."projects_images" add constraint "projects_images_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."projects_images" validate constraint "projects_images_project_id_fkey";

alter table "public"."projects_images" add constraint "projects_images_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."projects_images" validate constraint "projects_images_updated_by_id_fkey";

alter table "public"."projects_works" add constraint "projects_works_work_id_fkey" FOREIGN KEY (work_id) REFERENCES project_intervention(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects_works" validate constraint "projects_works_work_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.authorize_org_update(org organisations)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
	begin
		-- Allow rbac-based authotization
		if public.authorize('organization_update') then return true;
		-- Creators can manage as they please (except publish)
		elseif org.created_by_id = auth.uid() then return true;
		-- Check if collaborator
		else return exists (
			select 1 from public.organizations_users as ou
			where ou.organization_id = org.id
			and ou.user_id = auth.uid()
		);
		end if;
	end;
$function$
;

create or replace view "public"."editable_actors" as  SELECT a.id,
    a.created_at,
    a.updated_at,
    a.created_by AS created_by_id,
    a.updated_by AS updated_by_id,
    a.first_name,
    a.last_name,
    a.middle_name,
    a.about
   FROM actors a
  WHERE authorize_actor_update(a.*);


create or replace view "public"."editable_organizations" as  SELECT o.id,
    o.created_at,
    o.created_by AS created_by_id,
    o.updated_at,
    o.updated_by AS updated_by_id,
    o.name,
    o.short_name,
    o.about
   FROM organisations o
  WHERE authorize_org_update(o.id);


create or replace view "public"."editable_projects" as  SELECT projects.id,
    projects.created_at,
    projects.updated_at,
    projects.created_by AS created_by_id,
    projects.updated_by AS updated_by_id,
    projects.title,
    projects.description,
    projects.site_ownership AS site_ownership_id,
    projects.site_area,
    projects.interventions_area AS area,
    projects.adjacent_streets,
    projects.building_area,
    projects.implantation_mode AS implantation_mode_id,
    projects.building_construction_year,
    projects.type AS type_id,
    projects.banner AS banner_id,
    projects.cost_range,
    projects.likes_sum
   FROM projects
  WHERE authorize_project_update(projects.id);


create or replace view "public"."random_project_images" as  SELECT p.title AS project_title,
    pi.created_at,
    pi.updated_at,
    pi.created_by_id,
    pi.updated_by_id,
    pi.title,
    pi.description,
    pi."order",
    pi.project_id,
    pi.name,
    pi.id,
    pi.color_dominant_hsl,
    pi.color_dominant_lab,
    pi.color_mean_hsl,
    pi.color_mean_lab
   FROM (projects p
     RIGHT JOIN projects_images pi ON ((pi.project_id = p.id)))
  WHERE project_is_public(p.id)
  ORDER BY (random());


create policy "Anyone can select orgs"
on "public"."organisations"
as permissive
for select
to public
using (true);


create policy "Authorize org update"
on "public"."organisations"
as permissive
for all
to authenticated
using (authorize_org_update(organisations.*))
with check (authorize_org_update(organisations.*));


create policy "anyone can select"
on "public"."project_event_subtype_by_type"
as permissive
for select
to public
using (true);


create policy "anyone can select"
on "public"."project_exemplarity_category"
as permissive
for select
to public
using (true);


create policy "Anyone can select"
on "public"."project_intervention"
as permissive
for select
to public
using (true);


create policy "Authorize project work delete"
on "public"."project_intervention"
as permissive
for delete
to public
using (authorize('descriptors_delete'::text));


create policy "Authorize project work insert"
on "public"."project_intervention"
as permissive
for insert
to public
with check (authorize('descriptors_insert'::text));


create policy "Authorize project work update"
on "public"."project_intervention"
as permissive
for update
to public
using (authorize('descriptors_update'::text))
with check (authorize('descriptors_update'::text));


create policy "anyone can select"
on "public"."project_intervention_by_type"
as permissive
for select
to public
using (true);


create policy "editors and admins can do anything"
on "public"."project_intervention_by_type"
as permissive
for all
to public
using (user_has_role(VARIADIC ARRAY['editor'::app_role, 'admin'::app_role]))
with check (user_has_role(VARIADIC ARRAY['editor'::app_role, 'admin'::app_role]));


create policy "Anyone can select project work classifications"
on "public"."project_intervention_category"
as permissive
for select
to public
using (true);


create policy "Authorize delete"
on "public"."project_intervention_category"
as permissive
for delete
to public
using (authorize('descriptors_delete'::text));


create policy "Authorize insert"
on "public"."project_intervention_category"
as permissive
for insert
to public
with check (authorize('descriptors_insert'::text));


create policy "Authorize update"
on "public"."project_intervention_category"
as permissive
for update
to public
using (authorize('descriptors_update'::text))
with check (authorize('descriptors_update'::text));


create policy "anyone can select"
on "public"."project_site_usage_by_category"
as permissive
for select
to public
using (true);


create policy "any project manager can manage respective project indicators"
on "public"."projects_exemplarity_indicators"
as permissive
for all
to public
using (authorize_project_update(project));


create policy "anyone can select indicators of public projects"
on "public"."projects_exemplarity_indicators"
as permissive
for select
to public
using (project_is_public(project));



