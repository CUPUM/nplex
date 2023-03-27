alter table "public"."users_roles" drop constraint "users_roles_updated_by_id_fkey";

alter table "public"."users_roles" drop constraint "users_roles_user_id_fkey";

alter table "public"."users_notifications" drop constraint "users_notifications_user_role_request_fkey";

alter table "public"."users_roles" drop constraint "users_roles_un";

drop view if exists "public"."random_project_images";

drop view if exists "public"."users_roles_extended";

drop view if exists "public"."users_session";

alter table "public"."users_roles" drop constraint "users_roles_pkey";

drop index if exists "public"."users_roles_pkey";

drop index if exists "public"."users_roles_un";

alter table "public"."users_roles" drop column "updated_by_id";

alter table "public"."users_roles" drop column "user_id";

alter table "public"."users_roles" add column "updated_by" uuid not null default default_uid();

alter table "public"."users_roles" add column "user" uuid not null;

CREATE UNIQUE INDEX users_roles_pkey ON public.users_roles USING btree ("user", role);

CREATE UNIQUE INDEX users_roles_un ON public.users_roles USING btree ("user");

alter table "public"."users_roles" add constraint "users_roles_pkey" PRIMARY KEY using index "users_roles_pkey";

alter table "public"."users_roles" add constraint "users_roles_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."users_roles" validate constraint "users_roles_updated_by_fkey";

alter table "public"."users_roles" add constraint "users_roles_user_fkey" FOREIGN KEY ("user") REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."users_roles" validate constraint "users_roles_user_fkey";

alter table "public"."users_notifications" add constraint "users_notifications_user_role_request_fkey" FOREIGN KEY (user_role_request) REFERENCES users_roles("user") ON DELETE CASCADE not valid;

alter table "public"."users_notifications" validate constraint "users_notifications_user_role_request_fkey";

alter table "public"."users_roles" add constraint "users_roles_un" UNIQUE using index "users_roles_un";

create or replace view "public"."random_project_images" as  SELECT p.title AS project_title,
    pi.created_at,
    pi.updated_at,
    pi.created_by,
    pi.updated_by,
    pi.title,
    pi.description,
    pi.index AS "order",
    pi.project,
    pi.storage_name AS name,
    pi.id,
    pi.color_dominant_hsl,
    pi.color_dominant_lab,
    pi.color_mean_hsl,
    pi.color_mean_lab
   FROM (projects p
     RIGHT JOIN projects_images pi ON ((pi.project = p.id)))
  WHERE project_is_public(p.id)
  ORDER BY (random());


create or replace view "public"."users_roles_extended" as  SELECT ur."user",
    ur.updated_at,
    ur.role,
    ur.updated_by,
    ur.request,
    ur.requested_at,
    rd.description,
    rd.title
   FROM (users_roles ur
     JOIN role_details rd ON ((rd.role = ur.role)));


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



