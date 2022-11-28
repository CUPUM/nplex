alter table "public"."projects_works" drop constraint "projects_works_project_work_id_fkey";

alter table "public"."projects_works" drop constraint "projects_works_created_by_id_fkey";

alter table "public"."projects_works" drop constraint "projects_works_project_id_fkey";

alter table "public"."projects_works" drop constraint "projects_works_updated_by_id_fkey";

alter table "public"."projects_works" drop constraint "projects_works_pkey";

drop index if exists "public"."projects_works_pkey";

alter table "public"."projects_works" drop column "id";

alter table "public"."projects_works" drop column "project_work_id";

alter table "public"."projects_works" add column "work_id" smallint not null;

CREATE UNIQUE INDEX projects_works_pkey ON public.projects_works USING btree (project_id, work_id);

alter table "public"."projects_works" add constraint "projects_works_pkey" PRIMARY KEY using index "projects_works_pkey";

alter table "public"."projects_works" add constraint "projects_works_work_id_fkey" FOREIGN KEY (work_id) REFERENCES project_work(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects_works" validate constraint "projects_works_work_id_fkey";

alter table "public"."projects_works" add constraint "projects_works_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."projects_works" validate constraint "projects_works_created_by_id_fkey";

alter table "public"."projects_works" add constraint "projects_works_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects_works" validate constraint "projects_works_project_id_fkey";

alter table "public"."projects_works" add constraint "projects_works_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."projects_works" validate constraint "projects_works_updated_by_id_fkey";


