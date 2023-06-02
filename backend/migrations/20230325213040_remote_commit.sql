drop policy "anyone can select events of public projects" on "public"."projects_events";

drop policy "project creators or collaborators can manage respective project" on "public"."projects_events";

drop policy "anyone can see galleries for published projects" on "public"."projects_images";

drop policy "project creators and collaborators can manage galleries" on "public"."projects_images";

drop policy "anyone can select locations of public projects" on "public"."projects_location";

drop policy "can only update location if can update project" on "public"."projects_location";

drop policy "project editors can select location regardless of publication s" on "public"."projects_location";

drop policy "editors can manage publication status for theirs or collaborate" on "public"."projects_publication_status";

alter table "public"."projects_images" drop constraint "projects_images_created_by_id_fkey";

alter table "public"."projects_images" drop constraint "projects_images_project_id_fkey";

alter table "public"."projects_images" drop constraint "projects_images_updated_by_id_fkey";

alter table "public"."projects_images_credits" drop constraint "projects_images_credits_actor_id_fkey";

alter table "public"."projects_images_credits" drop constraint "projects_images_credits_organisation_id_fkey";

alter table "public"."projects_images_credits" drop constraint "projects_images_credits_project_image_id_fkey";

alter table "public"."projects_location" drop constraint "projects_location_created_by_id_fkey";

alter table "public"."projects_location" drop constraint "projects_location_project_id_fkey";

alter table "public"."projects_location" drop constraint "projects_location_updated_by_id_fkey";

alter table "public"."projects_publication_status" drop constraint "projects_publication_status_project_id_fkey";

alter table "public"."projects_publication_status" drop constraint "projects_publication_status_updated_by_id_fkey";

alter table "public"."projects_images" drop constraint "projects_images_order_un";

drop view if exists "public"."editable_projects";

drop view if exists "public"."random_project_images";

alter table "public"."project_exemplarity_indicator" drop constraint "project_exemplarity_indicator_pkey";

alter table "public"."projects_exemplarity_indicators" drop constraint "projects_exemplarity_indicators_pkey";

alter table "public"."projects_images_credits" drop constraint "projects_images_credits_pkey";

alter table "public"."projects_location" drop constraint "projects_location_pkey";

alter table "public"."projects_publication_status" drop constraint "projects_publication_status_pkey";

drop index if exists "public"."project_exemplarity_indicator_pkey";

drop index if exists "public"."projects_exemplarity_indicators_pkey";

drop index if exists "public"."projects_images_credits_pkey";

drop index if exists "public"."projects_images_order_un";

drop index if exists "public"."projects_location_pkey";

drop index if exists "public"."projects_publication_status_pkey";

drop table "public"."projects_events_ressources";

alter table "public"."projects" add column "adjacent_alleys" smallint;

alter table "public"."projects_events" drop column "created_by_id";

alter table "public"."projects_events" drop column "end_date";

alter table "public"."projects_events" drop column "parent_id";

alter table "public"."projects_events" drop column "project_id";

alter table "public"."projects_events" drop column "start_date";

alter table "public"."projects_events" drop column "type_id";

alter table "public"."projects_events" drop column "updated_by_id";

alter table "public"."projects_events" add column "created_by" uuid not null default default_uid();

alter table "public"."projects_events" add column "end" timestamp with time zone;

alter table "public"."projects_events" add column "parent_event" uuid;

alter table "public"."projects_events" add column "project" uuid not null;

alter table "public"."projects_events" add column "start" timestamp with time zone not null;

alter table "public"."projects_events" add column "type" smallint not null;

alter table "public"."projects_events" add column "updated_by" uuid not null default default_uid();

alter table "public"."projects_exemplarity_indicators" add column "indicator" smallint not null;

alter table "public"."projects_exemplarity_indicators" alter column "description" set data type smallint using "description"::smallint;

alter table "public"."projects_images" drop column "created_by_id";

alter table "public"."projects_images" drop column "name";

alter table "public"."projects_images" drop column "order";

alter table "public"."projects_images" drop column "project_id";

alter table "public"."projects_images" drop column "updated_by_id";

alter table "public"."projects_images" add column "created_by" uuid not null default default_uid();

alter table "public"."projects_images" add column "index" smallint;

alter table "public"."projects_images" add column "project" uuid not null;

alter table "public"."projects_images" add column "storage_name" text not null;

alter table "public"."projects_images" add column "updated_by" uuid not null default default_uid();

alter table "public"."projects_images" alter column "type" set data type smallint using "type"::smallint;

alter table "public"."projects_images_credits" drop column "actor_id";

alter table "public"."projects_images_credits" drop column "name";

alter table "public"."projects_images_credits" drop column "organisation_id";

alter table "public"."projects_images_credits" drop column "project_image_id";

alter table "public"."projects_images_credits" add column "actor" uuid;

alter table "public"."projects_images_credits" add column "first_name" text not null;

alter table "public"."projects_images_credits" add column "image" uuid not null;

alter table "public"."projects_images_credits" add column "last_name" text;

alter table "public"."projects_images_credits" add column "legend" text not null;

alter table "public"."projects_images_credits" add column "organisation" uuid;

alter table "public"."projects_images_credits" add column "user" uuid;

alter table "public"."projects_location" drop column "created_by_id";

alter table "public"."projects_location" drop column "project_id";

alter table "public"."projects_location" drop column "updated_by_id";

alter table "public"."projects_location" add column "created_by" uuid not null default default_uid();

alter table "public"."projects_location" add column "project" uuid not null;

alter table "public"."projects_location" add column "updated_by" uuid not null default default_uid();

alter table "public"."projects_publication_status" drop column "project_id";

alter table "public"."projects_publication_status" drop column "updated_by_id";

alter table "public"."projects_publication_status" add column "project" uuid not null;

alter table "public"."projects_publication_status" add column "updated_by" uuid not null default default_uid();

CREATE UNIQUE INDEX projects_events_pkey ON public.projects_events USING btree (id);

CREATE UNIQUE INDEX project_exemplarity_indicator_pkey ON public.project_exemplarity_indicator USING btree (id);

CREATE UNIQUE INDEX projects_exemplarity_indicators_pkey ON public.projects_exemplarity_indicators USING btree (project, indicator);

CREATE UNIQUE INDEX projects_images_credits_pkey ON public.projects_images_credits USING btree (id);

CREATE UNIQUE INDEX projects_images_order_un ON public.projects_images USING btree (project, index);

CREATE UNIQUE INDEX projects_location_pkey ON public.projects_location USING btree (project);

CREATE UNIQUE INDEX projects_publication_status_pkey ON public.projects_publication_status USING btree (project);

alter table "public"."projects_events" add constraint "projects_events_pkey" PRIMARY KEY using index "projects_events_pkey";

alter table "public"."project_exemplarity_indicator" add constraint "project_exemplarity_indicator_pkey" PRIMARY KEY using index "project_exemplarity_indicator_pkey";

alter table "public"."projects_exemplarity_indicators" add constraint "projects_exemplarity_indicators_pkey" PRIMARY KEY using index "projects_exemplarity_indicators_pkey";

alter table "public"."projects_images_credits" add constraint "projects_images_credits_pkey" PRIMARY KEY using index "projects_images_credits_pkey";

alter table "public"."projects_location" add constraint "projects_location_pkey" PRIMARY KEY using index "projects_location_pkey";

alter table "public"."projects_publication_status" add constraint "projects_publication_status_pkey" PRIMARY KEY using index "projects_publication_status_pkey";

alter table "public"."projects_events" add constraint "projects_events_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."projects_events" validate constraint "projects_events_created_by_fkey";

alter table "public"."projects_events" add constraint "projects_events_parent_event_fkey" FOREIGN KEY (parent_event) REFERENCES projects_events(id) ON DELETE CASCADE not valid;

alter table "public"."projects_events" validate constraint "projects_events_parent_event_fkey";

alter table "public"."projects_events" add constraint "projects_events_project_fkey" FOREIGN KEY (project) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."projects_events" validate constraint "projects_events_project_fkey";

alter table "public"."projects_events" add constraint "projects_events_type_fkey" FOREIGN KEY (type) REFERENCES project_event_type(id) ON DELETE CASCADE not valid;

alter table "public"."projects_events" validate constraint "projects_events_type_fkey";

alter table "public"."projects_events" add constraint "projects_events_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."projects_events" validate constraint "projects_events_updated_by_fkey";

alter table "public"."projects_exemplarity_indicators" add constraint "projects_exemplarity_indicators_indicator_fkey" FOREIGN KEY (indicator) REFERENCES project_exemplarity_indicator(id) ON DELETE CASCADE not valid;

alter table "public"."projects_exemplarity_indicators" validate constraint "projects_exemplarity_indicators_indicator_fkey";

alter table "public"."projects_images" add constraint "projects_images_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."projects_images" validate constraint "projects_images_created_by_fkey";

alter table "public"."projects_images" add constraint "projects_images_project_fkey" FOREIGN KEY (project) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."projects_images" validate constraint "projects_images_project_fkey";

alter table "public"."projects_images" add constraint "projects_images_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."projects_images" validate constraint "projects_images_updated_by_fkey";

alter table "public"."projects_images_credits" add constraint "projects_images_credits_actor_fkey" FOREIGN KEY (actor) REFERENCES actors(id) ON DELETE SET NULL not valid;

alter table "public"."projects_images_credits" validate constraint "projects_images_credits_actor_fkey";

alter table "public"."projects_images_credits" add constraint "projects_images_credits_image_fkey" FOREIGN KEY (image) REFERENCES projects_images(id) ON DELETE CASCADE not valid;

alter table "public"."projects_images_credits" validate constraint "projects_images_credits_image_fkey";

alter table "public"."projects_images_credits" add constraint "projects_images_credits_organisation_fkey" FOREIGN KEY (organisation) REFERENCES organisations(id) ON DELETE SET NULL not valid;

alter table "public"."projects_images_credits" validate constraint "projects_images_credits_organisation_fkey";

alter table "public"."projects_images_credits" add constraint "projects_images_credits_user_fkey" FOREIGN KEY ("user") REFERENCES users(id) ON DELETE SET NULL not valid;

alter table "public"."projects_images_credits" validate constraint "projects_images_credits_user_fkey";

alter table "public"."projects_location" add constraint "projects_location_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."projects_location" validate constraint "projects_location_created_by_fkey";

alter table "public"."projects_location" add constraint "projects_location_project_fkey" FOREIGN KEY (project) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."projects_location" validate constraint "projects_location_project_fkey";

alter table "public"."projects_location" add constraint "projects_location_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."projects_location" validate constraint "projects_location_updated_by_fkey";

alter table "public"."projects_publication_status" add constraint "projects_publication_status_project_fkey" FOREIGN KEY (project) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."projects_publication_status" validate constraint "projects_publication_status_project_fkey";

alter table "public"."projects_publication_status" add constraint "projects_publication_status_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."projects_publication_status" validate constraint "projects_publication_status_updated_by_fkey";

alter table "public"."projects_images" add constraint "projects_images_order_un" UNIQUE using index "projects_images_order_un" DEFERRABLE INITIALLY DEFERRED;

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
    pi.created_by AS created_by_id,
    pi.updated_by AS updated_by_id,
    pi.title,
    pi.description,
    pi.index AS "order",
    pi.project AS project_id,
    pi.storage_name AS name,
    pi.id,
    pi.color_dominant_hsl,
    pi.color_dominant_lab,
    pi.color_mean_hsl,
    pi.color_mean_lab
   FROM (projects p
     RIGHT JOIN projects_images pi ON ((pi.project = p.id)))
  WHERE project_is_public(p.id)
  ORDER BY (random());


create policy "anyone can select events of public projects"
on "public"."projects_events"
as permissive
for select
to public
using (project_is_public(project));


create policy "project creators or collaborators can manage respective project"
on "public"."projects_events"
as permissive
for all
to public
using (authorize_project_update(project))
with check (authorize_project_update(project));


create policy "anyone can see galleries for published projects"
on "public"."projects_images"
as permissive
for select
to public
using (project_is_public(project));


create policy "project creators and collaborators can manage galleries"
on "public"."projects_images"
as permissive
for all
to authenticated
using (authorize_project_update(project))
with check (authorize_project_update(project));


create policy "anyone can select locations of public projects"
on "public"."projects_location"
as permissive
for select
to public
using (project_is_public(project));


create policy "can only update location if can update project"
on "public"."projects_location"
as permissive
for update
to public
using (authorize_project_update(project))
with check (authorize_project_update(project));


create policy "project editors can select location regardless of publication s"
on "public"."projects_location"
as permissive
for select
to public
using (authorize_project_update(project));


create policy "editors can manage publication status for theirs or collaborate"
on "public"."projects_publication_status"
as permissive
for update
to public
using ((user_has_role('editor'::app_role) AND authorize_project_update(project)))
with check ((user_has_role('editor'::app_role) AND authorize_project_update(project)));



