-- Wait on better supporrt for db-level roles before using this.
-- Follow: 

-- Create new roles

create role app_user;

create role app_editor;

create role app_admin;


-- Grant to authenticator

grant app_user to authenticator;

grant app_editor to authenticator;

grant app_admin to authenticator;