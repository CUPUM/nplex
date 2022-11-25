drop table "public"."projects_likes_sums";

alter table "public"."projects" add column "likes_sum" integer not null default 0;


