drop view if exists "public"."editable_projects";

drop view if exists "public"."projects_likes_count";

drop view if exists "public"."projects_publication_status_fulfill";

drop view if exists "public"."random_projects_images";

alter table "public"."projects" add column "is_demo" boolean;

CREATE UNIQUE INDEX projects_users_un ON public.projects_users USING btree ("user", project);

alter table "public"."projects_users" add constraint "projects_users_un" UNIQUE using index "projects_users_un";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.enforce_projects_creators()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
	BEGIN
		if (exists (
			select 1 from projects as p
			where p.id = old.project
			and p.created_by = old."user"
		)) then 
			raise exception 'Cannot remove or update project creator as a project user.';
		elseif (TG_OP = 'DELETE') then
			return old;
		else
			return new;
		end if;
	END;
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
		-- Check if collaborator or creator
		elseif exists (
			select 1 from public.projects_users as pu
			where pu.project = p_id
			and pu.user = auth.uid()
		) then return true;
		-- This should never be reached, but is kept as precaution. Creators can manage as they please (except publish)
		else return exists (
			select 1 from public.projects as p
			where p.id = p_id
			and p.created_by = auth.uid()
		);
		end if;
	end;
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
    projects.adjacent_alleys
   FROM projects
  WHERE authorize_project_update(projects.id);


CREATE OR REPLACE FUNCTION public.handle_new_project()
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

create or replace view "public"."projects_likes_count" as  SELECT p.id,
    count(l.project) AS count
   FROM (projects p
     LEFT JOIN projects_likes l ON ((p.id = l.project)))
  GROUP BY p.id;


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


create policy "Anyone can select projects users"
on "public"."projects_users"
as permissive
for select
to public
using (true);


CREATE TRIGGER prevent_project_creator_delete BEFORE DELETE ON public.projects_users FOR EACH ROW EXECUTE FUNCTION enforce_projects_creators();

CREATE TRIGGER prevent_project_creator_update BEFORE UPDATE ON public.projects_users FOR EACH ROW EXECUTE FUNCTION enforce_projects_creators();


