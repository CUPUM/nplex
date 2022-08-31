alter table "public"."users_profiles" drop constraint "users_profiles_user_id_key";

alter table "public"."users_roles" drop constraint "users_roles_user_id_key";

drop index if exists "public"."users_profiles_user_id_key";

drop index if exists "public"."users_roles_user_id_key";


