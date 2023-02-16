drop policy "creators and collaborators can select regardless of pub status" on "public"."projects";

drop policy "only admins or project creators can delete projects" on "public"."projects";

drop policy "only authed users can create projects" on "public"."projects";

drop policy "only creators or collaborators can update projects" on "public"."projects";

create table "public"."actors_users" (
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null,
    "actor_id" uuid not null,
    "role" app_role
);


alter table "public"."actors_users" enable row level security;

create table "public"."organizations_users" (
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null,
    "organization_id" uuid not null,
    "role" app_role
);


alter table "public"."organizations_users" enable row level security;

alter table "public"."actors" enable row level security;

alter table "public"."organizations" alter column "id" set default uuid_generate_v4();

alter table "public"."organizations" enable row level security;

alter table "public"."projects_users" drop column "granted_role";

alter table "public"."projects_users" add column "role" app_role not null default 'editor'::app_role;

alter table "public"."projects_users" enable row level security;

CREATE UNIQUE INDEX actors_users_pkey ON public.actors_users USING btree (user_id);

CREATE UNIQUE INDEX organizations_users_pkey ON public.organizations_users USING btree (user_id, organization_id);

alter table "public"."actors_users" add constraint "actors_users_pkey" PRIMARY KEY using index "actors_users_pkey";

alter table "public"."organizations_users" add constraint "organizations_users_pkey" PRIMARY KEY using index "organizations_users_pkey";

alter table "public"."actors_users" add constraint "actors_users_actor_id_fkey" FOREIGN KEY (actor_id) REFERENCES actors(id) not valid;

alter table "public"."actors_users" validate constraint "actors_users_actor_id_fkey";

alter table "public"."actors_users" add constraint "actors_users_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."actors_users" validate constraint "actors_users_user_id_fkey";

alter table "public"."organizations_users" add constraint "organizations_users_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations(id) not valid;

alter table "public"."organizations_users" validate constraint "organizations_users_organization_id_fkey";

alter table "public"."organizations_users" add constraint "organizations_users_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."organizations_users" validate constraint "organizations_users_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.authorize_actor_update(actor actors)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
	begin
		-- Allow rbac-based authotization
		if public.authorize('project_update') then return true;
		-- Creators can manage as they please (except publish)
		elseif actor.created_by_id = auth.uid() then return true;
		-- Check if collaborator
		else return exists (
			select 1 from public.actors_users as au
			where au.actor_id  = actor.id
			and au.user_id = auth.uid()
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
		-- Allow rbac-based authotization
		if public.authorize('actor_update') then return true;
		-- Creators can manage as they please (except publish)
		elseif exists (
			select 1 from public.actors as a
			where a.id = actor_id
			and a.created_by_id = auth.uid()
		) then return true;
		-- Check if collaborator
		else return exists (
			select 1 from public.actors_users as au
			where au.actor_id  = actor_id
			and au.user_id = auth.uid()
		);
		end if;
	end;
$function$
;

CREATE OR REPLACE FUNCTION public.authorize_org_update(org organizations)
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

CREATE OR REPLACE FUNCTION public.authorize_org_update(org_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
	begin
		-- Allow rbac-based authotization
		if public.authorize('organization_update') then return true;
		-- Creators can manage as they please (except publish)
		elseif exists (
			select 1 from public.organizations as o
			where o.id = org_id
			and o.created_by_id = auth.uid()
		) then return true;
		-- Check if collaborator
		else return exists (
			select 1 from public.organizations_users as ou
			where ou.organization_id  = org_id
			and ou.user_id = auth.uid()
		);
		end if;
	end;
$function$
;

create or replace view "public"."editable_actors" as  SELECT a.id,
    a.created_at,
    a.updated_at,
    a.created_by_id,
    a.updated_by_id,
    a.first_name,
    a.last_name,
    a.middle_name,
    a.about
   FROM actors a
  WHERE authorize_actor_update(a.*);


create or replace view "public"."editable_organizations" as  SELECT o.id,
    o.created_at,
    o.created_by_id,
    o.updated_at,
    o.updated_by_id,
    o.name,
    o.short_name,
    o.about
   FROM organizations o
  WHERE authorize_org_update(o.id);


create policy "Anyone can select actors"
on "public"."actors"
as permissive
for select
to public
using (true);


create policy "Authorize actors updates"
on "public"."actors"
as permissive
for all
to authenticated
using (authorize_actor_update(actors.*))
with check (authorize_actor_update(actors.*));


create policy "Anyone can select orgs"
on "public"."organizations"
as permissive
for select
to public
using (true);


create policy "Authorize org update"
on "public"."organizations"
as permissive
for all
to authenticated
using (authorize_org_update(organizations.*))
with check (authorize_org_update(organizations.*));


create policy "Authorize project update"
on "public"."projects"
as permissive
for all
to authenticated
using (authorize_project_update(projects.*))
with check (authorize_project_update(projects.*));



