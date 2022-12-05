create table "public"."projects_gallery_images" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "created_by_id" uuid not null default default_uid(),
    "updated_by_id" uuid not null default default_uid(),
    "title" text,
    "description" text,
    "index" smallint not null,
    "project_id" uuid not null
);


alter table "public"."projects_gallery_images" enable row level security;

CREATE UNIQUE INDEX projects_gallery_images_index_un ON public.projects_gallery_images USING btree (project_id, index);

CREATE UNIQUE INDEX projects_gallery_images_pkey ON public.projects_gallery_images USING btree (id);

CREATE UNIQUE INDEX projects_gallery_images_un ON public.projects_gallery_images USING btree (id, project_id);

alter table "public"."projects_gallery_images" add constraint "projects_gallery_images_pkey" PRIMARY KEY using index "projects_gallery_images_pkey";

alter table "public"."projects_gallery_images" add constraint "projects_gallery_images_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."projects_gallery_images" validate constraint "projects_gallery_images_created_by_id_fkey";

alter table "public"."projects_gallery_images" add constraint "projects_gallery_images_id_fkey" FOREIGN KEY (id) REFERENCES storage.objects(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects_gallery_images" validate constraint "projects_gallery_images_id_fkey";

alter table "public"."projects_gallery_images" add constraint "projects_gallery_images_index_un" UNIQUE using index "projects_gallery_images_index_un";

alter table "public"."projects_gallery_images" add constraint "projects_gallery_images_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects_gallery_images" validate constraint "projects_gallery_images_project_id_fkey";

alter table "public"."projects_gallery_images" add constraint "projects_gallery_images_un" UNIQUE using index "projects_gallery_images_un";

alter table "public"."projects_gallery_images" add constraint "projects_gallery_images_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."projects_gallery_images" validate constraint "projects_gallery_images_updated_by_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.add_project_galery_image()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
	begin

    insert into public.projects_gallery_images (id, updated_by_id, created_by_id)
	values (new.id, auth.uid(), auth.uid());

return new;
end;

$function$
;


