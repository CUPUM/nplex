alter table "public"."projects_gallery_images" add column "color_dominant" cube;

alter table "public"."projects_gallery_images" add column "color_mean" cube;

alter table "public"."users" add constraint "user_name_check" CHECK ((char_length(first_name) >= 1)) not valid;

alter table "public"."users" validate constraint "user_name_check";

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
	end if;

return new;
end;

$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin

    if not exists (
        select 1 from public.users_roles as ur
        where ur.role = 'nplex'::public.user_role
    ) then
        -- Percolate auth signup to users and users_roles, while making sure the first user registered is 'Nplex'
        -- with role 'nplex' to handle author right relegation on further user profile deletions.
        insert into public.users (id, first_name, updated_by_id)
        values (new.id, 'Nplex'::text, new.id);
        insert into public.users_roles (user_id, role, updated_by_id)
        values (new.id, 'nplex'::public.user_role, new.id);
        -- raise notice 'The created user with id % was attributed the "nplex" lead role to fullfill required profile', new.id;
    else
        insert into public.users (id, first_name, last_name, updated_by_id)
        values (new.id, coalesce(new.raw_user_meta_data->>'first_name', null), coalesce(new.raw_user_meta_data->>'last_name', null), new.id);
        insert into public.users_roles (user_id, updated_by_id)
        values (new.id, new.id);
    end if;

    return new;

end;
$function$
;


