drop table "public"."users_profiles";

create table "public"."notifications" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "created_by_id" uuid not null default default_uid(),
    "updated_by_id" uuid default default_uid(),
    "updated_at" timestamp with time zone not null default now(),
    "title" text,
    "body" text not null,
    "expiry" timestamp with time zone
);


alter table "public"."notifications" enable row level security;

create table "public"."users" (
    "id" uuid not null,
    "updated_at" timestamp with time zone not null default now(),
    "avatar_url" text,
    "about" text,
    "public_email" text,
    "updated_by_id" uuid,
    "first_name" text,
    "last_name" text,
    "middle_name" text
);


alter table "public"."users" enable row level security;

create table "public"."users_notifications" (
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null,
    "notification_id" uuid not null
);


alter table "public"."users_notifications" enable row level security;

alter table "public"."project_category" add column "created_at" timestamp with time zone not null default now();

alter table "public"."project_category" add column "created_by_id" uuid not null default default_uid();

alter table "public"."project_category" add column "updated_at" timestamp with time zone not null default now();

alter table "public"."project_category" add column "updated_by_id" uuid default default_uid();

alter table "public"."project_category" enable row level security;

alter table "public"."project_event_type" alter column "updated_by_id" drop not null;

alter table "public"."project_event_type" enable row level security;

alter table "public"."project_event_type_subevent_type" alter column "updated_by_id" drop not null;

alter table "public"."project_event_type_subevent_type" enable row level security;

alter table "public"."project_exemplarity_indicator" drop column "category_id";

alter table "public"."project_exemplarity_indicator" add column "indicator_category_id" smallint;

alter table "public"."project_exemplarity_indicator" alter column "updated_by_id" drop not null;

alter table "public"."project_exemplarity_indicator" enable row level security;

alter table "public"."project_exemplarity_indicator_category" alter column "updated_by_id" drop not null;

alter table "public"."project_exemplarity_indicator_category" enable row level security;

alter table "public"."project_implantation_mode" add column "created_at" timestamp with time zone not null default now();

alter table "public"."project_implantation_mode" add column "created_by_id" uuid not null default default_uid();

alter table "public"."project_implantation_mode" add column "updated_at" timestamp with time zone not null default now();

alter table "public"."project_implantation_mode" add column "updated_by_id" uuid default default_uid();

alter table "public"."project_implantation_mode" enable row level security;

alter table "public"."project_material_origin" add column "created_at" timestamp with time zone not null default now();

alter table "public"."project_material_origin" add column "created_by_id" uuid not null default default_uid();

alter table "public"."project_material_origin" add column "updated_at" timestamp with time zone not null default now();

alter table "public"."project_material_origin" add column "updated_by_id" uuid default default_uid();

alter table "public"."project_material_origin" enable row level security;

alter table "public"."project_material_type" alter column "updated_by_id" drop not null;

alter table "public"."project_material_type" enable row level security;

alter table "public"."project_material_use" alter column "updated_by_id" drop not null;

alter table "public"."project_material_use" enable row level security;

alter table "public"."project_site_ownership" add column "created_at" timestamp with time zone not null default now();

alter table "public"."project_site_ownership" add column "created_by_id" uuid not null default default_uid();

alter table "public"."project_site_ownership" add column "updated_at" timestamp with time zone not null default now();

alter table "public"."project_site_ownership" add column "updated_by_id" uuid default default_uid();

alter table "public"."project_site_ownership" enable row level security;

alter table "public"."project_site_usage" alter column "updated_by_id" drop not null;

alter table "public"."project_site_usage" enable row level security;

alter table "public"."project_site_usage_category" add column "created_at" timestamp with time zone not null default now();

alter table "public"."project_site_usage_category" add column "created_by_id" uuid not null default default_uid();

alter table "public"."project_site_usage_category" add column "updated_at" timestamp with time zone not null default now();

alter table "public"."project_site_usage_category" add column "updated_by_id" uuid default default_uid();

alter table "public"."project_site_usage_category" enable row level security;

alter table "public"."project_site_usage_site_usage_category" drop column "id";

alter table "public"."project_site_usage_site_usage_category" alter column "updated_by_id" drop not null;

alter table "public"."project_site_usage_site_usage_category" enable row level security;

alter table "public"."project_type" alter column "updated_by_id" drop not null;

alter table "public"."project_type" enable row level security;

alter table "public"."project_type_category" alter column "updated_by_id" drop not null;

alter table "public"."project_type_category" enable row level security;

alter table "public"."projects" alter column "updated_by_id" drop not null;

alter table "public"."projects" enable row level security;

alter table "public"."projects_publication_status" drop column "created_at";

alter table "public"."projects_publication_status" drop column "created_by_id";

alter table "public"."projects_publication_status" alter column "updated_by_id" drop not null;

alter table "public"."projects_publication_status" enable row level security;

alter table "public"."users_projects_collections" alter column "created_by_id" set default default_uid();

alter table "public"."users_projects_collections" alter column "updated_by_id" set default default_uid();

alter table "public"."users_projects_collections" alter column "updated_by_id" drop not null;

alter table "public"."users_roles" enable row level security;

CREATE UNIQUE INDEX notifications_pkey ON public.notifications USING btree (id);

CREATE UNIQUE INDEX project_category_pkey ON public.project_category USING btree (id);

CREATE UNIQUE INDEX project_event_type_pkey ON public.project_event_type USING btree (id);

CREATE UNIQUE INDEX project_event_type_subevent_type_pkey ON public.project_event_type_subevent_type USING btree (event_type_id, subevent_type_id);

CREATE UNIQUE INDEX project_exemplarity_indicator_category_pkey ON public.project_exemplarity_indicator_category USING btree (id);

CREATE UNIQUE INDEX project_exemplarity_indicator_pkey ON public.project_exemplarity_indicator USING btree (id);

CREATE UNIQUE INDEX project_implantation_mode_pkey ON public.project_implantation_mode USING btree (id);

CREATE UNIQUE INDEX project_material_origin_pkey ON public.project_material_origin USING btree (id);

CREATE UNIQUE INDEX project_material_type_pkey ON public.project_material_type USING btree (id);

CREATE UNIQUE INDEX project_material_use_pkey ON public.project_material_use USING btree (id);

CREATE UNIQUE INDEX project_site_ownership_pkey ON public.project_site_ownership USING btree (id);

CREATE UNIQUE INDEX project_site_usage_category_pkey ON public.project_site_usage_category USING btree (id);

CREATE UNIQUE INDEX project_site_usage_pkey ON public.project_site_usage USING btree (id);

CREATE UNIQUE INDEX project_site_usage_site_usage_category_pkey ON public.project_site_usage_site_usage_category USING btree (usage_id, category_id);

CREATE UNIQUE INDEX project_type_category_pkey ON public.project_type_category USING btree (category_id, type_id);

CREATE UNIQUE INDEX project_type_pkey ON public.project_type USING btree (id);

CREATE UNIQUE INDEX projects_pkey ON public.projects USING btree (id);

CREATE UNIQUE INDEX projects_publication_status_pkey ON public.projects_publication_status USING btree (project_id);

CREATE UNIQUE INDEX users_notifications_pkey ON public.users_notifications USING btree (user_id, notification_id);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

CREATE UNIQUE INDEX users_projects_collections_pkey ON public.users_projects_collections USING btree (id);

CREATE UNIQUE INDEX users_roles_pkey ON public.users_roles USING btree (user_id);

alter table "public"."notifications" add constraint "notifications_pkey" PRIMARY KEY using index "notifications_pkey";

alter table "public"."project_category" add constraint "project_category_pkey" PRIMARY KEY using index "project_category_pkey";

alter table "public"."project_event_type" add constraint "project_event_type_pkey" PRIMARY KEY using index "project_event_type_pkey";

alter table "public"."project_event_type_subevent_type" add constraint "project_event_type_subevent_type_pkey" PRIMARY KEY using index "project_event_type_subevent_type_pkey";

alter table "public"."project_exemplarity_indicator" add constraint "project_exemplarity_indicator_pkey" PRIMARY KEY using index "project_exemplarity_indicator_pkey";

alter table "public"."project_exemplarity_indicator_category" add constraint "project_exemplarity_indicator_category_pkey" PRIMARY KEY using index "project_exemplarity_indicator_category_pkey";

alter table "public"."project_implantation_mode" add constraint "project_implantation_mode_pkey" PRIMARY KEY using index "project_implantation_mode_pkey";

alter table "public"."project_material_origin" add constraint "project_material_origin_pkey" PRIMARY KEY using index "project_material_origin_pkey";

alter table "public"."project_material_type" add constraint "project_material_type_pkey" PRIMARY KEY using index "project_material_type_pkey";

alter table "public"."project_material_use" add constraint "project_material_use_pkey" PRIMARY KEY using index "project_material_use_pkey";

alter table "public"."project_site_ownership" add constraint "project_site_ownership_pkey" PRIMARY KEY using index "project_site_ownership_pkey";

alter table "public"."project_site_usage" add constraint "project_site_usage_pkey" PRIMARY KEY using index "project_site_usage_pkey";

alter table "public"."project_site_usage_category" add constraint "project_site_usage_category_pkey" PRIMARY KEY using index "project_site_usage_category_pkey";

alter table "public"."project_site_usage_site_usage_category" add constraint "project_site_usage_site_usage_category_pkey" PRIMARY KEY using index "project_site_usage_site_usage_category_pkey";

alter table "public"."project_type" add constraint "project_type_pkey" PRIMARY KEY using index "project_type_pkey";

alter table "public"."project_type_category" add constraint "project_type_category_pkey" PRIMARY KEY using index "project_type_category_pkey";

alter table "public"."projects" add constraint "projects_pkey" PRIMARY KEY using index "projects_pkey";

alter table "public"."projects_publication_status" add constraint "projects_publication_status_pkey" PRIMARY KEY using index "projects_publication_status_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."users_notifications" add constraint "users_notifications_pkey" PRIMARY KEY using index "users_notifications_pkey";

alter table "public"."users_projects_collections" add constraint "users_projects_collections_pkey" PRIMARY KEY using index "users_projects_collections_pkey";

alter table "public"."users_roles" add constraint "users_roles_pkey" PRIMARY KEY using index "users_roles_pkey";

alter table "public"."notifications" add constraint "notifications_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."notifications" validate constraint "notifications_created_by_id_fkey";

alter table "public"."notifications" add constraint "notifications_id_fkey" FOREIGN KEY (id) REFERENCES users(id) not valid;

alter table "public"."notifications" validate constraint "notifications_id_fkey";

alter table "public"."notifications" add constraint "notifications_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."notifications" validate constraint "notifications_updated_by_id_fkey";

alter table "public"."project_category" add constraint "project_category_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_category" validate constraint "project_category_created_by_id_fkey";

alter table "public"."project_category" add constraint "project_category_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_category" validate constraint "project_category_updated_by_id_fkey";

alter table "public"."project_event_type" add constraint "project_event_type_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_event_type" validate constraint "project_event_type_created_by_id_fkey";

alter table "public"."project_event_type" add constraint "project_event_type_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_event_type" validate constraint "project_event_type_updated_by_id_fkey";

alter table "public"."project_event_type_subevent_type" add constraint "project_event_type_subevent_type_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_event_type_subevent_type" validate constraint "project_event_type_subevent_type_created_by_id_fkey";

alter table "public"."project_event_type_subevent_type" add constraint "project_event_type_subevent_type_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_event_type_subevent_type" validate constraint "project_event_type_subevent_type_updated_by_id_fkey";

alter table "public"."project_exemplarity_indicator" add constraint "project_exemplarity_indicator_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_exemplarity_indicator" validate constraint "project_exemplarity_indicator_created_by_id_fkey";

alter table "public"."project_exemplarity_indicator" add constraint "project_exemplarity_indicator_indicator_category_id_fkey" FOREIGN KEY (indicator_category_id) REFERENCES project_exemplarity_indicator_category(id) not valid;

alter table "public"."project_exemplarity_indicator" validate constraint "project_exemplarity_indicator_indicator_category_id_fkey";

alter table "public"."project_exemplarity_indicator" add constraint "project_exemplarity_indicator_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_exemplarity_indicator" validate constraint "project_exemplarity_indicator_updated_by_id_fkey";

alter table "public"."project_exemplarity_indicator_category" add constraint "project_exemplarity_indicator_category_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_exemplarity_indicator_category" validate constraint "project_exemplarity_indicator_category_created_by_id_fkey";

alter table "public"."project_exemplarity_indicator_category" add constraint "project_exemplarity_indicator_category_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_exemplarity_indicator_category" validate constraint "project_exemplarity_indicator_category_updated_by_id_fkey";

alter table "public"."project_implantation_mode" add constraint "project_implantation_mode_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_implantation_mode" validate constraint "project_implantation_mode_created_by_id_fkey";

alter table "public"."project_implantation_mode" add constraint "project_implantation_mode_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_implantation_mode" validate constraint "project_implantation_mode_updated_by_id_fkey";

alter table "public"."project_material_origin" add constraint "project_material_origin_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_material_origin" validate constraint "project_material_origin_created_by_id_fkey";

alter table "public"."project_material_origin" add constraint "project_material_origin_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_material_origin" validate constraint "project_material_origin_updated_by_id_fkey";

alter table "public"."project_material_type" add constraint "project_material_type_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_material_type" validate constraint "project_material_type_created_by_id_fkey";

alter table "public"."project_material_type" add constraint "project_material_type_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_material_type" validate constraint "project_material_type_updated_by_id_fkey";

alter table "public"."project_material_use" add constraint "project_material_use_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_material_use" validate constraint "project_material_use_created_by_id_fkey";

alter table "public"."project_material_use" add constraint "project_material_use_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_material_use" validate constraint "project_material_use_updated_by_id_fkey";

alter table "public"."project_site_ownership" add constraint "project_site_ownership_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_site_ownership" validate constraint "project_site_ownership_created_by_id_fkey";

alter table "public"."project_site_ownership" add constraint "project_site_ownership_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_site_ownership" validate constraint "project_site_ownership_updated_by_id_fkey";

alter table "public"."project_site_usage" add constraint "project_site_usage_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_site_usage" validate constraint "project_site_usage_created_by_id_fkey";

alter table "public"."project_site_usage" add constraint "project_site_usage_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_site_usage" validate constraint "project_site_usage_updated_by_id_fkey";

alter table "public"."project_site_usage_category" add constraint "project_site_usage_category_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_site_usage_category" validate constraint "project_site_usage_category_created_by_id_fkey";

alter table "public"."project_site_usage_category" add constraint "project_site_usage_category_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_site_usage_category" validate constraint "project_site_usage_category_updated_by_id_fkey";

alter table "public"."project_site_usage_site_usage_category" add constraint "project_site_usage_site_usage_category_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_site_usage_site_usage_category" validate constraint "project_site_usage_site_usage_category_created_by_id_fkey";

alter table "public"."project_site_usage_site_usage_category" add constraint "project_site_usage_site_usage_category_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_site_usage_site_usage_category" validate constraint "project_site_usage_site_usage_category_updated_by_id_fkey";

alter table "public"."project_type" add constraint "project_type_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_type" validate constraint "project_type_created_by_id_fkey";

alter table "public"."project_type" add constraint "project_type_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_type" validate constraint "project_type_updated_by_id_fkey";

alter table "public"."project_type_category" add constraint "project_type_category_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_type_category" validate constraint "project_type_category_created_by_id_fkey";

alter table "public"."project_type_category" add constraint "project_type_category_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."project_type_category" validate constraint "project_type_category_updated_by_id_fkey";

alter table "public"."projects" add constraint "projects_category_id_fkey" FOREIGN KEY (category_id) REFERENCES project_category(id) not valid;

alter table "public"."projects" validate constraint "projects_category_id_fkey";

alter table "public"."projects" add constraint "projects_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."projects" validate constraint "projects_created_by_id_fkey";

alter table "public"."projects" add constraint "projects_implantation_mode_id_fkey" FOREIGN KEY (implantation_mode_id) REFERENCES project_implantation_mode(id) not valid;

alter table "public"."projects" validate constraint "projects_implantation_mode_id_fkey";

alter table "public"."projects" add constraint "projects_site_ownership_id_fkey" FOREIGN KEY (site_ownership_id) REFERENCES project_site_ownership(id) not valid;

alter table "public"."projects" validate constraint "projects_site_ownership_id_fkey";

alter table "public"."projects" add constraint "projects_site_usage_category_id_fkey" FOREIGN KEY (site_usage_category_id) REFERENCES project_site_usage_category(id) not valid;

alter table "public"."projects" validate constraint "projects_site_usage_category_id_fkey";

alter table "public"."projects" add constraint "projects_site_usage_id_fkey" FOREIGN KEY (site_usage_id) REFERENCES project_site_usage(id) not valid;

alter table "public"."projects" validate constraint "projects_site_usage_id_fkey";

alter table "public"."projects" add constraint "projects_type_id_fkey" FOREIGN KEY (type_id) REFERENCES project_type(id) not valid;

alter table "public"."projects" validate constraint "projects_type_id_fkey";

alter table "public"."projects" add constraint "projects_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."projects" validate constraint "projects_updated_by_id_fkey";

alter table "public"."projects_publication_status" add constraint "projects_publication_status_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."projects_publication_status" validate constraint "projects_publication_status_updated_by_id_fkey";

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."users" validate constraint "users_id_fkey";

alter table "public"."users" add constraint "users_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."users" validate constraint "users_updated_by_id_fkey";

alter table "public"."users_notifications" add constraint "users_notifications_notification_id_fkey" FOREIGN KEY (notification_id) REFERENCES notifications(id) not valid;

alter table "public"."users_notifications" validate constraint "users_notifications_notification_id_fkey";

alter table "public"."users_notifications" add constraint "users_notifications_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."users_notifications" validate constraint "users_notifications_user_id_fkey";

alter table "public"."users_projects_collections" add constraint "users_projects_collections_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES users(id) not valid;

alter table "public"."users_projects_collections" validate constraint "users_projects_collections_created_by_id_fkey";

alter table "public"."users_projects_collections" add constraint "users_projects_collections_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES users(id) not valid;

alter table "public"."users_projects_collections" validate constraint "users_projects_collections_updated_by_id_fkey";

alter table "public"."users_roles" add constraint "users_roles_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES users(id) not valid;

alter table "public"."users_roles" validate constraint "users_roles_updated_by_id_fkey";

alter table "public"."users_roles" add constraint "users_roles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."users_roles" validate constraint "users_roles_user_id_fkey";

create policy "Anyone can select notifications attributed to them"
on "public"."notifications"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM users_notifications un
  WHERE (un.notification_id = notifications.id))));


create policy "Only admins can insert notifications"
on "public"."notifications"
as permissive
for insert
to public
with check (user_has_role(VARIADIC ARRAY['admin'::user_role]));


create policy "Only creators or admins can delete"
on "public"."notifications"
as permissive
for delete
to public
using ((user_has_role(VARIADIC ARRAY['admin'::user_role]) OR (created_by_id = auth.uid())));


create policy "Only creators or admins can update"
on "public"."notifications"
as permissive
for update
to public
using ((user_has_role(VARIADIC ARRAY['admin'::user_role]) OR (created_by_id = auth.uid())))
with check ((user_has_role(VARIADIC ARRAY['admin'::user_role]) OR (created_by_id = auth.uid())));


create policy "Anyone can select"
on "public"."project_category"
as permissive
for select
to public
using (true);


create policy "Anyone can select"
on "public"."project_event_type"
as permissive
for select
to public
using (true);


create policy "Anyone can select"
on "public"."project_event_type_subevent_type"
as permissive
for select
to public
using (true);


create policy "Anyone can select"
on "public"."project_exemplarity_indicator"
as permissive
for select
to public
using (true);


create policy "Anyone can select"
on "public"."project_exemplarity_indicator_category"
as permissive
for select
to public
using (true);


create policy "Anyone can select"
on "public"."project_implantation_mode"
as permissive
for select
to public
using (true);


create policy "Anyone can select"
on "public"."project_material_origin"
as permissive
for select
to public
using (true);


create policy "Anyone can select"
on "public"."project_material_type"
as permissive
for select
to public
using (true);


create policy "Anyone can select"
on "public"."project_material_use"
as permissive
for select
to public
using (true);


create policy "Anyone can select"
on "public"."project_site_ownership"
as permissive
for select
to public
using (true);


create policy "Anyone can select"
on "public"."project_site_usage"
as permissive
for select
to public
using (true);


create policy "Anyone can select"
on "public"."project_site_usage_category"
as permissive
for select
to public
using (true);


create policy "Anyone can select"
on "public"."project_site_usage_site_usage_category"
as permissive
for select
to public
using (true);


create policy "Anyone can select"
on "public"."project_type"
as permissive
for select
to public
using (true);


create policy "Anyone can select"
on "public"."project_type_category"
as permissive
for select
to public
using (true);


create policy "Anyone can select projects"
on "public"."projects"
as permissive
for select
to public
using (true);


create policy "Anyone can select profiles"
on "public"."users"
as permissive
for select
to public
using (true);


create policy "Users can update own profile"
on "public"."users"
as permissive
for update
to public
using ((auth.uid() = id))
with check ((auth.uid() = id));


create policy "Users can delete own notifications"
on "public"."users_notifications"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Users can only select notifications attached to them"
on "public"."users_notifications"
as permissive
for select
to public
using ((user_id = auth.uid()));


create policy "Anyone can select roles"
on "public"."users_roles"
as permissive
for select
to public
using (true);


create policy "Only admin users can update roles"
on "public"."users_roles"
as permissive
for update
to public
using (user_has_role(VARIADIC ARRAY['admin'::user_role]))
with check (user_has_role(VARIADIC ARRAY['admin'::user_role]));



