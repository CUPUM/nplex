create table "public"."projects_images" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "created_by_id" uuid not null default default_uid(),
    "updated_by_id" uuid not null default default_uid(),
    "title" text,
    "description" text,
    "order" smallint,
    "project_id" uuid not null
);


alter table "public"."projects_images" enable row level security;

CREATE UNIQUE INDEX projects_images_order_un ON public.projects_images USING btree (project_id, "order");

CREATE UNIQUE INDEX projects_images_pkey ON public.projects_images USING btree (id);

CREATE UNIQUE INDEX projects_images_un ON public.projects_images USING btree (id, project_id);

alter table "public"."projects_images" add constraint "projects_images_pkey" PRIMARY KEY using index "projects_images_pkey";

alter table "public"."projects_images" add constraint "projects_images_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."projects_images" validate constraint "projects_images_created_by_id_fkey";

alter table "public"."projects_images" add constraint "projects_images_id_fkey" FOREIGN KEY (id) REFERENCES storage.objects(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects_images" validate constraint "projects_images_id_fkey";

alter table "public"."projects_images" add constraint "projects_images_order_un" UNIQUE using index "projects_images_order_un";

alter table "public"."projects_images" add constraint "projects_images_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects_images" validate constraint "projects_images_project_id_fkey";

alter table "public"."projects_images" add constraint "projects_images_un" UNIQUE using index "projects_images_un";

alter table "public"."projects_images" add constraint "projects_images_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."projects_images" validate constraint "projects_images_updated_by_id_fkey";

set check_function_bodies = off;

create or replace
function public.add_project_gallery_image()
 returns trigger
 language plpgsql
as $function$
	begin
	if (new.bucket_id = 'projects') and ((storage.foldername(new.name))[2] = 'gallery')
	then
		insert into public.projects_images (id, project_id, updated_by_id, created_by_id)
        values (new.id, (storage.foldername(new.name))[1]::uuid, auth.uid(), auth.uid());
end if;

return new;
end;

$function$
;


drop trigger if exists on_project_image_upload on storage.objects;
create trigger on_project_image_upload after insert on storage.objects for each row execute procedure public.add_project_gallery_image();

create policy "Anyone can see galleries for published projects"
on "public"."projects_images"
as permissive
for select
to public
using (project_is_public(project_id));


create policy "Project creators and collaborators can manage galleries"
on "public"."projects_images"
as permissive
for all
to authenticated
using (user_can_edit_project(project_id))
with check (user_can_edit_project(project_id));

