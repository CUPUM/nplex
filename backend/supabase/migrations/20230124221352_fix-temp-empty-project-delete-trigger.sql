drop trigger if exists "cascade_delete_storage" on "public"."projects";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.delete_project_storage()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
	BEGIN
		/* To do: cascade delete a project's storage objects. Might require http extension?. */
		return old;
	END;
$function$
;

CREATE TRIGGER cascade_delete_storage BEFORE DELETE ON public.projects FOR EACH ROW EXECUTE FUNCTION delete_project_storage();


