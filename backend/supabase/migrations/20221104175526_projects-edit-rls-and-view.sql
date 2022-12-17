drop policy "Only creators or collaborators can update projects" on "public"."projects";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.user_can_edit_project()
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
	begin

		if public.projects.created_by_id = auth.uid() then return true;
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

		if p_row.created_by_id = auth.uid() then return true;
		end if;
		
	end;
$function$
;

create or replace view "public"."editable_projects" as  SELECT projects.id,
    projects.created_at,
    projects.updated_at,
    projects.created_by_id,
    projects.updated_by_id,
    projects.title,
    projects.description,
    projects.site_ownership_id,
    projects.site_usage_category_id,
    projects.site_usage_id,
    projects.site_area,
    projects.category_id,
    projects.area,
    projects.adjacent_streets,
    projects.location_geometry,
    projects.building_area,
    projects.implantation_mode_id,
    projects.building_construction_year,
    projects.cost_min,
    projects.cost_max,
    projects.type_id,
    projects.combustible,
    projects.banner_id
   FROM projects
  WHERE user_can_edit_project();


create policy "Only creators or collaborators can update projects"
on "public"."projects"
as permissive
for update
to public
using (user_can_edit_project())
with check (user_can_edit_project());



