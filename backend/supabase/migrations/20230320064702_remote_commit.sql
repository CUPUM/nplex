alter table "auth"."users" drop column "deleted_at";

alter table "auth"."users" alter column "phone" set data type character varying(15) using "phone"::character varying(15);

alter table "auth"."users" alter column "phone_change" set data type character varying(15) using "phone_change"::character varying(15);


alter table "public"."users_roles" drop constraint "users_roles_updated_by_id_fkey";

alter table "public"."users_roles" drop constraint "users_roles_user_id_fkey";

alter table "public"."notifications" alter column "id" set default uuid_generate_v4();

alter table "public"."notifications" alter column "title" set not null;

alter table "public"."users_roles" add constraint "users_roles_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."users_roles" validate constraint "users_roles_updated_by_id_fkey";

alter table "public"."users_roles" add constraint "users_roles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."users_roles" validate constraint "users_roles_user_id_fkey";

set check_function_bodies = off;

create or replace view "public"."users_extended" as  SELECT u.id,
    u.updated_at,
    u.avatar_url,
    u.about,
    u.public_email,
    u.updated_by_id,
    u.first_name,
    u.last_name,
    u.created_at,
    rd.role,
    rd.description AS role_description,
    rd.title AS role_title,
    r.updated_at AS role_updated_at,
    r.updated_by_id AS role_updated_by_id,
    r.request AS role_request,
    r.requested_at AS role_requested_at
   FROM ((users u
     JOIN users_roles r ON ((r.user_id = u.id)))
     JOIN role_details rd ON ((rd.role = r.role)));


CREATE OR REPLACE FUNCTION public.project_descriptors()
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
    return (
        select json_build_object(
            'types', (
                select coalesce(json_agg(row_to_json(t)), '[]'::json)
				from (
					select pt.*, coalesce(array_agg(pw) filter(where pw is not null), '{}') as works
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
            	select coalesce(json_agg(row_to_json(wc)), '[]'::json)
            	from (
            		select *
            		from public.project_work_category
            		order by title asc
            	) wc
            ),
            'works', (
                select coalesce(json_agg(row_to_json(ttw)), '[]'::json)
                from (
                    select w.*, coalesce(array_agg(tw.type_id) filter (where tw is not null), '{}') as types_ids
                    from public.project_work w
                    left join public.project_type_work tw
                    on tw.work_id = w.id
                    group by w.id
                    order by w.title asc
                ) ttw
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
                    select su.*, coalesce(array_agg(supc.category_id) filter (where supc is not null), '{}') as category_ids
                    from public.project_site_usage su
                    left join public.project_site_usage_site_usage_category supc
                    on supc.usage_id = su.id
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
                select coalesce(json_agg(row_to_json(etetst)), '[]'::json)
                from (
                	-- select et.*, array_agg(etst.subevent_type_id) as subevent_type_ids
                    select et.*, coalesce(array_agg(etst.subevent_type_id) filter (where etst is not null), '{}') as subevent_type_ids  
                    from public.project_event_type et
                    left join public.project_event_type_subevent_type etst
                    on etst.event_type_id = et.id
                    group by et.id
                    order by et.title asc
                ) etetst
            ),
            'exemplarityIndicatorsCategories', (
                select coalesce(json_agg(row_to_json(eicei)), '[]'::json)
                from (
                    select eic.*, coalesce(array_agg(ei.*) filter (where ei is not null), '{}') as exemplarity_indicator_ids
                    from public.project_exemplarity_indicator_category eic
                    full join (
                    	select *
                    	from public.project_exemplarity_indicator
                    	order by title asc
                    ) ei
                    on ei.category_id = eic.id
                    group by eic.id
                    order by eic.title asc
                ) eicei
            ),
            'exemplarityIndicators', (
                select coalesce(json_agg(row_to_json(ei)), '[]'::json)
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


set check_function_bodies = off;

CREATE OR REPLACE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$function$
;


