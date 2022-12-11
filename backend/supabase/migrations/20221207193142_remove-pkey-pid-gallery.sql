alter table "public"."projects_gallery_images" drop constraint "projects_gallery_images_pkey";

drop index if exists "public"."projects_gallery_images_pkey";

CREATE UNIQUE INDEX projects_gallery_images_pkey ON public.projects_gallery_images USING btree (id);

alter table "public"."projects_gallery_images" add constraint "projects_gallery_images_pkey" PRIMARY KEY using index "projects_gallery_images_pkey";