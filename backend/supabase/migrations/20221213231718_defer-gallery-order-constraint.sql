alter table "public"."projects_gallery_images" drop constraint "projects_gallery_images_order_un";

drop index if exists "public"."projects_gallery_images_order_un";

CREATE UNIQUE INDEX projects_gallery_images_order_un ON public.projects_gallery_images USING btree (project_id, "order");

alter table "public"."projects_gallery_images" add constraint "projects_gallery_images_order_un" UNIQUE using index "projects_gallery_images_order_un" DEFERRABLE INITIALLY DEFERRED;


