drop policy "anyone can see secondary usages of public projects" on "public"."projects_usages";

drop policy "only creators or collaborators can edit secondary usages" on "public"."projects_usages";

drop policy "Anyone can see works of published projects" on "public"."projects_works";

drop policy "Project maintainers can do all" on "public"."projects_works";

alter table "public"."projects_users" drop constraint "projects_users_created_by_id_fkey";

alter table "public"."projects_users" drop constraint "projects_users_project_id_fkey";

alter table "public"."projects_users" drop constraint "projects_users_updated_by_id_fkey";

alter table "public"."projects_users" drop constraint "projects_users_user_id_fkey";

alter table "public"."projects_works" drop constraint "projects_works_created_by_id_fkey";

alter table "public"."projects_works" drop constraint "projects_works_project_id_fkey";

alter table "public"."projects_works" drop constraint "projects_works_updated_by_id_fkey";

alter table "public"."projects_works" drop constraint "projects_works_work_id_fkey";

alter table "public"."projects_usages" drop constraint "projects_secondary_usages_category_id_fkey";

alter table "public"."projects_usages" drop constraint "projects_secondary_usages_created_by_id_fkey";

alter table "public"."projects_usages" drop constraint "projects_secondary_usages_project_id_fkey";

alter table "public"."projects_usages" drop constraint "projects_secondary_usages_usage_id_fkey";

alter table "public"."projects_works" drop constraint "projects_works_un";

drop view if exists "public"."editable_projects";

alter table "public"."projects_usages" drop constraint "projects_secondary_usages_pkey";

alter table "public"."projects_users" drop constraint "projects_users_pkey";

alter table "public"."projects_works" drop constraint "projects_works_pkey";

drop index if exists "public"."projects_secondary_usages_pkey";

drop index if exists "public"."projects_users_pkey";

drop index if exists "public"."projects_works_pkey";

drop index if exists "public"."projects_works_un";

alter table "public"."projects_location" drop column "geometry";

alter table "public"."projects_location" add column "center" geometry;

alter table "public"."projects_location" add column "circle" geometry generated always as (
CASE
    WHEN ((radius IS NULL) OR (center IS NULL)) THEN NULL::geometry
    ELSE st_buffer(center, (radius)::double precision, 'quad_segs=8'::text)
END) stored;

alter table "public"."projects_materials" drop column "created_by_id";

alter table "public"."projects_materials" drop column "material_type_id";

alter table "public"."projects_materials" drop column "origin_id";

alter table "public"."projects_materials" drop column "project_id";

alter table "public"."projects_materials" drop column "sustainability";

alter table "public"."projects_materials" drop column "updated_by_id";

alter table "public"."projects_materials" add column "created_by" uuid not null default default_uid();

alter table "public"."projects_materials" add column "material_type" integer not null;

alter table "public"."projects_materials" add column "origin" smallint;

alter table "public"."projects_materials" add column "project" uuid not null;

alter table "public"."projects_materials" add column "updated_by" uuid not null default default_uid();

alter table "public"."projects_materials" enable row level security;

alter table "public"."projects_materials_uses" drop column "created_by_id";

alter table "public"."projects_materials_uses" drop column "material_use_id";

alter table "public"."projects_materials_uses" drop column "project_id";

alter table "public"."projects_materials_uses" drop column "project_material_id";

alter table "public"."projects_materials_uses" drop column "updated_by_id";

alter table "public"."projects_materials_uses" add column "created_by" uuid not null default default_uid();

alter table "public"."projects_materials_uses" add column "project" uuid not null;

alter table "public"."projects_materials_uses" add column "project_material" uuid not null;

alter table "public"."projects_materials_uses" add column "updated_by" uuid not null default default_uid();

alter table "public"."projects_materials_uses" add column "use" integer not null;

alter table "public"."projects_materials_uses" enable row level security;

alter table "public"."projects_usages" drop column "category_id";

alter table "public"."projects_usages" drop column "created_by_id";

alter table "public"."projects_usages" drop column "main";

alter table "public"."projects_usages" drop column "project_id";

alter table "public"."projects_usages" drop column "updated_by_id";

alter table "public"."projects_usages" drop column "usage_id";

alter table "public"."projects_usages" add column "category" smallint not null;

alter table "public"."projects_usages" add column "created_by" uuid default default_uid();

alter table "public"."projects_usages" add column "is_main" boolean not null default false;

alter table "public"."projects_usages" add column "project" uuid not null;

alter table "public"."projects_usages" add column "updated_by" uuid default default_uid();

alter table "public"."projects_usages" add column "usage" smallint not null;

alter table "public"."projects_users" drop column "created_by_id";

alter table "public"."projects_users" drop column "project_id";

alter table "public"."projects_users" drop column "updated_by_id";

alter table "public"."projects_users" drop column "user_id";

alter table "public"."projects_users" add column "created_by" uuid not null default default_uid();

alter table "public"."projects_users" add column "project" uuid not null;

alter table "public"."projects_users" add column "updated_by" uuid not null default default_uid();

alter table "public"."projects_users" add column "user" uuid not null;

alter table "public"."projects_works" drop column "created_by_id";

alter table "public"."projects_works" drop column "project_id";

alter table "public"."projects_works" drop column "updated_by_id";

alter table "public"."projects_works" drop column "work_id";

alter table "public"."projects_works" add column "created_by" uuid not null default default_uid();

alter table "public"."projects_works" add column "project" uuid not null;

alter table "public"."projects_works" add column "updated_by" uuid not null default default_uid();

alter table "public"."projects_works" add column "work" smallint not null;

alter table "public"."projects_works" enable row level security;

CREATE UNIQUE INDEX projects_materials_pkey ON public.projects_materials USING btree (id);

CREATE UNIQUE INDEX projects_materials_uses_pkey ON public.projects_materials_uses USING btree (project, project_material, use);

CREATE UNIQUE INDEX projects_secondary_usages_pkey ON public.projects_usages USING btree (usage, category, project);

CREATE UNIQUE INDEX projects_users_pkey ON public.projects_users USING btree (project, "user");

CREATE UNIQUE INDEX projects_works_pkey ON public.projects_works USING btree (project, work);

CREATE UNIQUE INDEX projects_works_un ON public.projects_works USING btree (project, work);

alter table "public"."projects_materials" add constraint "projects_materials_pkey" PRIMARY KEY using index "projects_materials_pkey";

alter table "public"."projects_materials_uses" add constraint "projects_materials_uses_pkey" PRIMARY KEY using index "projects_materials_uses_pkey";

alter table "public"."projects_usages" add constraint "projects_secondary_usages_pkey" PRIMARY KEY using index "projects_secondary_usages_pkey";

alter table "public"."projects_users" add constraint "projects_users_pkey" PRIMARY KEY using index "projects_users_pkey";

alter table "public"."projects_works" add constraint "projects_works_pkey" PRIMARY KEY using index "projects_works_pkey";

alter table "public"."projects_materials" add constraint "projects_materials_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."projects_materials" validate constraint "projects_materials_created_by_fkey";

alter table "public"."projects_materials" add constraint "projects_materials_material_type_fkey" FOREIGN KEY (material_type) REFERENCES project_material_type(id) ON DELETE CASCADE not valid;

alter table "public"."projects_materials" validate constraint "projects_materials_material_type_fkey";

alter table "public"."projects_materials" add constraint "projects_materials_origin_fkey" FOREIGN KEY (origin) REFERENCES project_material_origin(id) ON DELETE SET NULL not valid;

alter table "public"."projects_materials" validate constraint "projects_materials_origin_fkey";

alter table "public"."projects_materials" add constraint "projects_materials_project_fkey" FOREIGN KEY (project) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."projects_materials" validate constraint "projects_materials_project_fkey";

alter table "public"."projects_materials" add constraint "projects_materials_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."projects_materials" validate constraint "projects_materials_updated_by_fkey";

alter table "public"."projects_materials_uses" add constraint "projects_materials_uses_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."projects_materials_uses" validate constraint "projects_materials_uses_created_by_fkey";

alter table "public"."projects_materials_uses" add constraint "projects_materials_uses_project_fkey" FOREIGN KEY (project) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."projects_materials_uses" validate constraint "projects_materials_uses_project_fkey";

alter table "public"."projects_materials_uses" add constraint "projects_materials_uses_project_material_fkey" FOREIGN KEY (project_material) REFERENCES projects_materials(id) ON DELETE CASCADE not valid;

alter table "public"."projects_materials_uses" validate constraint "projects_materials_uses_project_material_fkey";

alter table "public"."projects_materials_uses" add constraint "projects_materials_uses_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."projects_materials_uses" validate constraint "projects_materials_uses_updated_by_fkey";

alter table "public"."projects_materials_uses" add constraint "projects_materials_uses_use_fkey" FOREIGN KEY (use) REFERENCES project_material_use(id) ON DELETE CASCADE not valid;

alter table "public"."projects_materials_uses" validate constraint "projects_materials_uses_use_fkey";

alter table "public"."projects_users" add constraint "projects_users_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."projects_users" validate constraint "projects_users_created_by_fkey";

alter table "public"."projects_users" add constraint "projects_users_project_fkey" FOREIGN KEY (project) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."projects_users" validate constraint "projects_users_project_fkey";

alter table "public"."projects_users" add constraint "projects_users_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) not valid;

alter table "public"."projects_users" validate constraint "projects_users_updated_by_fkey";

alter table "public"."projects_users" add constraint "projects_users_user_fkey" FOREIGN KEY ("user") REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."projects_users" validate constraint "projects_users_user_fkey";

alter table "public"."projects_works" add constraint "projects_works_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."projects_works" validate constraint "projects_works_created_by_fkey";

alter table "public"."projects_works" add constraint "projects_works_project_fkey" FOREIGN KEY (project) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."projects_works" validate constraint "projects_works_project_fkey";

alter table "public"."projects_works" add constraint "projects_works_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."projects_works" validate constraint "projects_works_updated_by_fkey";

alter table "public"."projects_works" add constraint "projects_works_work_fkey" FOREIGN KEY (work) REFERENCES project_intervention(id) ON DELETE CASCADE not valid;

alter table "public"."projects_works" validate constraint "projects_works_work_fkey";

alter table "public"."projects_usages" add constraint "projects_secondary_usages_category_id_fkey" FOREIGN KEY (category) REFERENCES project_site_usage_category(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects_usages" validate constraint "projects_secondary_usages_category_id_fkey";

alter table "public"."projects_usages" add constraint "projects_secondary_usages_created_by_id_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."projects_usages" validate constraint "projects_secondary_usages_created_by_id_fkey";

alter table "public"."projects_usages" add constraint "projects_secondary_usages_project_id_fkey" FOREIGN KEY (project) REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects_usages" validate constraint "projects_secondary_usages_project_id_fkey";

alter table "public"."projects_usages" add constraint "projects_secondary_usages_usage_id_fkey" FOREIGN KEY (usage) REFERENCES project_site_usage(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects_usages" validate constraint "projects_secondary_usages_usage_id_fkey";

alter table "public"."projects_works" add constraint "projects_works_un" UNIQUE using index "projects_works_un";

create or replace view "public"."editable_projects" as  SELECT projects.id,
    projects.created_at,
    projects.updated_at,
    projects.created_by,
    projects.updated_by,
    projects.title,
    projects.description,
    projects.site_ownership,
    projects.site_area,
    projects.interventions_area,
    projects.adjacent_streets,
    projects.building_area,
    projects.implantation_mode,
    projects.building_construction_year,
    projects.type,
    projects.banner,
    projects.cost_range,
    projects.likes_sum,
    projects.building_height,
    projects.building_levels_main,
    projects.building_levels_basement,
    projects.building_levels_mezzanine,
    projects.adjacent_alleys
   FROM projects
  WHERE authorize_project_update(projects.id);


create policy "anyone can see secondary usages of public projects"
on "public"."projects_usages"
as permissive
for select
to public
using (project_is_public(project));


create policy "only creators or collaborators can edit secondary usages"
on "public"."projects_usages"
as permissive
for all
to public
using (authorize_project_update(project))
with check (authorize_project_update(project));


create policy "Anyone can see works of published projects"
on "public"."projects_works"
as permissive
for select
to public
using (project_is_public(project));


create policy "Project maintainers can do all"
on "public"."projects_works"
as permissive
for all
to public
using (authorize_project_update(project))
with check (authorize_project_update(project));



