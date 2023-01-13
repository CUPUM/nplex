alter table "public"."projects_images" drop column "color_dominant";

alter table "public"."projects_images" drop column "color_mean";

alter table "public"."projects_images" add column "color_dominant_hsl" cube not null;

alter table "public"."projects_images" add column "color_dominant_lab" cube not null;

alter table "public"."projects_images" add column "color_mean_hsl" cube not null;

alter table "public"."projects_images" add column "color_mean_lab" cube not null;


