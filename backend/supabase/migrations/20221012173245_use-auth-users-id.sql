alter table "public"."users_notifications" drop constraint "users_notifications_user_id_fkey";

alter table "public"."users_roles" drop constraint "users_roles_updated_by_id_fkey";

alter table "public"."users_roles" drop constraint "users_roles_user_id_fkey";

alter table "public"."users_roles" alter column "updated_by_id" drop default;

alter table "public"."users_notifications" add constraint "users_notifications_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."users_notifications" validate constraint "users_notifications_user_id_fkey";

alter table "public"."users_roles" add constraint "users_roles_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES auth.users(id) not valid;

alter table "public"."users_roles" validate constraint "users_roles_updated_by_id_fkey";

alter table "public"."users_roles" add constraint "users_roles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."users_roles" validate constraint "users_roles_user_id_fkey";


