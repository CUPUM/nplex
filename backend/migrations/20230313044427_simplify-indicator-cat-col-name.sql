alter table "public"."project_exemplarity_indicator" drop constraint "project_exemplarity_indicator_indicator_category_id_fkey";

alter table "public"."project_exemplarity_indicator" drop column "indicator_category_id";

alter table "public"."project_exemplarity_indicator" add column "category_id" smallint not null;

alter table "public"."project_exemplarity_indicator" add constraint "project_exemplarity_indicator_category_id_fkey" FOREIGN KEY (category_id) REFERENCES project_exemplarity_indicator_category(id) not valid;

alter table "public"."project_exemplarity_indicator" validate constraint "project_exemplarity_indicator_category_id_fkey";


