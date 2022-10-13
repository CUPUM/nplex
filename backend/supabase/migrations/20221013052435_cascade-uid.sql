alter table "public"."users" drop constraint "users_id_fkey";

alter table "public"."users" drop constraint "users_updated_by_id_fkey";

alter table "public"."users_roles" drop constraint "users_roles_updated_by_id_fkey";

alter table "public"."users_roles" drop constraint "users_roles_user_id_fkey";

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."users" validate constraint "users_id_fkey";

alter table "public"."users" add constraint "users_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."users" validate constraint "users_updated_by_id_fkey";

alter table "public"."users_roles" add constraint "users_roles_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."users_roles" validate constraint "users_roles_updated_by_id_fkey";

alter table "public"."users_roles" add constraint "users_roles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."users_roles" validate constraint "users_roles_user_id_fkey";


