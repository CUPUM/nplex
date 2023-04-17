CREATE OR REPLACE FUNCTION public.handle_user_insert()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin

    if not exists (
        select 1 from public.users_roles as ur
        where ur.role = 'nplex'::public.app_role
    ) then
        -- percolate auth signup to users and users_roles, while making sure the first user registered is 'nplex'
        -- with role 'nplex' to handle author right relegation on further user profile deletions.
        insert into public.users (id, first_name, updated_by)
        values (new.id, 'nplex'::text, new.id);
        insert into public.users_roles ("user", role, updated_by)
        values (new.id, 'nplex'::public.app_role, new.id);
        -- raise notice 'the created user with id % was attributed the "nplex" lead role to fullfill required profile', new.id;
    elseif char_length(coalesce(new.raw_user_meta_data->>'first_name', '')) = 0 then
    	raise exception 'A first name is required to signup.';
    else
        insert into public.users (id, first_name, last_name, updated_by)
        values (new.id, coalesce(new.raw_user_meta_data->>'first_name', null), coalesce(new.raw_user_meta_data->>'last_name', null), new.id);
        insert into public.users_roles ("user", updated_by)
        values (new.id, new.id);
    end if;

    return new;

end;
$function$
;

drop trigger if exists "on_new_user" on "auth"."users";

CREATE TRIGGER on_new_user AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_user_insert();


drop trigger if exists "protect_project_location" on "public"."projects_location";

drop trigger if exists "protect_project_publication_status" on "public"."projects_publication_status";

drop trigger if exists "restrict_project_publishing" on "public"."projects_publication_status";

drop trigger if exists "prevent_project_creator_delete" on "public"."projects_users";

drop trigger if exists "prevent_project_creator_update" on "public"."projects_users";

drop trigger if exists "on_new_project" on "public"."projects";

drop policy "Authorize project update" on "public"."projects";

drop policy "anyone can select public projects" on "public"."projects";

drop policy "can only update location if can update project" on "public"."projects_location";

drop policy "project editors can select location regardless of publication s" on "public"."projects_location";

drop policy "admins can manage any publication status" on "public"."projects_publication_status";

drop policy "any user can manage their own project's publication status" on "public"."projects_publication_status";

drop policy "anyone can select project status" on "public"."projects_publication_status";

drop policy "editors can manage publication status for theirs or collaborate" on "public"."projects_publication_status";

alter table "public"."projects_location" drop constraint "projects_location_created_by_fkey";

alter table "public"."projects_location" drop constraint "projects_location_project_fkey";

alter table "public"."projects_location" drop constraint "projects_location_updated_by_fkey";

alter table "public"."projects_publication_status" drop constraint "projects_publication_status_project_fkey";

alter table "public"."projects_publication_status" drop constraint "projects_publication_status_updated_by_fkey";

drop function if exists "public"."enforce_projects_creators"();

drop function if exists "public"."handle_new_project"();

drop function if exists "public"."handle_new_user"();

drop function if exists "public"."project_descriptors"();

drop view if exists "public"."projects_publication_status_fulfill";

drop function if exists "public"."protect_project_essential"();

drop view if exists "public"."editable_projects";

drop view if exists "public"."explore_projects";

drop view if exists "public"."projects_likes_count";

drop view if exists "public"."random_projects_images";

alter table "public"."projects_location" drop constraint "projects_location_pkey";

alter table "public"."projects_publication_status" drop constraint "projects_publication_status_pkey";

drop index if exists "public"."projects_location_pkey";

drop index if exists "public"."projects_publication_status_pkey";

drop table "public"."projects_location";

drop table "public"."projects_publication_status";

alter table "public"."projects" add column "location" geometry(Point);

alter table "public"."projects" add column "location_radius" real not null default 0;

alter table "public"."projects" add column "location_obfuscated" geometry(Point) generated always as (
CASE
    WHEN (location IS NULL) THEN NULL::geometry(Point)
    ELSE st_geometryn(st_generatepoints(st_buffer(location, (location_radius)::double precision, 'quad_segs=8'::text), 1, 1337), 1)
END) stored;

alter table "public"."projects" add column "publication_requested_at" timestamp with time zone;

alter table "public"."projects" add column "publication_requested" boolean not null generated always as ((publication_requested_at IS NOT NULL)) stored;

alter table "public"."projects" add column "published_at" timestamp with time zone;

alter table "public"."projects" add column "published" boolean not null generated always as ((published_at IS NOT NULL)) stored;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_project_descriptors()
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
    return (
        select json_build_object(
            'types', (
                select coalesce(json_agg(row_to_json(ft)), '[]'::json)
				from (
					select t.*, coalesce(nullif(array_agg(ip), '{NULL}'), '{}') as interventions
					from public.project_type t
					left join (
						select ti.type, i.*
						from public.project_intervention_by_type ti
						left join public.project_intervention i
						on ti.intervention = i.id
					) ip
					on ip.type = t.id
					group by t.id
				) ft
            ),
            'interventionCategories', (
            	select coalesce(json_agg(row_to_json(ic)), '[]'::json)
            	from (
            		select *
            		from public.project_intervention_category
            		order by title asc
            	) ic
            ),
           'interventions', (
                select coalesce(json_agg(row_to_json(pti)), '[]'::json)
                from (
                    select i.*, coalesce(nullif(array_agg(ti.type), '{NULL}'), '{}') as types
                    from public.project_intervention i
                    left join public.project_intervention_by_type ti
                    on ti.intervention = i.id
                    group by i.id
                    order by i.title asc
                ) pti
            ),
            'siteOwnerships', (
                select coalesce(json_agg(row_to_json(so)), '[]'::json)
                from (
                	select *
                	from public.project_site_ownership
               		order by title asc
               	) so
            ),
            'siteUsagesCategories', (
                select coalesce(json_agg(row_to_json(suc)), '[]'::json)
                from (
                	select *
                	from public.project_site_usage_category
                	order by title asc
                ) suc
            ),
            'siteUsages', (
                select coalesce(json_agg(row_to_json(susupc)), '[]'::json)
                from (
                    select su.*, coalesce(nullif(array_agg(supc.category), '{NULL}'), '{}') as categories
                    from public.project_site_usage su
                    left join public.project_site_usage_by_category supc
                    on supc.usage = su.id
                    group by su.id
                    order by su.title asc
                ) susupc
            ),
            'implantationModes', (
                select coalesce(json_agg(row_to_json(im)), '[]'::json)
                from (
                	select *
                	from public.project_implantation_mode
                	order by title asc
                ) im
            ),
            'materialOrigins', (
                select coalesce(json_agg(row_to_json(mo)), '[]'::json)
                from (
                	select *
                	from public.project_material_origin
                	order by title asc
                ) mo
            ),
            'materialTypes', (
                select coalesce(json_agg(row_to_json(mt)), '[]'::json)
                from (
                	select *
                	from public.project_material_type
                	order by title asc
                ) mt
            ),
            'materialUses', (
                select coalesce(json_agg(row_to_json(mu)), '[]'::json)
                from (
                	select *
                	from public.project_material_use
                	order by title asc
                ) mu
            ),
            'eventTypes', (
                select coalesce(json_agg(row_to_json(eseby)), '[]'::json)
                from (
                    select e.*, coalesce(nullif(array_agg(seby.subevent), '{NULL}'), '{}') as subevents  
                    from public.project_event e
                    left join public.project_subevent_by_event seby
                    on seby.event = e.id
                    group by e.id
                    order by e.title asc
                ) eseby
            ),
            'exemplarityCategories', (
                select coalesce(json_agg(row_to_json(ecei)), '[]'::json)
                from (
                    select ec.*, coalesce(nullif(array_agg(ei.*), '{NULL}'), '{}') as indicators
                    from public.project_exemplarity_category ec
                    full join (
                    	select *
                    	from public.project_exemplarity_indicator
                    	order by title asc
                    ) ei
                    on ei.category = ec.id
                    group by ec.id
                    order by ec.title asc
                ) ecei
            ),
            'exemplarityIndicators', (
                select coalesce(json_agg(row_to_json(ei)), '[]'::json)
                from (
                	select *
                	from public.project_exemplarity_indicator
                	order by title asc
                ) ei
            ),
            'imageTypes', (
            	select coalesce(json_agg(row_to_json(it)), '[]'::json)
            	from (
            		select *
            		from public.project_image_type
            		order by title asc
            	) it
            )
        )
    );
end;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_project_insert()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin

    insert into public.projects_publication_status (project)
    	values (new.id);
   	insert into public.projects_location (project)
   		values (new.id);
   	insert into public.projects_users (project, "user", created_by, updated_by, role)
   		values (new.id, new.created_by, new.created_by, new.created_by, 'admin'::app_role);

    return new;

end;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_project_update()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
	begin
		if (auth.role() = 'authenticated') then
			-- Restrict publishing rights
			if (
				old.published_at is null
				and new.published_at is not null
				and not user_has_role('admin', 'editor')
			) then
				new.published_at = null;
				new.requested_at = now();
			end if;
			-- Forbid modification of columns by client users
			if (
				old.id <> new.id
				or old.created_by <> new.created_by
				or old.created_at <> new.created_at
			) then
				raise exception 'Client attempted to update protected (access-restricted) columns.';
			end if;
		end if;
		return new;
	end;
$function$
;

CREATE OR REPLACE FUNCTION public.project_is_public(p_row projects)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
	begin
		return p_row.published;
	end;
$function$
;

CREATE OR REPLACE FUNCTION public.project_publication_satisfy(projects)
 RETURNS boolean
 LANGUAGE sql
 IMMUTABLE
AS $function$
  select ($1.title is not null
  and $1.location is not null
  and $1."type" is not null)
$function$
;

create or replace view "public"."editable_projects" as  SELECT projects.id,
    projects.created_at,
    projects.updated_at,
    projects.created_by,
    projects.updated_by,
    projects.title,
    projects.description,
    projects.site_ownership,
    projects.site_area,
    projects.interventions_area,
    projects.adjacent_streets,
    projects.building_area,
    projects.implantation_mode,
    projects.building_construction_year,
    projects.type,
    projects.banner,
    projects.cost_range,
    projects.likes_sum,
    projects.building_height,
    projects.building_levels_main,
    projects.building_levels_basement,
    projects.building_levels_mezzanine,
    projects.adjacent_alleys,
    projects.summary,
    projects.building_levels_main_count,
    projects.building_levels_basement_count,
    projects.building_levels_mezzanine_count,
    projects.is_demo,
    projects.location,
    projects.publication_requested_at,
    projects.published_at,
    projects.location_radius,
    projects.location_obfuscated,
    projects.publication_requested,
    projects.published
   FROM projects
  WHERE authorize_project_update(projects.id);


create or replace view "public"."explore_projects" as  SELECT p.id,
    p.created_at,
    p.updated_at,
    p.created_by,
    p.updated_by,
    p.title,
    p.description,
    p.site_ownership,
    p.site_area,
    p.interventions_area,
    p.adjacent_streets,
    p.building_area,
    p.implantation_mode,
    p.building_construction_year,
    p.type,
    p.banner,
    p.cost_range,
    p.likes_sum,
    p.building_height,
    p.building_levels_main,
    p.building_levels_basement,
    p.building_levels_mezzanine,
    p.adjacent_alleys,
    p.summary,
    p.building_levels_main_count,
    p.building_levels_basement_count,
    p.building_levels_mezzanine_count,
    p.is_demo,
    p.publication_requested_at,
    p.published_at,
    p.location_obfuscated,
    p.publication_requested,
    p.published
   FROM projects p
  WHERE (project_is_public(p.*) AND project_publication_satisfy(p.*));


CREATE OR REPLACE FUNCTION public.project_is_public(p_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
	begin
		return exists (
			select 1 from projects as p
  			where p.id = p_id
  			and p.published = true
  		);
	end;
$function$
;

create or replace view "public"."projects_likes_count" as  SELECT p.id,
    count(l.project) AS count
   FROM (projects p
     LEFT JOIN projects_likes l ON ((p.id = l.project)))
  GROUP BY p.id;


create or replace view "public"."random_projects_images" as  SELECT p.title AS project_title,
    pi.created_at,
    pi.updated_at,
    pi.created_by,
    pi.updated_by,
    pi.title,
    pi.description,
    pi.index,
    pi.project,
    pi.storage_name,
    pi.id,
    pi.color_dominant_hsl,
    pi.color_dominant_lab,
    pi.color_average_hsl,
    pi.color_average_lab,
    pi.temporality,
    pi.type
   FROM (projects p
     RIGHT JOIN projects_images pi ON ((pi.project = p.id)))
  WHERE project_is_public(p.id)
  ORDER BY (random());


create policy "Collaborators and creator can update project"
on "public"."projects"
as permissive
for all
to authenticated
using (authorize_project_update(projects.*))
with check (authorize_project_update(projects.*));


create policy "Creators can manage project as they please"
on "public"."projects"
as permissive
for all
to authenticated
using ((created_by = auth.uid()))
with check ((created_by = auth.uid()));


create policy "Restrict select of source projects to creators and collaborator"
on "public"."projects"
as permissive
for select
to authenticated
using (authorize_project_update(projects.*));


create policy "Project creators can add users to their projects"
on "public"."projects_users"
as permissive
for insert
to public
with check ((EXISTS ( SELECT 1
   FROM projects p
  WHERE ((p.id = projects_users.project) AND (p.created_by = auth.uid())))));


CREATE TRIGGER handle_project_update BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION handle_project_update();

CREATE TRIGGER on_new_project AFTER INSERT ON public.projects FOR EACH ROW EXECUTE FUNCTION handle_project_insert();


