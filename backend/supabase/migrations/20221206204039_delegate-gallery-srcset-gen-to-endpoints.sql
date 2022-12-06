alter table "public"."projects_gallery_images" drop constraint "projects_gallery_images_pkey";

drop index if exists "public"."projects_gallery_images_pkey";

alter table "public"."projects_gallery_images" drop column "file_names";

alter table "public"."projects_gallery_images" add column "id" uuid not null;

CREATE UNIQUE INDEX projects_gallery_images_pkey ON public.projects_gallery_images USING btree (project_id, id);

alter table "public"."projects_gallery_images" add constraint "projects_gallery_images_pkey" PRIMARY KEY using index "projects_gallery_images_pkey";

alter table "public"."projects_gallery_images" add constraint "projects_gallery_images_id_fkey" FOREIGN KEY (id) REFERENCES storage.objects(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects_gallery_images" validate constraint "projects_gallery_images_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.cascade_delete_project_storage()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin

	delete from storage.objects as o
	where (storage.foldername(o.name))[1]::uuid = old.id;

	return old;

end;

$function$
;

CREATE OR REPLACE FUNCTION public.add_project_gallery_image()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
	begin
	if (new.bucket_id = 'projects') and ((storage.foldername(new.name))[2] = 'gallery')
	then
		insert into public.projects_gallery_images (id, project_id, name, updated_by_id, created_by_id)
        values (new.id, (storage.foldername(new.name))[1]::uuid, new.name, auth.uid(), auth.uid());
		/*insert into public.projects_gallery_images as g (name, project_id, updated_by_id, created_by_id, file_names)
        values ((storage.foldername(new.name))[3]::text, (storage.foldername(new.name))[1]::uuid, auth.uid(), auth.uid(), array[new.name])
        on conflict (name) do update set
        file_names = array_append(g.file_names, new.name);*/
end if;

return new;
end;

$function$
;

CREATE TRIGGER cascade_delete_storage BEFORE DELETE ON public.projects FOR EACH ROW EXECUTE FUNCTION handle_new_project();


