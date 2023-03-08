alter table "public"."project_exemplarity_indicator" drop constraint "project_exemplarity_indicator_created_by_id_fkey";

alter table "public"."project_exemplarity_indicator" drop constraint "project_exemplarity_indicator_updated_by_id_fkey";

alter table "public"."project_exemplarity_indicator" add constraint "project_exemplarity_indicator_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES users(id) not valid;

alter table "public"."project_exemplarity_indicator" validate constraint "project_exemplarity_indicator_created_by_id_fkey";

alter table "public"."project_exemplarity_indicator" add constraint "project_exemplarity_indicator_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES users(id) not valid;

alter table "public"."project_exemplarity_indicator" validate constraint "project_exemplarity_indicator_updated_by_id_fkey";


