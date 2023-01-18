alter table "public"."projects" drop constraint "projects_banner_id_fkey";

alter table "public"."projects" add constraint "projects_banner_id_fkey" FOREIGN KEY (banner_id) REFERENCES projects_images(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."projects" validate constraint "projects_banner_id_fkey";


