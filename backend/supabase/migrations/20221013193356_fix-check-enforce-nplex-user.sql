set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.check_enforce_nplex_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin

    if (
    	(old.role = 'nplex'::public.user_role)
		and (
			(tg_op = 'UPDATE')
			or (
				(tg_op = 'DELETE')
				and (new.role != 'nplex'::public.user_role)
			)
		)
	)
	or (
		(tg_op = 'UPDATE')
		and (new.role = 'nplex'::public.user_role)
		and exists (
			select 1 from public.users_roles
			where (role = 'nplex'::public.user_role) and (user_id != new.user_id)
    	)
	)
	then
    	raise exception 'There must always be one and only one "nplex" user. User % cannot be deleted/updated and cannot have its role unset.', old.user_id;
	end if;

return new;
end;

$function$
;


