alter table "public"."users_roles" drop constraint "users_roles_user_id_fkey";

alter table "public"."users_roles" add constraint "users_roles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."users_roles" validate constraint "users_roles_user_id_fkey";


