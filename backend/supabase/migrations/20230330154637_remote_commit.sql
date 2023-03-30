set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin

    if not exists (
        select 1 from public.users_roles as ur
        where ur.role = 'nplex'::public.app_role
    ) then
        -- percolate auth signup to users and users_roles, while making sure the first user registered is 'nplex'
        -- with role 'nplex' to handle author right relegation on further user profile deletions.
        insert into public.users (id, first_name, updated_by)
        values (new.id, 'nplex'::text, new.id);
        insert into public.users_roles ("user", role, updated_by)
        values (new.id, 'nplex'::public.app_role, new.id);
        -- raise notice 'the created user with id % was attributed the "nplex" lead role to fullfill required profile', new.id;
    elseif char_length(coalesce(new.raw_user_meta_data->>'first_name', '')) = 0 then
    	raise exception 'A first name is required to signup.';
    else
        insert into public.users (id, first_name, last_name, updated_by)
        values (new.id, coalesce(new.raw_user_meta_data->>'first_name', null), coalesce(new.raw_user_meta_data->>'last_name', null), new.id);
        insert into public.users_roles ("user", updated_by)
        values (new.id, new.id);
    end if;

    return new;

end;
$function$
;

create policy "Anyone can select projects materials"
on "public"."projects_materials"
as permissive
for select
to public
using (true);



