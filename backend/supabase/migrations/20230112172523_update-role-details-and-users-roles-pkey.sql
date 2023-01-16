alter table "public"."user_role_details" drop constraint "user_role_details_label_key";

alter table "public"."users_roles" drop constraint "users_roles_user_id_fkey";

alter table "public"."users_roles" drop constraint "users_roles_pkey";

drop index if exists "public"."user_role_details_label_key";

drop index if exists "public"."users_roles_pkey";

alter table "public"."user_role_details" drop column "label";

alter table "public"."user_role_details" add column "title" text not null;

CREATE UNIQUE INDEX user_role_details_label_key ON public.user_role_details USING btree (title);

CREATE UNIQUE INDEX users_roles_pkey ON public.users_roles USING btree (user_id, role);

alter table "public"."users_roles" add constraint "users_roles_pkey" PRIMARY KEY using index "users_roles_pkey";

alter table "public"."user_role_details" add constraint "user_role_details_label_key" UNIQUE using index "user_role_details_label_key";

alter table "public"."users_roles" add constraint "users_roles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."users_roles" validate constraint "users_roles_user_id_fkey";

insert into "public"."user_role_details" ("user_role", "title", "description")
values
    ('admin', 'Administrateur', 'Les administrateurs...'),
    ('editor', 'Éditeur de contenu', 'Les éditeurs...'),
    ('visitor', 'Visiteur', 'Les visiteurs...');