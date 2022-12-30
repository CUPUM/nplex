drop trigger if exists "on_user_role_delete" on "public"."users_roles";

drop trigger if exists "on_user_role_update" on "public"."users_roles";

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
			(tg_op = 'update')
			or (
				(tg_op = 'delete')
				and (new.role != 'nplex'::public.user_role)
			)
		)
	)
	or (
		(tg_op = 'update')
		and (new.role = 'nplex'::public.user_role)
		and exists (
			select 1 from public.users_roles
			where (role = 'nplex'::public.user_role) and (user_id != new.user_id)
    	)
	)
	then
    	raise exception 'there must always be one and only one "nplex" user. user % cannot be deleted/updated and cannot have its role unset.', old.user_id;
    	return null;
    else
    	return new;
	end if;

end;

$function$
;

CREATE TRIGGER on_user_role_delete BEFORE DELETE ON public.users_roles FOR EACH ROW EXECUTE FUNCTION check_enforce_nplex_user();

CREATE TRIGGER on_user_role_update BEFORE UPDATE ON public.users_roles FOR EACH ROW EXECUTE FUNCTION check_enforce_nplex_user();


