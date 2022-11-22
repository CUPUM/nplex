drop function if exists "public"."get_projects_descriptors"();

CREATE UNIQUE INDEX project_category_un ON public.project_category USING btree (title);

CREATE UNIQUE INDEX project_event_type_subevent_type_un ON public.project_event_type_subevent_type USING btree (event_type_id, subevent_type_id);

CREATE UNIQUE INDEX project_event_type_un ON public.project_event_type USING btree (title);

CREATE UNIQUE INDEX project_exemplarity_indicator_category_un ON public.project_exemplarity_indicator_category USING btree (title);

CREATE UNIQUE INDEX project_exemplarity_indicator_un ON public.project_exemplarity_indicator USING btree (title);

CREATE UNIQUE INDEX project_implantation_mode_un ON public.project_implantation_mode USING btree (title);

CREATE UNIQUE INDEX project_material_origin_un ON public.project_material_origin USING btree (title);

CREATE UNIQUE INDEX project_material_type_un ON public.project_material_type USING btree (title);

CREATE UNIQUE INDEX project_material_use_un ON public.project_material_use USING btree (title);

CREATE UNIQUE INDEX project_site_ownership_un ON public.project_site_ownership USING btree (title);

CREATE UNIQUE INDEX project_site_usage_category_un ON public.project_site_usage_category USING btree (title);

CREATE UNIQUE INDEX project_site_usage_site_usage_category_un ON public.project_site_usage_site_usage_category USING btree (usage_id, category_id);

CREATE UNIQUE INDEX project_site_usage_un ON public.project_site_usage USING btree (title);

CREATE UNIQUE INDEX project_type_category_un ON public.project_type_category USING btree (type_id, category_id);

CREATE UNIQUE INDEX project_type_un ON public.project_type USING btree (title);

alter table "public"."project_category" add constraint "project_category_un" UNIQUE using index "project_category_un";

alter table "public"."project_event_type" add constraint "project_event_type_un" UNIQUE using index "project_event_type_un";

alter table "public"."project_event_type_subevent_type" add constraint "project_event_type_subevent_type_un" UNIQUE using index "project_event_type_subevent_type_un";

alter table "public"."project_exemplarity_indicator" add constraint "project_exemplarity_indicator_un" UNIQUE using index "project_exemplarity_indicator_un";

alter table "public"."project_exemplarity_indicator_category" add constraint "project_exemplarity_indicator_category_un" UNIQUE using index "project_exemplarity_indicator_category_un";

alter table "public"."project_implantation_mode" add constraint "project_implantation_mode_un" UNIQUE using index "project_implantation_mode_un";

alter table "public"."project_material_origin" add constraint "project_material_origin_un" UNIQUE using index "project_material_origin_un";

alter table "public"."project_material_type" add constraint "project_material_type_un" UNIQUE using index "project_material_type_un";

alter table "public"."project_material_use" add constraint "project_material_use_un" UNIQUE using index "project_material_use_un";

alter table "public"."project_site_ownership" add constraint "project_site_ownership_un" UNIQUE using index "project_site_ownership_un";

alter table "public"."project_site_usage" add constraint "project_site_usage_un" UNIQUE using index "project_site_usage_un";

alter table "public"."project_site_usage_category" add constraint "project_site_usage_category_un" UNIQUE using index "project_site_usage_category_un";

alter table "public"."project_site_usage_site_usage_category" add constraint "project_site_usage_site_usage_category_un" UNIQUE using index "project_site_usage_site_usage_category_un";

alter table "public"."project_type" add constraint "project_type_un" UNIQUE using index "project_type_un";

alter table "public"."project_type_category" add constraint "project_type_category_un" UNIQUE using index "project_type_category_un";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_project_descriptors()
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
                    select t.*, array_agg(ptpc.category_id)
                    from public.project_type t
                    left join public.project_type_category ptpc
                    on ptpc.type_id = t.id
                    group by t.id
                    order by t.title asc
                ) ttpc
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
                    select su.*, array_agg(supc.category_id)
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
                    select et.*, array_agg(etst.subevent_type_id)
                    from public.project_event_type et
                    left join public.project_event_type_subevent_type etst
                    on etst.event_type_id = et.id
                    group by et.id
                    order by et.title asc
                ) etetst
            ),
            'exemplarityIndicatosCategories', (
                select json_agg(row_to_json(eicei))
                from (
                    select eic.*, array_agg(ei.*)
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


