alter table "public"."projects_gallery_images" drop constraint "projects_gallery_images_index_un";

drop index if exists "public"."projects_gallery_images_index_un";

alter table "public"."projects_gallery_images" drop column "index";

alter table "public"."projects_gallery_images" add column "order" smallint not null;

CREATE UNIQUE INDEX projects_gallery_images_index_un ON public.projects_gallery_images USING btree (project_id, "order");

alter table "public"."projects_gallery_images" add constraint "projects_gallery_images_index_un" UNIQUE using index "projects_gallery_images_index_un";


