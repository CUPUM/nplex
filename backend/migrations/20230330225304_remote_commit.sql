drop view if exists "public"."editable_projects";

drop view if exists "public"."projects_likes_count";

drop view if exists "public"."projects_publication_status_fulfill";

drop view if exists "public"."random_projects_images";

alter table "public"."projects" add column "building_levels_basement_count" smallint generated always as (array_length(building_levels_basement, 1)) stored;

alter table "public"."projects" add column "building_levels_main_count" smallint generated always as (array_length(building_levels_main, 1)) stored;

alter table "public"."projects" add column "building_levels_mezzanine_count" smallint generated always as (array_length(building_levels_mezzanine, 1)) stored;

alter table "public"."projects" add column "summary" text;

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



