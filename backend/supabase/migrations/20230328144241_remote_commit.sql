set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.project_descriptors()
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
    return (
        select json_build_object(
            'types', (
                select coalesce(json_agg(row_to_json(ft)), '[]'::json)
				from (
					select t.*, coalesce(array_agg(ip) filter(where ip is not null), '{}') as interventions
					from public.project_type t
					left join (
						select ti.type, i.*
						from public.project_intervention_by_type ti
						left join public.project_intervention i
						on ti.intervention = i.id
					) ip
					on ip.type = t.id
					group by t.id
				) ft
            ),
            'interventionCategories', (
            	select coalesce(json_agg(row_to_json(ic)), '[]'::json)
            	from (
            		select *
            		from public.project_intervention_category
            		order by title asc
            	) ic
            ),
           'interventions', (
                select coalesce(json_agg(row_to_json(pti)), '[]'::json)
                from (
                    select i.*, coalesce(array_agg(ti.type) filter (where ti is not null), '{}') as types_ids
                    from public.project_intervention i
                    left join public.project_intervention_by_type ti
                    on ti.intervention = i.id
                    group by i.id
                    order by i.title asc
                ) pti
            ),
            'siteOwnerships', (
                select coalesce(json_agg(row_to_json(so)), '[]'::json)
                from (
                	select *
                	from public.project_site_ownership
               		order by title asc
               	) so
            ),
            'siteUsagesCategories', (
                select coalesce(json_agg(row_to_json(suc)), '[]'::json)
                from (
                	select *
                	from public.project_site_usage_category
                	order by title asc
                ) suc
            ),
            'siteUsages', (
                select coalesce(json_agg(row_to_json(susupc)), '[]'::json)
                from (
                    select su.*, coalesce(array_agg(supc.category) filter (where supc is not null), '{}') as category_ids
                    from public.project_site_usage su
                    left join public.project_site_usage_by_category supc
                    on supc.usage = su.id
                    group by su.id
                    order by su.title asc
                ) susupc
            ),
            'implantationModes', (
                select coalesce(json_agg(row_to_json(im)), '[]'::json)
                from (
                	select *
                	from public.project_implantation_mode
                	order by title asc
                ) im
            ),
            'materialOrigins', (
                select coalesce(json_agg(row_to_json(mo)), '[]'::json)
                from (
                	select *
                	from public.project_material_origin
                	order by title asc
                ) mo
            ),
            'materialTypes', (
                select coalesce(json_agg(row_to_json(mt)), '[]'::json)
                from (
                	select *
                	from public.project_material_type
                	order by title asc
                ) mt
            ),
            'materialUses', (
                select coalesce(json_agg(row_to_json(mu)), '[]'::json)
                from (
                	select *
                	from public.project_material_use
                	order by title asc
                ) mu
            ),
            'eventTypes', (
                select coalesce(json_agg(row_to_json(eseby)), '[]'::json)
                from (
                    select e.*, coalesce(array_agg(seby.subevent) filter (where seby is not null), '{}') as subevent_ids  
                    from public.project_event e
                    left join public.project_subevent_by_event seby
                    on seby.event = e.id
                    group by e.id
                    order by e.title asc
                ) eseby
            ),
            'exemplarityCategories', (
                select coalesce(json_agg(row_to_json(ecei)), '[]'::json)
                from (
                    select ec.*, coalesce(array_agg(ei.*) filter (where ei is not null), '{}') as exemplarity_indicator_ids
                    from public.project_exemplarity_category ec
                    full join (
                    	select *
                    	from public.project_exemplarity_indicator
                    	order by title asc
                    ) ei
                    on ei.category = ec.id
                    group by ec.id
                    order by ec.title asc
                ) ecei
            ),
            'exemplarityIndicators', (
                select coalesce(json_agg(row_to_json(ei)), '[]'::json)
                from (
                	select *
                	from public.project_exemplarity_indicator
                	order by title asc
                ) ei
            ),
            'imageTypes', (
            	select coalesce(json_agg(row_to_json(it)), '[]'::json)
            	from (
            		select *
            		from public.project_image_type
            		order by title asc
            	) it
            )
        )
    );
end;
$function$
;


