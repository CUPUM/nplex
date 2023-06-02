set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.restrict_publishing()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
    if (not user_has_role('admin', 'editor'))
    and (new.published is not null)
    and (old.published is null)
    then
      new.published = null;
      new.requested= now();
   end if;
   return new;
end;
$function$
;


