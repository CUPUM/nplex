alter table "public"."projects_images" alter column "color_dominant_hsl" drop not null;

alter table "public"."projects_images" alter column "color_dominant_lab" drop not null;

alter table "public"."projects_images" alter column "color_mean_hsl" drop not null;

alter table "public"."projects_images" alter column "color_mean_lab" drop not null;


