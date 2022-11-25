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
  WHERE user_can_edit_project(p.*);



