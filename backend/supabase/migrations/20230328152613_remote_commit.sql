set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.protect_users_roles()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin

     if (
    	(old.role = 'nplex'::public.app_role)
		and (
			(TG_OP = 'UPDATE')
			or ((TG_OP = 'DELETE') and (new.role != 'nplex'::public.app_role))
		)
	)
	or (
		(TG_OP = 'UPDATE')
		and (new.role = 'nplex'::public.app_role)
		and exists (
			select 1 from public.users_roles ur
			where (ur.role = 'nplex'::public.app_role) and (ur.user != new.user)
    	)
	) then
    	raise exception 'there must always be one and only one "nplex" user. user % cannot be deleted/updated and cannot have its role unset.', old.user_id;
    	return null;
    elseif (TG_OP = 'DELETE') then
   		return old;
   	else
   		return new;
	end if;

end;

$function$
;


