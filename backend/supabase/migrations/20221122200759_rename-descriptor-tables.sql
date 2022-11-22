alter table "public"."projects" drop constraint "projects_category_id_fkey";

alter table "public"."projects" drop constraint "projects_type_id_fkey";

drop view if exists "public"."editable_projects";

alter table "public"."projects" drop column "category_id";

alter table "public"."projects" drop column "combustible";

alter table "public"."projects" add constraint "projects_type_id_fkey" FOREIGN KEY (type_id) REFERENCES project_type(id) not valid;

alter table "public"."projects" validate constraint "projects_type_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_project_descriptors()
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
    return (
        select json_build_object(
            'types', (
                select json_agg(row_to_json(t))
                from public.project_type t
            ),
            'works', (
                select json_agg(row_to_json(ttw))
                from (
                    select w.*, array_agg(tw.type_id) as types_ids
                    from public.project_work w
                    left join public.project_type_work tw
                    on tw.work_id = w.id
                    group by w.id
                    order by w.title asc
                ) ttw
            ),
            'siteOwnerships', (
                select json_agg(row_to_json(so))
                from (
                	select *
                	from public.project_site_ownership
               		order by title asc
               	) so
            ),
            'siteUsagesCategories', (
                select json_agg(row_to_json(suc))
                from (
                	select *
                	from public.project_site_usage_category
                	order by title asc
                ) suc
            ),
            'siteUsages', (
                select json_agg(row_to_json(susupc))
                from (
                    select su.*, array_agg(supc.category_id) as category_ids
                    from public.project_site_usage su
                    left join public.project_site_usage_site_usage_category supc
                    on supc.usage_id = su.id
                    group by su.id
                    order by su.title asc
                ) susupc
            ),
            'implantationModes', (
                select json_agg(row_to_json(im))
                from (
                	select *
                	from public.project_implantation_mode
                	order by title asc
                ) im
            ),
            'materialOrigins', (
                select json_agg(row_to_json(mo))
                from (
                	select *
                	from public.project_material_origin
                	order by title asc
                ) mo
            ),
            'materialTypes', (
                select json_agg(row_to_json(mt))
                from (
                	select *
                	from public.project_material_type
                	order by title asc
                ) mt
            ),
            'materialUses', (
                select json_agg(row_to_json(mu))
                from (
                	select *
                	from public.project_material_use
                	order by title asc
                ) mu
            ),
            'eventTypes', (
                select json_agg(row_to_json(etetst))
                from (
                    select et.*, array_agg(etst.subevent_type_id) as subevent_type_ids
                    from public.project_event_type et
                    left join public.project_event_type_subevent_type etst
                    on etst.event_type_id = et.id
                    group by et.id
                    order by et.title asc
                ) etetst
            ),
            'exemplarityIndicatorsCategories', (
                select json_agg(row_to_json(eicei))
                from (
                    select eic.*, array_agg(ei.*) as exemplarity_indicator_ids
                    from public.project_exemplarity_indicator_category eic
                    full join (
                    	select *
                    	from public.project_exemplarity_indicator
                    	order by title asc
                    ) ei
                    on ei.indicator_category_id = eic.id
                    group by eic.id
                    order by eic.title asc
                ) eicei
            ),
            'exemplarityIndicators', (
                select json_agg(row_to_json(ei))
                from (
                	select *
                	from public.project_exemplarity_indicator
                	order by title asc
                ) ei
            )
        )
    );
end;
$function$
;


