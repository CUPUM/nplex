set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_projects_descriptors()
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
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
                    select et.*, array_agg(etst.subevent_type_id) as subevent_types_ids
                    from public.project_event_type et
                    left join public.project_event_type_subevent_type etst
                    on etst.event_type_id = et.id
                    group by et.id
                ) etetst
            ),
            'exemplarityIndicatosCategories', (
                select json_agg(row_to_json(eicei))
                from (
                    select eic.*, array_agg(ei.*) as exemplarityIndicators
                    from public.project_exemplarity_indicator_category eic
                    full join public.project_exemplarity_indicator ei
                    on ei.indicator_category_id = eic.id
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
$function$
;


