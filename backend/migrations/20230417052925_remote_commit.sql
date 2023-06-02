drop view if exists "public"."editable_projects";

drop view if exists "public"."explore_projects";

drop view if exists "public"."projects_likes_count";

drop view if exists "public"."random_projects_images";

alter table "public"."projects" drop column if exists "location_obfuscated";

alter table "public"."projects" add column "location_obfuscated" geometry(point) generated always as (
  case
    when location is null then null::geometry(point)
    else st_geometryn(
      st_generatepoints(
        st_buffer(
          st_setsrid(location, 4326)::geography, coalesce(location_radius, 1000::real)::double precision, 'quad_segs=8'::text)::geometry,
          1,
          1992
      ), 1
    )
  end
) stored;

set check_function_bodies = off;

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
    p.location,
    p.publication_requested_at,
    p.published_at,
    p.location_radius,
    p.publication_requested,
    p.published,
    p.location_obfuscated
   FROM projects p
  WHERE (project_is_public(p.*) AND project_publication_satisfy(p.*));


CREATE OR REPLACE FUNCTION public.project_is_public(p_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
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
  WHERE project_is_public(p.*)
  ORDER BY (random());



