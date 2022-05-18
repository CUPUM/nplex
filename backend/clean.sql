-- DROP POLICIES
drop policy if exists "Anyone can select user profiles." on public.users_profiles;

drop policy if exists "Users can only update their own profile." on public.users_profiles;

drop policy if exists "Anyone can select users roles." on public.users_roles;

drop policy if exists "Only admins can update users roles." on public.users_roles;

drop policy if exists "Anyone can select published projects, projects they own, or projects they are editors of." on public.projects;

drop policy if exists "Only authed users can insert projects." on public.projects;

drop policy if exists "Only admins, projects creators and assigned editors can update projects." on public.projects;

drop policy if exists "Only admins and project creators can delete a project." on public.projects;

drop policy if exists "Anyone can select project editors for projects they can normally select." on public.projects_editors;

drop policy if exists "Only project creators and admins can insert, update, and delete project editors." on public.projects_editors;

drop policy if exists "Anyone can select publication status for projects they can normally select." on public.projects_publication_status;

drop policy if exists "Only editors and admin can update publication status for projects they created or are editors of." on public.projects_publication_status;

drop policy if exists "Anyone can see projects ratings for projects they can normally select." on public.projects_ratings;

drop policy if exists "Authenticated users can only manage their own ratings for projects they can normally select." on public.projects_ratings;

drop policy if exists "Anyone can select published collections or collections they own." on public.users_projects_collections;

drop policy if exists "Authed users can only create collections under their uid." on public.users_projects_collections;

drop policy if exists "Authed users can only update collections they own." on public.users_projects_collections;

drop policy if exists "Authed users can only delete collections they own." on public.users_projects_collections;

drop policy if exists "Anyone can select items for collections and projects they can select." on public.users_projects_collections_items;

drop policy if exists "Authed users can only insert items to existing collections they can select." on public.users_projects_collections_items;

drop policy if exists "Users can only update items they own." on public.users_projects_collections_items;

drop policy if exists "Authed users can only delete items they own." on public.users_projects_collections_items;

-- DROP TRIGGERS
drop trigger if exists on_new_user on auth.users;

drop trigger if exists on_project_publication_status_update on public.projects_publication_status;

-- DROP FUNCTION
drop function if exists public.handle_new_user;

drop function if exists public.user_has_role;

drop function if exists public.handle_project_publication_status_update;

-- DROP TABLES
drop table if exists public.users_projects_collections_items;

drop table if exists public.users_projects_collections;

drop table if exists public.projects_ratings;

drop table if exists public.projects_editors;

drop table if exists public.projects_publication_status;

drop table if exists public.projects;

drop table if exists public.users_roles;

drop table if exists public.users_profiles;

-- DROP TYPES
drop type if exists public.user_role;

drop type if exists public.publication_status;