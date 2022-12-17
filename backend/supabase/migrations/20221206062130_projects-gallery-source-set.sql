alter table "public"."projects_images" drop constraint "projects_images_id_fkey";

alter table "public"."projects_images" drop constraint "projects_images_un";

alter table "public"."projects_images" drop constraint "projects_images_pkey";

drop index if exists "public"."projects_images_un";

drop index if exists "public"."projects_images_pkey";

alter table "public"."projects_images" drop column "file_name";

alter table "public"."projects_images" drop column "id";

alter table "public"."projects_images" add column "file_names" text[] not null;

alter table "public"."projects_images" add column "name" text not null;

CREATE UNIQUE INDEX projects_images_pkey ON public.projects_images USING btree (name);

alter table "public"."projects_images" add constraint "projects_images_pkey" PRIMARY KEY using index "projects_images_pkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.add_project_gallery_image()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
	begin
	if (new.bucket_id = 'projects') and ((storage.foldername(new.name))[2] = 'gallery')
	then
		insert into public.projects_images (name, project_id, updated_by_id, created_by_id, file_names)
        values ((storage.foldername(new.name))[3]::text, (storage.foldername(new.name))[1]::uuid, auth.uid(), auth.uid(), array[new.name])
        on conflict (name) do update set
        file_names = array_append(file_names, new.name);
end if;

return new;
end;

$function$
;


