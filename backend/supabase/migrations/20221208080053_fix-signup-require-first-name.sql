alter table "public"."users" drop constraint "user_name_check";

alter table "public"."users" alter column "first_name" set data type character varying(48) using "first_name"::character varying(48);

alter table "public"."users" alter column "public_email" set data type character varying(128) using "public_email"::character varying(128);

alter table "public"."users" add constraint "users_first_name_check" CHECK ((char_length((first_name)::text) >= 1)) not valid;

alter table "public"."users" validate constraint "users_first_name_check";

set check_function_bodies = off;

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
    elseif char_length(coalesce(new.raw_user_meta_data->>'first_name', '')) = 0 then
    	raise exception 'First name is required';
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


