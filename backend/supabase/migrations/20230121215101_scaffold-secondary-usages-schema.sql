create table "public"."projects_secondary_usages" (
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "created_by_id" uuid default default_uid(),
    "updated_by_id" uuid default default_uid(),
    "usage_id" smallint not null,
    "category_id" smallint not null,
    "project_id" uuid not null
);


alter table "public"."projects_secondary_usages" enable row level security;

CREATE UNIQUE INDEX projects_secondary_usages_pkey ON public.projects_secondary_usages USING btree (usage_id, category_id, project_id);

alter table "public"."projects_secondary_usages" add constraint "projects_secondary_usages_pkey" PRIMARY KEY using index "projects_secondary_usages_pkey";

alter table "public"."projects_secondary_usages" add constraint "projects_secondary_usages_category_id_fkey" FOREIGN KEY (category_id) REFERENCES project_site_usage_category(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects_secondary_usages" validate constraint "projects_secondary_usages_category_id_fkey";

alter table "public"."projects_secondary_usages" add constraint "projects_secondary_usages_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."projects_secondary_usages" validate constraint "projects_secondary_usages_created_by_id_fkey";

alter table "public"."projects_secondary_usages" add constraint "projects_secondary_usages_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects_secondary_usages" validate constraint "projects_secondary_usages_project_id_fkey";

alter table "public"."projects_secondary_usages" add constraint "projects_secondary_usages_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."projects_secondary_usages" validate constraint "projects_secondary_usages_updated_by_id_fkey";

alter table "public"."projects_secondary_usages" add constraint "projects_secondary_usages_usage_id_fkey" FOREIGN KEY (usage_id) REFERENCES project_site_usage(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects_secondary_usages" validate constraint "projects_secondary_usages_usage_id_fkey";

create policy "Anyone can see secondary usages of public projects"
on "public"."projects_secondary_usages"
as permissive
for select
to public
using (project_is_public(project_id));


create policy "Only creators or collaborators can edit secondary usages"
on "public"."projects_secondary_usages"
as permissive
for all
to public
using (user_can_edit_project(project_id))
with check (user_can_edit_project(project_id));



