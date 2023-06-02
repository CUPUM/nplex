set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.protect_project_essential()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  if exists(select 1 from projects as p where p.id = old.project ) then
    raise notice 'cannot delete publication status of existing project.';
  else
    return old;
  end if;
end
$function$
;

CREATE TRIGGER protect_project_location BEFORE DELETE ON public.projects_location FOR EACH ROW EXECUTE FUNCTION protect_project_essential();

CREATE TRIGGER protect_project_publication_status BEFORE DELETE ON public.projects_publication_status FOR EACH ROW EXECUTE FUNCTION protect_project_essential();


