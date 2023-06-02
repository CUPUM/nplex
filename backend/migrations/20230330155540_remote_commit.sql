alter table "public"."projects_materials_uses" drop constraint "projects_materials_uses_updated_by_fkey";

drop view if exists "public"."users_session";

alter table "public"."users" alter column "updated_by" set default default_uid();

alter table "public"."users" alter column "updated_by" drop not null;

alter table "public"."users" add constraint "users_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."users" validate constraint "users_updated_by_fkey";

create or replace view "public"."users_session" as  SELECT u.id,
    u.avatar_url,
    u.public_email,
    u.first_name,
    u.last_name,
    rd.role,
    rd.description AS role_description,
    rd.title AS role_title
   FROM ((users u
     JOIN users_roles r ON ((r."user" = u.id)))
     JOIN role_details rd ON ((rd.role = r.role)));



