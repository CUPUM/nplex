CREATE UNIQUE INDEX users_roles_un ON public.users_roles USING btree (user_id);

CREATE UNIQUE INDEX users_un ON public.users USING btree (id);

alter table "public"."users" add constraint "users_un" UNIQUE using index "users_un";

alter table "public"."users_roles" add constraint "users_roles_un" UNIQUE using index "users_roles_un";


