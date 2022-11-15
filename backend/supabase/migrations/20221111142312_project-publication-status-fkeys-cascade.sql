alter table "public"."projects_publication_status" drop constraint "projects_publication_status_project_id_fkey";

alter table "public"."projects_publication_status" drop constraint "projects_publication_status_updated_by_id_fkey";

alter table "public"."projects_publication_status" add constraint "projects_publication_status_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects_publication_status" validate constraint "projects_publication_status_project_id_fkey";

alter table "public"."projects_publication_status" add constraint "projects_publication_status_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."projects_publication_status" validate constraint "projects_publication_status_updated_by_id_fkey";


