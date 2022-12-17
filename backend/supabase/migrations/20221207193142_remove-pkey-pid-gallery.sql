alter table "public"."projects_images" drop constraint "projects_images_pkey";

drop index if exists "public"."projects_images_pkey";

CREATE UNIQUE INDEX projects_images_pkey ON public.projects_images USING btree (id);

alter table "public"."projects_images" add constraint "projects_images_pkey" PRIMARY KEY using index "projects_images_pkey";