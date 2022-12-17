drop view if exists "public"."editable_projects";

alter table "public"."projects" drop column "location_geometry";

alter table "public"."projects" add column "location" postgis.geometry;

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
    p.location AS location_geometry,
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



