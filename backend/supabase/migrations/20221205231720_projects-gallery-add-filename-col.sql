alter table "public"."projects_gallery_images" add column "file_name" text not null;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.add_project_gallery_image()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
	begin
	if (new.bucket_id = 'projects') and ((storage.foldername(new.name))[2] = 'gallery')
	then
		insert into public.projects_gallery_images (id, project_id, updated_by_id, created_by_id, file_name)
        values (new.id, (storage.foldername(new.name))[1]::uuid, auth.uid(), auth.uid(), new.name);
end if;

return new;
end;

$function$
;


