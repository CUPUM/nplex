CREATE UNIQUE INDEX projects_works_un ON public.projects_works USING btree (project_id, work_id);

alter table "public"."projects_works" add constraint "projects_works_un" UNIQUE using index "projects_works_un";


