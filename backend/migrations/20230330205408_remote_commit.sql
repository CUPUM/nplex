drop view if exists "public"."projects_publication_status_fulfill";

alter table "public"."projects_publication_status" add column "published" timestamp with time zone;

alter table "public"."projects_publication_status" add column "requested" timestamp with time zone;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.project_is_public(p_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
	begin
		return exists (
			select 1 from projects_publication_status as pps
  			where pps.project = p_id
  			and pps.published is not null
  		);
	end;
$function$
;

create or replace view "public"."projects_publication_status_fulfill" as  SELECT ps.project,
    ps.updated_at,
    ps.updated_by,
    ps.published,
    ps.requested,
        CASE
            WHEN ((pl.circle IS NOT NULL) AND (p.title IS NOT NULL) AND (p.type IS NOT NULL)) THEN true
            ELSE false
        END AS fulfill
   FROM ((projects_publication_status ps
     LEFT JOIN projects_location pl ON ((pl.project = ps.project)))
     LEFT JOIN projects p ON ((p.id = ps.project)));



