-- CUSTOMIZE ACCESSES (to limit which fields should be updatable, regardless of user's public.user_role)
alter default privileges in schema public revoke update on tables from anon, authenticated;
revoke update on all tables in schema public from anon, authenticated;
alter default privileges in schema public revoke all on functions from anon, authenticated;
revoke execute on all functions in schema public from anon, authenticated;


-- DROP PREVIOUS TABLES
drop table if exists public.users_collections_items;
drop table if exists public.users_collections;
drop table if exists public.projects_ratings;
drop table if exists public.projects_editors;
drop table if exists public.projects;
drop table if exists public.users;


-- TIMESTAMPING EXTENSION
create extension if not exists moddatetime schema extensions;


-- CUSTOM TYPES
create or replace type public.user_role as enum ('admin', 'editor', 'visitor');
create or replace type public.publication_status as enum ('unpublished', 'awaiting_approval', 'revoked_approval', 'published');


-- USERS PROFILES
create table public.users (
	user_id uuid references auth.users on delete cascade not null primary key unique,
	created_at timestamptz default timezone('utc'::text, now()) not null,
	updated_at timestamptz default timezone('utc'::text, now()) not null,
	is_online boolean not null default false,
	show_email boolean not null default false,
	avatar_url text,
	firstname text not null,
	middlename text,
	lastname text,
	about text
);
comment on table public.users is 'Base data table for user profiles, extending the default supabase auth.users table.';
-- Only fields specified below should be updatable by authed clients.
grant update (show_email, firstname, middlename, lastname, about) on public.users to authenticated;
-- Automatically update 'updated_at' field.
create or replace trigger on_user_update
before update on public.users for each row execute procedure moddatetime (updated_at);


-- SECURED USERS ROLES
create table public.users_roles (
	user_id uuid references auth.users on delete cascade not null primary key unique,
	updated_at timestamptz default timezone('utc'::text, now()) not null,
	role public.user_role default 'visitor' not null,
);
comment on table public.users_profiles is 'Table for controlled access to users roles.';
-- Only fields specified below should be updatable by authed clients.
grant update (role) on public.users_roles to authenticated;
-- Automatically update 'updated_at' field.
create or replace trigger on_user_role_update
before update on public.users_roles for each row execute procedure moddatetime (updated_at);


-- CREATE USER ROW ON NEW AUTH.USER SIGNUP
create or replace function public.handle_new_user()
returns trigger as $$
begin
	insert into public.users (user_id)
		values (new.id);
	insert into public.users_roles (user_id)
		values (new.id);
	return new;
end;
$$ language plpgsql security definer;
create or replace trigger on_new_user
after insert on auth.users for each row execute procedure public.handle_new_user();


-- PROJECTS
create table public.projects (
	id int generated by default as identity primary key unique,
	created_at timestamptz default timezone('utc'::text, now()) not null,
	updated_at timestamptz default timezone('utc'::text, now()) not null,
	created_by_id int references public.users not null,
	updated_by_id uuid references auth.users not null,
	is_published boolean default false not null,
	title text not null unique,
	description text
	ratings_n int default 0 not null,
	ratings_average float
);
comment on table public.users_profiles is 'Main table for projects.';
-- Only fields specified below should be updatable by authed clients.
grant update (title, description) on public.projects to authenticated;
-- Automatically update 'updated_at' field.
create or replace trigger on_project_update
before update on public.projects for each row execute procedure moddatetime (updated_at);


-- PROJECTS STATUS
create table public.projects_publication_status (
	id int references public.projects on delete cascade not null primary key unique,
	updated_at timestamptz default timezone('utc'::text, now()) not null,
	updated_by_id uuid references auth.users not null,
	status publication_status default 'unpublished' not null
);
comment on table public.projects_publication_status is 'Table for managing projects publication status.';
-- Only fields specified below should be updatable by authed clients.
grant update (status) on public.projects_publication_status to authenticated;
-- Automatically update 'updated_at' field and mirror publish status update in projects table to avoid need for further queries when selecting.
create or replace function public.handle_project_publication_status_update()
returns trigger as $$
begin
	new.updated_at = now();
	update public.projects
	set is_published = new.status = 'published'
	where public.projects.id = new.id;
	return new;
end;
$$ language plpgsql security definer;
create or replace trigger on_project_publication_status_update
before update on public.projects_publication_status for each row execute procedure public.handle_project_publication_status_update();


-- PROJECTS EDITORS
create table public.projects_editors (
	id int generated by default as identity primary key unique,
	project_id int references public.projects on delete cascade not null,
	user_id uuid references auth.users on delete cascade not null,
	unique (project_id, user_id)
);
comment on table public.projects_editors is 'Table for managing editing rights on a per-project basis for non-creators.';
-- Only fields specified below should be updatable by authed clients.
grant update (status) on public.projects_publication_status to authenticated;


-- PROJECTS RATINGS
create table public.projects_ratings (
	id int generated by default as identity primary key unique,
	user_id uuid references auth.users on delete cascade not null,
	project_id int references public.projects on delete cascade not null,
	rating int references public.project_rating_enum not null check (
		rating >= 0
		and rating <= 5
	),
	unique (project_id, user_id)
);
-- To do: add trigger to update projects 'ratings_n' and 'ratings_average' on update.


-- USERS PROJECTS COLLECTIONS
create table public.users_projects_collections (
	id int generated by default as identity primary key unique,
	created_at timestamptz default timezone('utc'::text, now()) not null,
	updated_at timestamptz default timezone('utc'::text, now()) not null,
	user_id uuid references auth.users on delete cascade not null,
	is_published boolean default true not null,
	title text not null,
	description text
);


-- USERS PROJECTS COLLECTIONS ITEMS
create table public.users_collections_items (
	id int generated by default as identity primary key unique,
	user_id uuid references auth.users on delete cascade not null,
	created_at timestamptz default timezone('utc'::text, now()) not null,
	collection_id int references public.users_projects_collections on delete cascade not null,
	project_id int references public.projects on delete cascade not null
);


-- HELPER TO CHECK IF CURRENT USER HAS ONE OF ROLES
create or replace function public.user_has_role(variadic roles public.user_role[])
returns boolean as $$
begin
	if auth.role() != 'authenticated' then
		return false;
	else
		return exists (
			select 1 from public.users_roles
			where auth.uid() = id
			and role in roles
		);
	end if
end
$$ language plpgsql security definer;


-- USERS RLS
alter table public.users enable row level security;
create policy 'Anyone can select user profiles.'
	on public.users for select
	using (true);
create policy 'Users can only update their own profile.'
	on public.users for update
	using (auth.uid() = user_id)
	with check (auth.uid() = user_id);


-- USERS ROLES RLS
alter table public.users_roles enable row level security;
create policy 'Anyone can select users roles.'
	on public.users_roles for select
	using (true);
create policy 'Only admins can update users roles.'
	on public.users_roles for update
	using (public.user_has_role('admin'))
	with check (public.user_has_role('admin'));


-- PROJECTS RLS
alter table public.projects enable row level security;
create policy 'Anyone can select published projects, projects they own, or projects they are editors of.'
	on public.projects for select
	using (
		is_published
		or auth.uid() = created_by_id
		or exists (
			select 1 from public.projects_editors
			where public.projects_editors.project_id = id
			and public.projects_editors.user_id = auth.uid()
		)
	);
create policy 'Authed users can insert unpublished projects.'
	on public.projects for insert
	with check (
		auth.role() = 'authenticated'
		and auth.uid() = created_by_id
	);
create policy 'Only editors and admins can intervene on self-publishable projects.'
	on public.projects for update
	using (
		public.has_role('admin', 'editor')
	);
create policy 'Only project creator can delete a project.'
	on public.projects for delete
	using (auth.uid() = created_by_id);


-- PROJECTS EDITORS RLS
alter table public.projects_editors enable row level security;
create policy 'Anyone can select project editors for projects they can normally select.'
	on public.projects_editors for select
	using (
		exists (
			select 1
			from public.projects
			where public.projects.id = public.projects_editors.project_id
		)
	);
create policy 'Non-creator editors can do anything on assigned projects.'
	on public.projects for all
	using (
		exists (
			select 1
			from public.projects_permissions
			where public.projects_permissions.project_id = public.projects.id
				and public.projects_permissions.user_id = auth.uid()
		)
	)
	with check (
		exists (
			select 1
			from public.projects_permissions
			where public.projects_permissions.project_id = public.projects.id
				and public.projects_permissions.user_id = auth.uid()
		)
	);


-- PROJECTS RATINGS RLS
alter table public.projects_ratings enable row level security;
create policy 'Anyone can see projects ratings for projects they can normally select.'
	on public.projects_ratings for select
	using (
		exists (
			select 1 from public.projects
			where public.projects.id = project_id
		)
	);
create policy 'Only authenticated users can rate projects they can normally select.'
	on public.projects_ratings for update
	using (auth.role() = 'authenticated')
	with check (auth.role() = 'authenticated');
create policy 'Authed users can remove their own ratings.'
	on public.projects_ratings for delete
	using (auth.uid() = user_id);


-- USERS PROJECTS COLLECTIONS RLS
alter table public.users_projects_collections enable row level security;
create policy 'Anyone can select published collections or collections they own.'
	on public.users_projects_collections for select
	using (is_published or auth.uid() = user_id);
create policy 'Authed users can only create collections under their uid.'
	on public.users_projects_collections for insert
	with check (auth.uid() = user_id);
create policy 'Authed users can only update collections they own.'
	on public.users_projects_collections for update
	using (auth.uid() = user_id)
	with check (auth.uid() = user_id);
create policy 'Authed users can only delete collections they own.'
	on public.users_projects_collections for delete
	using (auth.uid() = user_id);


-- USERS PROJECTS COLLECTIONS ITEMS RLS
alter table public.users_collections_items enable row level security;
create policy 'Anyone can select items for collections AND projects they can select.'
	on public.users_collections_items for select
	using (
		exists (
			select 1 from public.users_projects_collections
			where public.users_projects_collections.id = public.users_collections_items.collection_id
		)
		and exists (
			select 1 from public.projects
			where public.projects.id = public.users_collections_items.project_id
		)
	);
create policy 'Authed users can only insert items using their uid and to existing collections they can select.'
	on public.users_collections_items for insert
	with check (
		auth.role() = 'authenticated'
		and auth.uid() = user_id
		and exists (
			select 1 from public.users_projects_collections
			where public.users_projects_collections.user_id = auth.uid()
			and public.users_projects_collections.id = public.users_collections_items.collection_id
		)
	);
create policy 'Users can only update items they own.'
	on public.users_collections_items for update
	using (auth.uid() = user_id)
	with check (auth.uid() = user_id);
create policy 'Authed users can only delete items they own.'
	on public.users_collections_items for delete
	using (auth.uid() = user_id);