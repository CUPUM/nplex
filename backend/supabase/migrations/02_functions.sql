-- 
-- Setup functions used across schema tables, policies, and triggers.
-- 

-- Dont check bodies since tables are not defined yet.

set check_function_bodies = off;

-- Make sure there is an 'nplex' user at all times.

create or replace function public.check_enforce_nplex_user()
    returns trigger
    language plpgsql
    security definer
as $function$
begin

    if (
        (old.role = 'nplex'::public.user_role)
        and (
            not exists (new)
            or (new.role != 'nplex'::public.user_role)
        )
    ) then
        raise exception 'There must always be an "nplex" user. User % cannot be deleted or cannot have this role unset.', new.user_id;
    elseif (
        (new.role = 'nplex'::public.user_role)
        and exists (
            select 1 from public.users_roles
            where role = 'nplex'::public.user_role
            and user_id != new.user_id
        )
    ) then
        raise exception 'There is already another "nplex" user. There must be one and only one user with the lead role "nplex" for adequate uid delegation on other users delete effects. This role is already taken by %.', new.user_id;
    end if;

    return new;

end;
$function$;

-- Helper to get the rights relegation target's id, i.e. the id of the default lead user 'nplex'.

create or replace function public.get_relegate_uid()
    returns uuid
    language plpgsql
    security definer
as $function$
begin

    return (
        select (user_id) from public.users_roles
        where role = 'nplex'::public.user_role
        limit 1
    );

end;
$function$;

-- For default uid assignment and to allow creation rights relegation to 'nplex' user ON CASCADE SET DEFAULT when users are deleted.
-- Note that cases where ON CASCADE DELETE is used with user ids should instead use the provided auth.uid() helper for clarity in distinguishing
-- rows that are truly life-framed by user's profile vs those that should be relegated to the default 'nplex' user.

create or replace function public.default_uid()
    returns uuid
    language plpgsql
    security definer
as $function$
begin

    return (
        select coalesce(
            auth.uid(),
            public.get_relegate_uid(),
            null
        )
    );

end;
$function$;

-- Percolate new projects to the related tables holding a strict 1:1 relation.

create or replace function public.handle_new_project()
    returns trigger
    language plpgsql
    security definer
as $function$
begin

    insert into public.projects_publication_status (project_id)
    values (new.id);

    return new;

end;
$function$;

-- Percolate new auth.users, making sure the first ever user is assigned the 'nplex' role.

create or replace function public.handle_new_user()
    returns trigger
    language plpgsql
    security definer
as $function$
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
        insert into public.users (id, updated_by_id)
        values (new.id, new.id);
        insert into public.users_roles (user_id, updated_by_id)
        values (new.id, new.id);
    end if;

    return new;

end;
$function$;


-- Customized modification tracking function to be used in AFTER UPDATE triggers on tables with the target columns.

create or replace function public.track_update()
    returns trigger
    language plpgsql
    security definer
as $function$
begin

    new.updated_at = now();

    if (to_jsonb(new) ? 'updated_by_id') then
        new.updated_by_id = public.default_uid();
    end if;

    return new;

end;
$function$;

-- Check if the current auth.uid() user has one of allowed roles.

create or replace function public.user_has_role(variadic roles public.user_role[])
    returns boolean
    language plpgsql
    security definer
as $function$
begin

    if auth.uid() = null then return false;

    else return exists (
        select 1
        from public.users_roles
        where auth.uid() = id
            and role in (roles)
    );

    end if;

end;
$function$;

-- Manage projects likes and unlikes into summation

create or replace function public.handle_project_like()
    returns trigger
    language plpgsql
    security DEFINER
as $function$
begin

    update projects_likes_sums
    set sum = sum + 1, updated_at = now()
    where project_id = new.project_id;

    return new;

end;
$function$;

create or replace function public.handle_project_unlike()
    returns trigger
    language plpgsql
    security DEFINER
as $function$
begin

    update projects_likes_sums 
    set sum = sum - 1, updated_at = now()
    where project_id = old.project_id;

    return old;

end;
$function$;

-- Helper for clients to retrieve all descirptors as a single json in the lapse of a single transaction.

create or replace function public.get_projects_descriptors()
    returns json
    language plpgsql
    security definer
as $function$
begin

    return (
        select json_build_object(
            'categories', (
                select json_agg(row_to_json(c))
                from public.project_category c
            ),
            'types', (
                select json_agg(row_to_json(ttpc))
                from (
                    select t.*, array_agg(ptpc.category_id) as categories_ids
                    from public.project_type t
                    left join public.project_type_category ptpc
                    on ptpc.type_id = t.id
                    group by t.id
                ) ttpc
            ),
            'siteOwnerships', (
                select json_agg(row_to_json(so))
                from public.project_site_ownership so
            ),
            'siteUsagesCategories', (
                select json_agg(row_to_json(suc))
                from public.project_site_usage_category suc
            ),
            'siteUsages', (
                select json_agg(row_to_json(susupc))
                from (
                    select su.*, array_agg(supc.category_id) as categories_ids
                    from public.project_site_usage su
                    left join public.project_site_usage_site_usage_category supc
                    on supc.usage_id = su.id
                    group by su.id
                ) susupc
            ),
            'implantationModes', (
                select json_agg(row_to_json(im))
                from public.project_implantation_mode im
            ),
            'materialOrigins', (
                select json_agg(row_to_json(mo))
                from public.project_material_origin mo
            ),
            'materialTypes', (
                select json_agg(row_to_json(mt))
                from public.project_material_type mt
            ),
            'materialUses', (
                select json_agg(row_to_json(mu))
                from public.project_material_use mu
            ),
            'eventTypes', (
                select json_agg(row_to_json(etetst))
                from (
                    select et.*, array_agg(etst.subtype_id) as subevent_types_ids
                    from public.project_event_type et
                    left join public.project_event_type_subevent_type etst
                    on etst.type_id = et.id
                    group by et.id
                ) etetst
            ),
            'exemplarityIndicatosCategories', (
                select json_agg(row_to_json(eicei))
                from (
                    select eic.*, array_agg(ei.*) as exemplarityIndicators
                    from public.project_exemplarity_indicator_category eic
                    full join public.project_exemplarity_indicator ei
                    on ei.category_id = eic.id
                    group by eic.id
                ) eicei
            ),
            'exemplarityIndicators', (
                select json_agg(row_to_json(ei))
                from public.project_exemplarity_indicator ei
            )
        )
    );
end;
$function$;