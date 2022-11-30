drop policy "Anyone can select projects" on "public"."projects";

drop policy "Only creators or collaborators can delete projects" on "public"."projects";

drop policy "Anyone can select status" on "public"."projects_publication_status";

drop policy "Only authed users can create projects" on "public"."projects";

drop view if exists "public"."editable_projects";

drop function if exists "public"."user_can_edit_project"(p_row projects);

alter table "public"."projects_events" enable row level security;

alter table "public"."projects_exemplarity_indicators" enable row level security;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.project_is_public(pid uuid)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
	begin
		return exists (
			select 1 from projects_publication_status as pps
  			where pps.project_id = projects.id
  			and pps.status = 'published'::publication_status
  		);
	end;
$function$
;

CREATE OR REPLACE FUNCTION public.user_can_edit_project(pid uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
	begin
		if public.user_has_role('admin') then return true;
		elseif exists (
			select 1 from public.projects as p
			where p.id  = pid
			and p.created_by_id = auth.uid()
		) then return true;
		else return exists (
			select 1 from public.projects_users as pu
			where pu.project_id = pid
			and pu.user_id = auth.uid()
		);
		end if;
	end;
$function$
;

CREATE OR REPLACE FUNCTION public.user_can_edit_project(prow projects)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
	begin
		if public.user_has_role('admin') then return true;
		elseif prow.created_by_id = auth.uid() then return true;
		else return exists (
			select 1 from public.projects_users as pu
			where pu.project_id = prow.id
			and pu.user_id = auth.uid()
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
    p.area,
    p.adjacent_streets,
    p.building_area,
    p.implantation_mode_id,
    p.building_construction_year,
    p.type_id,
    p.banner_url,
    p.location_geometry,
    p.location_radius,
    p.cost_range,
    p.likes_sum
   FROM projects p
  WHERE user_can_edit_project(p.id);


create policy "Anyone can select public projects"
on "public"."projects"
as permissive
for select
to public
using (project_is_public(id));


create policy "Creators and collaborators can select regardless of pub status"
on "public"."projects"
as permissive
for select
to public
using (user_can_edit_project(projects.*));


create policy "Only admins or project creators can delete projects"
on "public"."projects"
as permissive
for delete
to public
using ((user_has_role('admin'::user_role) OR (auth.uid() = created_by_id)));


create policy "Anyone can select events of public projects"
on "public"."projects_events"
as permissive
for select
to public
using (project_is_public(project_id));


create policy "Project creators or collaborators can manage respective project"
on "public"."projects_events"
as permissive
for all
to public
using (user_can_edit_project(project_id))
with check (user_can_edit_project(project_id));


create policy "Any project manager can manage respective project indicators"
on "public"."projects_exemplarity_indicators"
as permissive
for all
to public
using (user_can_edit_project(project_id));


create policy "Anyone can select indicators of public projects"
on "public"."projects_exemplarity_indicators"
as permissive
for select
to public
using (project_is_public(project_id));


create policy "Admins can manage any publication status"
on "public"."projects_publication_status"
as permissive
for update
to public
using (user_has_role('admin'::user_role))
with check (user_has_role('admin'::user_role));


create policy "Anyone can select project status"
on "public"."projects_publication_status"
as permissive
for select
to public
using (true);


create policy "Editors can manage publication status for theirs or collaborate"
on "public"."projects_publication_status"
as permissive
for update
to public
using ((user_has_role('editor'::user_role) AND user_can_edit_project(project_id)))
with check ((user_has_role('editor'::user_role) AND user_can_edit_project(project_id)));


create policy "Only authed users can create projects"
on "public"."projects"
as permissive
for insert
to authenticated
with check ((auth.uid() = created_by_id));



