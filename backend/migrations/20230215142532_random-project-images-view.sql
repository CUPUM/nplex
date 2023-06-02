create or replace view "public"."random_project_images" as  SELECT p.title AS project_title,
    pi.created_at,
    pi.updated_at,
    pi.created_by_id,
    pi.updated_by_id,
    pi.title,
    pi.description,
    pi."order",
    pi.project_id,
    pi.name,
    pi.id,
    pi.color_dominant_hsl,
    pi.color_dominant_lab,
    pi.color_mean_hsl,
    pi.color_mean_lab
   FROM (projects p
     RIGHT JOIN projects_images pi ON ((pi.project_id = p.id)))
  WHERE project_is_public(p.id)
  ORDER BY (random());



