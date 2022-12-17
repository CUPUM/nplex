alter table "public"."projects_images" drop constraint "projects_images_order_un";

drop index if exists "public"."projects_images_order_un";

CREATE UNIQUE INDEX projects_images_order_un ON public.projects_images USING btree (project_id, "order");

alter table "public"."projects_images" add constraint "projects_images_order_un" UNIQUE using index "projects_images_order_un" DEFERRABLE INITIALLY DEFERRED;


