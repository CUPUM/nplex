drop policy "anyone can select" on "public"."project_event";

drop policy "anyone can select" on "public"."project_exemplarity_category";

drop policy "Authorize indicators delete" on "public"."project_exemplarity_indicator";

drop policy "Authorize indicators inserts" on "public"."project_exemplarity_indicator";

drop policy "Authorize indicators update" on "public"."project_exemplarity_indicator";

drop policy "Temp unlock all" on "public"."project_exemplarity_indicator";

drop policy "anyone can select" on "public"."project_exemplarity_indicator";

drop policy "Authorize project work delete" on "public"."project_intervention";

drop policy "Authorize project work insert" on "public"."project_intervention";

drop policy "Authorize project work update" on "public"."project_intervention";

drop policy "Authorize delete" on "public"."project_intervention_category";

drop policy "Authorize insert" on "public"."project_intervention_category";

drop policy "Authorize update" on "public"."project_intervention_category";

alter table "public"."role_permissions" drop constraint "role_permissions_un";

alter table "public"."projects_publication_status" drop constraint "projects_publication_status_project_fkey";

alter table "public"."projects_publication_status" drop constraint "projects_publication_status_updated_by_fkey";

drop view if exists "public"."projects_publication_status_fulfill";

alter table "public"."role_permissions" drop constraint "role_permission_pkey";

drop index if exists "public"."role_permission_pkey";

drop index if exists "public"."role_permissions_un";

drop table "public"."role_permissions";

alter table "public"."projects_publication_status" drop column "status";

alter table "public"."projects_publication_status" add column "published" boolean not null default false;

alter table "public"."projects_publication_status" add column "requested" boolean not null default false;

alter table "public"."projects_publication_status" add constraint "projects_publication_status_project_fkey" FOREIGN KEY (project) REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects_publication_status" validate constraint "projects_publication_status_project_fkey";

alter table "public"."projects_publication_status" add constraint "projects_publication_status_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."projects_publication_status" validate constraint "projects_publication_status_updated_by_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.authorize_actor_update(actor actors)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
	begin
		-- Admin-role RBAC
		if public.user_has_role('admin'::app_role) then return true;
		-- Creators can manage as they please (except publish)
		elseif actor.created_by = auth.uid() then return true;
		-- Check if collaborator
		else return exists (
			select 1 from public.actors_users as au
			where au.actor  = actor.id
			and au.user = auth.uid()
		);
		end if;
	end;
$function$
;

CREATE OR REPLACE FUNCTION public.authorize_actor_update(actor_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
	begin
		-- Admin-role RBAC
		if public.user_has_role('admin'::app_role) then return true;
		-- Creators can manage as they please (except publish)
		elseif exists (
			select 1 from public.actors as a
			where a.id = actor_id
			and a.created_by = auth.uid()
		) then return true;
		-- Check if collaborator
		else return exists (
			select 1 from public.actors_users as au
			where au.actor  = actor_id
			and au.user = auth.uid()
		);
		end if;
	end;
$function$
;

CREATE OR REPLACE FUNCTION public.authorize_org_update(org organisations)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
	begin
		-- Admin-role RBAC
		if public.user_has_role('admin'::app_role) then return true;
		-- Creators can manage as they please (except publish)
		elseif org.created_by = auth.uid() then return true;
		-- Check if collaborator
		else return exists (
			select 1 from public.organisations_users as ou
			where ou.organisation = org.id
			and ou.user = auth.uid()
		);
		end if;
	end;
$function$
;

CREATE OR REPLACE FUNCTION public.authorize_org_update(org_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
	begin
		-- Admin-role RBAC
		if public.user_has_role('admin'::app_role) then return true;
		-- Creators can manage as they please (except publish)
		elseif exists (
			select 1 from public.organisations as o
			where o.id = org_id
			and o.created_by = auth.uid()
		) then return true;
		-- Check if collaborator
		else return exists (
			select 1 from public.organisations_users as ou
			where ou.organisation  = org_id
			and ou.user = auth.uid()
		);
		end if;
	end;
$function$
;

CREATE OR REPLACE FUNCTION public.authorize_project_update(p_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
	begin
		-- Admin-role RBAC
		if public.user_has_role('admin'::app_role) then return true;
		-- Creators can manage as they please (except publish)
		elseif exists (
			select 1 from public.projects as p
			where p.id = p_id
			and p.created_by = auth.uid()
		) then return true;
		-- Check if collaborator
		else return exists (
			select 1 from public.projects_users as pu
			where pu.project = p_id
			and pu.user = auth.uid()
		);
		end if;
	end;
$function$
;

CREATE OR REPLACE FUNCTION public.authorize_project_update(p_row projects)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
	begin
		-- Admin-role RBAC
		if public.user_has_role('admin'::app_role) then return true;
		-- Creators can manage as they please (except publish)
		elseif p_row.created_by = auth.uid() then return true;
		-- Check if collaborator
		else return exists (
			select 1 from public.projects_users as pu
			where pu.project = p_row.id
			and pu.user = auth.uid()
		);
		end if;
	end;
$function$
;

CREATE OR REPLACE FUNCTION public.project_is_public(p_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
	begin
		return exists (
			select 1 from projects_publication_status as pps
  			where pps.project = p_id
  			and pps.published = true
  		);
	end;
$function$
;

create or replace view "public"."projects_publication_status_fulfill" as  SELECT ps.project,
    ps.updated_at,
    ps.updated_by,
    ps.published,
    ps.requested,
        CASE
            WHEN ((pl.circle IS NOT NULL) AND (p.title IS NOT NULL) AND (p.type IS NOT NULL)) THEN true
            ELSE false
        END AS fulfill
   FROM ((projects_publication_status ps
     LEFT JOIN projects_location pl ON ((pl.project = ps.project)))
     LEFT JOIN projects p ON ((p.id = ps.project)));


create policy "Authorize all to admins and editors"
on "public"."project_event"
as permissive
for all
to public
using (user_has_role(VARIADIC ARRAY['admin'::app_role, 'editor'::app_role]))
with check (user_has_role(VARIADIC ARRAY['admin'::app_role, 'editor'::app_role]));


create policy "Everyone can select"
on "public"."project_event"
as permissive
for select
to public
using (true);


create policy "Everyone can select"
on "public"."project_exemplarity_category"
as permissive
for select
to public
using (true);


create policy "Anyone can select"
on "public"."project_exemplarity_indicator"
as permissive
for select
to public
using (true);


create policy "Authorize all to admins and editors"
on "public"."project_exemplarity_indicator"
as permissive
for all
to public
using (user_has_role(VARIADIC ARRAY['admin'::app_role, 'editor'::app_role]))
with check (user_has_role(VARIADIC ARRAY['admin'::app_role, 'editor'::app_role]));


create policy "Anyone can select image type"
on "public"."project_image_type"
as permissive
for select
to public
using (true);


create policy "Authorize admins and editor to manage image types"
on "public"."project_image_type"
as permissive
for all
to public
using (user_has_role(VARIADIC ARRAY['admin'::app_role, 'editor'::app_role]))
with check (user_has_role(VARIADIC ARRAY['admin'::app_role, 'editor'::app_role]));


create policy "Authorize admins and editors to manage interventions"
on "public"."project_intervention"
as permissive
for all
to public
using (user_has_role(VARIADIC ARRAY['admin'::app_role, 'editor'::app_role]))
with check (user_has_role(VARIADIC ARRAY['admin'::app_role, 'editor'::app_role]));


create policy "Authorize admins and editors to do anything"
on "public"."project_intervention_category"
as permissive
for all
to public
using (user_has_role(VARIADIC ARRAY['admin'::app_role, 'editor'::app_role]))
with check (user_has_role(VARIADIC ARRAY['admin'::app_role, 'editor'::app_role]));


create policy "authorize admins and editors for anything on material types"
on "public"."project_material_type"
as permissive
for all
to public
using (user_has_role(VARIADIC ARRAY['admin'::app_role, 'editor'::app_role]))
with check (user_has_role(VARIADIC ARRAY['admin'::app_role, 'editor'::app_role]));


create policy "Authorize admins and editors to manage material uses"
on "public"."project_material_use"
as permissive
for all
to public
using (user_has_role(VARIADIC ARRAY['admin'::app_role, 'editor'::app_role]))
with check (user_has_role(VARIADIC ARRAY['admin'::app_role, 'editor'::app_role]));


create policy "Authorize admins and editors to manage sub events"
on "public"."project_subevent_by_event"
as permissive
for all
to public
using (user_has_role(VARIADIC ARRAY['admin'::app_role, 'editor'::app_role]))
with check (user_has_role(VARIADIC ARRAY['admin'::app_role, 'editor'::app_role]));



