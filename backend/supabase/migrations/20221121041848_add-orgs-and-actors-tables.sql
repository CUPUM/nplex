create table "public"."actors" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "created_by_id" uuid not null default default_uid(),
    "updated_by_id" uuid not null default default_uid(),
    "first_name" text not null,
    "last_name" text,
    "middle_name" text,
    "about" text
);


create table "public"."organizations" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "created_by_id" uuid not null default default_uid(),
    "updated_at" timestamp with time zone not null default now(),
    "updated_by_id" uuid not null default default_uid(),
    "name" text not null,
    "short_name" text,
    "about" text
);


CREATE UNIQUE INDEX actors_pkey ON public.actors USING btree (id);

CREATE UNIQUE INDEX organizations_pkey ON public.organizations USING btree (id);

alter table "public"."actors" add constraint "actors_pkey" PRIMARY KEY using index "actors_pkey";

alter table "public"."organizations" add constraint "organizations_pkey" PRIMARY KEY using index "organizations_pkey";

alter table "public"."actors" add constraint "actors_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES users(id) not valid;

alter table "public"."actors" validate constraint "actors_created_by_id_fkey";

alter table "public"."actors" add constraint "actors_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES users(id) not valid;

alter table "public"."actors" validate constraint "actors_updated_by_id_fkey";

alter table "public"."organizations" add constraint "organizations_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES users(id) not valid;

alter table "public"."organizations" validate constraint "organizations_created_by_id_fkey";

alter table "public"."organizations" add constraint "organizations_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES users(id) not valid;

alter table "public"."organizations" validate constraint "organizations_updated_by_id_fkey";


