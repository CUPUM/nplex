alter table "public"."projects" drop constraint "projects_created_by_id_fkey";

alter table "public"."projects" drop constraint "projects_updated_by_id_fkey";

alter table "public"."projects_publication_status" drop constraint "projects_publication_status_updated_by_id_fkey";

CREATE UNIQUE INDEX projects_users_pkey ON public.projects_users USING btree (project_id, user_id);

alter table "public"."projects_users" add constraint "projects_users_pkey" PRIMARY KEY using index "projects_users_pkey";

alter table "public"."projects_publication_status" add constraint "projects_publication_status_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects_publication_status" validate constraint "projects_publication_status_project_id_fkey";

alter table "public"."projects_users" add constraint "projects_users_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."projects_users" validate constraint "projects_users_created_by_id_fkey";

alter table "public"."projects_users" add constraint "projects_users_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects_users" validate constraint "projects_users_project_id_fkey";

alter table "public"."projects_users" add constraint "projects_users_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."projects_users" validate constraint "projects_users_updated_by_id_fkey";

alter table "public"."projects_users" add constraint "projects_users_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects_users" validate constraint "projects_users_user_id_fkey";

alter table "public"."projects" add constraint "projects_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."projects" validate constraint "projects_created_by_id_fkey";

alter table "public"."projects" add constraint "projects_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."projects" validate constraint "projects_updated_by_id_fkey";

alter table "public"."projects_publication_status" add constraint "projects_publication_status_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."projects_publication_status" validate constraint "projects_publication_status_updated_by_id_fkey";

create policy "Only authed users can create projects"
on "public"."projects"
as permissive
for insert
to public
with check ((auth.role() = 'authenticated'::text));


create policy "Only creators or collaborators can update projects"
on "public"."projects"
as permissive
for update
to public
using ((created_by_id = auth.uid()))
with check ((created_by_id = auth.uid()));



