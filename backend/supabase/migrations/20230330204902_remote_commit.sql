alter table "public"."projects_publication_status" drop constraint "projects_publication_status_project_fkey";

alter table "public"."projects_publication_status" drop constraint "projects_publication_status_updated_by_fkey";

drop view if exists "public"."projects_publication_status_fulfill";

alter table "public"."projects_publication_status" drop column "published";

alter table "public"."projects_publication_status" drop column "requested";

alter table "public"."projects_publication_status" add constraint "projects_publication_status_project_fkey" FOREIGN KEY (project) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."projects_publication_status" validate constraint "projects_publication_status_project_fkey";

alter table "public"."projects_publication_status" add constraint "projects_publication_status_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."projects_publication_status" validate constraint "projects_publication_status_updated_by_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.restrict_publishing()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
    if (user_has_role('editor'))
    and (new.published is not null)
    and (old.published is null)
    then
      new.published = null;
      new.requested= now();
   end if;
   return new;
end;
$function$
;

create or replace view "public"."projects_publication_status_fulfill" as  SELECT ps.project,
    ps.updated_at,
    ps.updated_by,
        CASE
            WHEN ((pl.circle IS NOT NULL) AND (p.title IS NOT NULL) AND (p.type IS NOT NULL)) THEN true
            ELSE false
        END AS fulfill
   FROM ((projects_publication_status ps
     LEFT JOIN projects_location pl ON ((pl.project = ps.project)))
     LEFT JOIN projects p ON ((p.id = ps.project)));


create policy "any user can manage their own project's publication status"
on "public"."projects_publication_status"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM projects p
  WHERE ((p.id = projects_publication_status.project) AND (p.created_by = auth.uid())))))
with check ((EXISTS ( SELECT 1
   FROM projects p
  WHERE ((p.id = projects_publication_status.project) AND (p.created_by = auth.uid())))));



