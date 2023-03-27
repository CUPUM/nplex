alter table "auth"."users" add column "deleted_at" timestamp with time zone;

alter table "auth"."users" alter column "phone" set data type text using "phone"::text;

alter table "auth"."users" alter column "phone_change" set data type text using "phone_change"::text;


create or replace view "public"."projects_publication_status_fulfill" as  SELECT ps.project,
    ps.updated_at,
    ps.updated_by,
    ps.status,
        CASE
            WHEN ((pl.circle IS NOT NULL) AND (p.title IS NOT NULL) AND (p.type IS NOT NULL)) THEN true
            ELSE false
        END AS fulfill
   FROM ((projects_publication_status ps
     LEFT JOIN projects_location pl ON ((pl.project = ps.project)))
     LEFT JOIN projects p ON ((p.id = ps.project)));



