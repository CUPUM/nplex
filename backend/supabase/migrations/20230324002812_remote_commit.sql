create or replace view "public"."users_session" as  SELECT u.id,
    u.avatar_url,
    u.public_email,
    u.first_name,
    u.last_name,
    rd.role,
    rd.description AS role_description,
    rd.title AS role_title
   FROM ((users u
     JOIN users_roles r ON ((r.user_id = u.id)))
     JOIN role_details rd ON ((rd.role = r.role)));



