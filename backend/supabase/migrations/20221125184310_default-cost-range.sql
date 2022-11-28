alter table "public"."projects" alter column "cost_range" set default '[0,0]'::numrange;

alter table "public"."projects" alter column "cost_range" set not null;


