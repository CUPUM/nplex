drop view if exists "public"."editable_projects";

create table "public"."projects_location" (
    "created_at" timestamp with time zone not null default now(),
    "project_id" uuid not null,
    "updated_at" timestamp with time zone not null default now(),
    "created_by_id" uuid not null default default_uid(),
    "updated_by_id" uuid not null default default_uid(),
    "geometry" postgis.geometry,
    "radius" real
);


alter table "public"."projects_location" enable row level security;

alter table "public"."projects" drop column "location_geometry";

alter table "public"."projects" drop column "location_radius";

CREATE UNIQUE INDEX projects_location_pkey ON public.projects_location USING btree (project_id);

alter table "public"."projects_location" add constraint "projects_location_pkey" PRIMARY KEY using index "projects_location_pkey";

alter table "public"."projects_location" add constraint "projects_location_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."projects_location" validate constraint "projects_location_created_by_id_fkey";

alter table "public"."projects_location" add constraint "projects_location_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects_location" validate constraint "projects_location_project_id_fkey";

alter table "public"."projects_location" add constraint "projects_location_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES users(id) ON UPDATE SET DEFAULT ON DELETE SET DEFAULT not valid;

alter table "public"."projects_location" validate constraint "projects_location_updated_by_id_fkey";

set check_function_bodies = off;

create or replace view "public"."editable_projects" as  SELECT p.id,
    p.created_at,
    p.updated_at,
    p.created_by_id,
    p.updated_by_id,
    p.title,
    p.description,
    p.site_ownership_id,
    p.site_usage_category_id,
    p.site_usage_id,
    p.site_area,
    p.area,
    p.adjacent_streets,
    p.building_area,
    p.implantation_mode_id,
    p.building_construction_year,
    p.type_id,
    p.banner_id,
    p.cost_range,
    p.likes_sum
   FROM projects p
  WHERE user_can_edit_project(p.id);


CREATE OR REPLACE FUNCTION public.handle_new_project()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin

    insert into public.projects_publication_status (project_id)
    values (new.id);
   	insert into public.projects_location (project_id)
   	values (new.id);

    return new;

end;
$function$
;

create policy "Anyone can select locations of public projects"
on "public"."projects_location"
as permissive
for select
to public
using (project_is_public(project_id));


create policy "Can only update location if can update project"
on "public"."projects_location"
as permissive
for update
to public
using (user_can_edit_project(project_id))
with check (user_can_edit_project(project_id));


create policy "Project editors can select location regardless of publication s"
on "public"."projects_location"
as permissive
for select
to public
using (user_can_edit_project(project_id));



