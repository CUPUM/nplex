drop trigger if exists "cascade_delete_storage" on "public"."projects";

drop policy "creators and collaborators can select regardless of pub status" on "public"."projects";

drop policy "only creators or collaborators can update projects" on "public"."projects";

drop policy "project creators or collaborators can manage respective project" on "public"."projects_events";

drop policy "any project manager can manage respective project indicators" on "public"."projects_exemplarity_indicators";

drop policy "project creators and collaborators can manage galleries" on "public"."projects_images";

drop policy "can only update location if can update project" on "public"."projects_location";

drop policy "project editors can select location regardless of publication s" on "public"."projects_location";

drop policy "editors can manage publication status for theirs or collaborate" on "public"."projects_publication_status";

drop policy "only creators or collaborators can edit secondary usages" on "public"."projects_usages";

drop policy "Project maintainers can do all" on "public"."projects_works";

drop policy "creators and collaborators can manage storage for projects they" on "storage"."objects";

drop function if exists "public"."cascade_delete_project_storage"();

drop function if exists "public"."delete_project_storage"();

drop function if exists "public"."get_project_descriptors"();

drop function if exists "public"."user_can_edit_project"(p_id uuid);

drop function if exists "public"."user_can_edit_project"(p_row projects);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.authorize_project_update(p_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
	begin
		-- Allow rbac-based authotization
		if public.authorize('project_update') then return true;
		-- Creators can manage as they please (except publish)
		elseif exists (
			select 1 from public.projects as p
			where p.id = p_id
			and p.created_by_id = auth.uid()
		) then return true;
		-- Check if collaborator
		else return exists (
			select 1 from public.projects_users as pu
			where pu.project_id = p_id
			and pu.user_id = auth.uid()
		);
		end if;
	end;
$function$
;

CREATE OR REPLACE FUNCTION public.authorize_project_update(p_row projects)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
	begin
		-- Allow rbac-based authotization
		if public.authorize('project_update') then return true;
		-- Creators can manage as they please (except publish)
		elseif p_row.created_by_id = auth.uid() then return true;
		-- Check if collaborator
		else return exists (
			select 1 from public.projects_users as pu
			where pu.project_id = p_row.id
			and pu.user_id = auth.uid()
		);
		end if;
	end;
$function$
;

create or replace view "public"."editable_projects" as  SELECT projects.id,
    projects.created_at,
    projects.updated_at,
    projects.created_by_id,
    projects.updated_by_id,
    projects.title,
    projects.description,
    projects.site_ownership_id,
    projects.site_area,
    projects.area,
    projects.adjacent_streets,
    projects.building_area,
    projects.implantation_mode_id,
    projects.building_construction_year,
    projects.type_id,
    projects.banner_id,
    projects.cost_range,
    projects.likes_sum
   FROM projects
  WHERE authorize_project_update(projects.id);


CREATE OR REPLACE FUNCTION public.project_descriptors()
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
    return (
        select json_build_object(
            'types', (
                select json_agg(row_to_json(t))
				from (
					select pt.*, array_agg(pw) as works
					from public.project_type pt
					left join (
						select tw.type_id, w.*
						from public.project_type_work tw
						left join public.project_work w
						on tw.work_id = w.id
					) pw 
					on pw.type_id = pt.id
					group by pt.id
				) t
            ),
            'workCategories', (
            	select (json_agg(row_to_json(wc)))
            	from (
            		select *
            		from public.project_work_category
            		order by title asc
            	) wc
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

create policy "creators and collaborators can select regardless of pub status"
on "public"."projects"
as permissive
for select
to public
using (authorize_project_update(projects.*));


create policy "only creators or collaborators can update projects"
on "public"."projects"
as permissive
for update
to public
using (authorize_project_update(projects.*))
with check (authorize_project_update(projects.*));


create policy "project creators or collaborators can manage respective project"
on "public"."projects_events"
as permissive
for all
to public
using (authorize_project_update(project_id))
with check (authorize_project_update(project_id));


create policy "any project manager can manage respective project indicators"
on "public"."projects_exemplarity_indicators"
as permissive
for all
to public
using (authorize_project_update(project_id));


create policy "project creators and collaborators can manage galleries"
on "public"."projects_images"
as permissive
for all
to authenticated
using (authorize_project_update(project_id))
with check (authorize_project_update(project_id));


create policy "can only update location if can update project"
on "public"."projects_location"
as permissive
for update
to public
using (authorize_project_update(project_id))
with check (authorize_project_update(project_id));


create policy "project editors can select location regardless of publication s"
on "public"."projects_location"
as permissive
for select
to public
using (authorize_project_update(project_id));


create policy "editors can manage publication status for theirs or collaborate"
on "public"."projects_publication_status"
as permissive
for update
to public
using ((user_has_role('editor'::app_role) AND authorize_project_update(project_id)))
with check ((user_has_role('editor'::app_role) AND authorize_project_update(project_id)));


create policy "only creators or collaborators can edit secondary usages"
on "public"."projects_usages"
as permissive
for all
to public
using (authorize_project_update(project_id))
with check (authorize_project_update(project_id));


create policy "Project maintainers can do all"
on "public"."projects_works"
as permissive
for all
to public
using (authorize_project_update(project_id))
with check (authorize_project_update(project_id));


create policy "creators and collaborators can manage storage for projects they"
on "storage"."objects"
as permissive
for all
to public
using (authorize_project_update(((storage.foldername(name))[1])::uuid))
with check (authorize_project_update(((storage.foldername(name))[1])::uuid));



