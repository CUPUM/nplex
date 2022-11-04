alter table "public"."projects" drop constraint "projects_created_by_id_fkey";

alter table "public"."projects" drop constraint "projects_updated_by_id_fkey";

alter table "public"."projects_users" drop constraint "projects_users_updated_by_id_fkey";

alter table "public"."users_roles" drop constraint "users_roles_updated_by_id_fkey";

alter table "public"."projects" alter column "updated_by_id" set not null;

alter table "public"."users" alter column "updated_by_id" set not null;

alter table "public"."users_roles" alter column "updated_by_id" set not null;

alter table "public"."projects" add constraint "projects_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES users(id) not valid;

alter table "public"."projects" validate constraint "projects_created_by_id_fkey";

alter table "public"."projects" add constraint "projects_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES users(id) not valid;

alter table "public"."projects" validate constraint "projects_updated_by_id_fkey";

alter table "public"."projects_users" add constraint "projects_users_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES users(id) not valid;

alter table "public"."projects_users" validate constraint "projects_users_updated_by_id_fkey";

alter table "public"."users_roles" add constraint "users_roles_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES users(id) not valid;

alter table "public"."users_roles" validate constraint "users_roles_updated_by_id_fkey";


