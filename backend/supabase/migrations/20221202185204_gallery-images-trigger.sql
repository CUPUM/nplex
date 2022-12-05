set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.add_project_galery_image()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
	begin

    insert into public.projects_gallery_images (id, project_id, updated_by_id, created_by_id)
	values (new.id, (storage.foldername(new.name))[1]::uuid, auth.uid(), auth.uid());

return new;
end;

$function$
;


