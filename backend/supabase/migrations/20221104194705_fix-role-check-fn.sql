drop policy "Anyone can select projects" on "public"."projects";

drop policy "Only creators or collaborators can update projects" on "public"."projects";

alter table "public"."projects_publication_status" drop constraint "projects_publication_status_project_id_fkey";

alter table "public"."projects_publication_status" drop constraint "projects_publication_status_updated_by_id_fkey";

drop view if exists "public"."editable_projects";

drop function if exists "public"."user_can_edit_project"();

alter table "public"."projects_publication_status" alter column "updated_by_id" set not null;

alter table "public"."projects_publication_status" add constraint "projects_publication_status_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) not valid;

alter table "public"."projects_publication_status" validate constraint "projects_publication_status_project_id_fkey";

alter table "public"."projects_publication_status" add constraint "projects_publication_status_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES users(id) not valid;

alter table "public"."projects_publication_status" validate constraint "projects_publication_status_updated_by_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.user_has_role(role user_role)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
#variable_conflict use_variable
begin

    if auth.uid() = null then return false;

    else return exists (
        select 1
        from public.users_roles as pur
        where pur.user_id = auth.uid()
            and pur.role = role
    );

    end if;

end;
$function$
;

CREATE OR REPLACE FUNCTION public.user_can_edit_project(p_row projects)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
	begin

		--if true then return true;
		if public.user_has_role('admin') then return true;
		elseif p_row.created_by_id = auth.uid() then return true;
		else return exists (select 1 from public.projects_users as pu where pu.project_id = p_row.project_id and pu.user_id = auth.uid());
		end if;
		
	end;
$function$
;

CREATE OR REPLACE FUNCTION public.user_has_role(VARIADIC roles user_role[])
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin

    if auth.uid() = null then return false;

    else return exists (
        select 1
        from public.users_roles as pur
        where pur.user_id = auth.uid()
            and pur.role in (roles)
    );

    end if;

end;
$function$
;

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
    p.category_id,
    p.area,
    p.adjacent_streets,
    p.location_geometry,
    p.building_area,
    p.implantation_mode_id,
    p.building_construction_year,
    p.cost_min,
    p.cost_max,
    p.type_id,
    p.combustible,
    p.banner_id
   FROM projects p
  WHERE user_can_edit_project(p.*);


create policy "Anyone can select projects"
on "public"."projects"
as permissive
for select
to public
using (((EXISTS ( SELECT 1
   FROM projects_publication_status pps
  WHERE ((pps.project_id = projects.id) AND (pps.status = 'published'::publication_status)))) OR user_can_edit_project(projects.*)));


create policy "Only creators or collaborators can update projects"
on "public"."projects"
as permissive
for update
to public
using (user_can_edit_project(projects.*))
with check (user_can_edit_project(projects.*));



