drop view if exists "public"."random_projects_images";

alter table "public"."projects_images" alter column "temporality" set default 'after'::temporality;

alter table "public"."projects_images" alter column "type" set default '1'::smallint;

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



