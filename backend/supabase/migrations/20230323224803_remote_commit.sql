drop view if exists "public"."users_extended";

create or replace view "public"."users_roles_extended" as  SELECT ur.user_id,
    ur.updated_at,
    ur.role,
    ur.updated_by_id,
    ur.request,
    ur.requested_at,
    rd.description,
    rd.title
   FROM (users_roles ur
     JOIN role_details rd ON ((rd.role = ur.role)));



