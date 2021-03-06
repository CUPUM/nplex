/*
 CUSTOM TYPES
 */
create type public.user_role as enum ('admin', 'editor', 'visitor');

create type public.publication_status as enum (
	'unpublished',
	'awaiting_approval',
	'revoked_approval',
	'published'
);

/*
 USERS PROFILES
 */
create table public.users_profiles (
	user_id uuid references auth.users on delete cascade not null primary key unique,
	created_at timestamptz default timezone('utc'::text, now()) not null,
	updated_at timestamptz default timezone('utc'::text, now()) not null,
	is_online boolean not null default false,
	email text,
	avatar_url text,
	firstname text,
	middlename text,
	lastname text,
	about text
);

comment on table public.users_profiles is 'Base data table for user profiles, extending the default supabase auth.users table.';

/*
 SECURED USERS ROLES
 */
create table public.users_roles (
	user_id uuid references public.users_profiles on delete cascade not null primary key unique,
	updated_at timestamptz default timezone('utc'::text, now()) not null,
	role public.user_role default 'visitor' not null
);

comment on table public.users_roles is 'Table for controlled access to users roles.';

/*
 PROJECTS
 */
create table public.projects (
	id uuid default uuid_generate_v4() primary key unique,
	created_at timestamptz default timezone('utc'::text, now()) not null,
	updated_at timestamptz default timezone('utc'::text, now()) not null,
	created_by_id uuid references public.users_profiles default auth.uid() not null,
	updated_by_id uuid references public.users_profiles default auth.uid() not null,
	is_published boolean default false,
	-- General data
	title text not null unique,
	description text,
	-- Site/place data
	place_ownership,
	main_usage_category,
	main_usage,
	adjacent_streets smallint,
	district_id int not null references public.districts_list,
	location_geometry geometry,
	site_area numeric,
	-- complimentary_usage: create external table for 1:N
	-- Project data
	project_area numeric,
	ratings_n int default 0 not null,
	ratings_average float
);

comment on table public.projects is 'Main table for projects.';

/*
 PROJECTS PUBLICATION STATUS
 */
create table public.projects_publication_status (
	project_id uuid references public.projects on delete cascade not null primary key unique,
	updated_at timestamptz default timezone('utc'::text, now()) not null,
	updated_by_id uuid references public.users_profiles not null,
	status publication_status default 'unpublished' not null
);

comment on table public.projects_publication_status is 'Table for managing projects publication status through limited access.';

/*
 PROJECTS EDITORS
 */
create table public.projects_editors (
	id int generated by default as identity primary key unique,
	project_id uuid references public.projects on delete cascade not null,
	user_id uuid references public.users_profiles on delete cascade not null,
	unique (project_id, user_id)
);

comment on table public.projects_editors is 'Table for managing editing rights on a per-project basis for non-creators.';

/*
 PROJECTS RATINGS
 */
-- Look into aggregate functions for average total ratings and etc.: https://www.postgresql.org/docs/current/tutorial-agg.html
create table public.projects_ratings (
	id int generated by default as identity primary key unique,
	user_id uuid references public.users_profiles on delete cascade not null,
	project_id uuid references public.projects on delete cascade not null,
	rating numeric(2, 1),
	unique (project_id, user_id)
);

/*
 USERS PROJECTS COLLECTIONS
 */
create table public.users_projects_collections (
	id uuid default uuid_generate_v4() primary key unique,
	created_at timestamptz default timezone('utc'::text, now()) not null,
	updated_at timestamptz default timezone('utc'::text, now()) not null,
	user_id uuid references public.users_profiles on delete cascade not null,
	is_published boolean default true not null,
	title text not null,
	description text
);

/*
 USERS PROJECTS COLLECTIONS ITEMS
 */
create table public.users_projects_collections_items (
	id int generated by default as identity primary key unique,
	user_id uuid references public.users_profiles on delete cascade not null,
	created_at timestamptz default timezone('utc'::text, now()) not null,
	collection_id uuid references public.users_projects_collections on delete cascade not null,
	project_id uuid references public.projects on delete cascade not null
);

-- *** START PROJECTS DESCRIPTORS ***
/*
 PROJECT TYPE LIST
 */
create table public.project_type_list (
	id int generated by default as identity primary key unique,
	title text not null,
	description text
);

insert into public.project_type_list (title, description)
values ('Nouvelle construction', ''),
	('Transformation', '');

/*
 PLACE OWNERSHIP LIST
 */
create table public.place_ownership_list (
	id int generated by default as identity primary key unique,
	title text not null,
	description text
);

insert into public.place_ownership_list (title, description)
values ('Particulier', ''),
	('Organisme communautaire', ''),
	('Entreprise', ''),
	('Gouvernment', '');

/*
 PLACE USAGE CATEGORY LIST
 */
create table public.place_usage_category_list (
	id int generated by default as identity primary key unique,
	title text not null,
	description text
);

insert into public.place_usage_category_list (title, description)
values ('R??sidentiel', ''),
	('Communautaire', ''),
	('Commercial', ''),
	('Industriel', '');

/*
 PLACE USAGE LIST
 */
create table public.place_usage_list (
	id int generated by default as identity primary key unique,
	title text not null,
	description text
);

insert into public.place_usage_list (title, description)
values ('Unifamilial', ''),
	('Duplex', ''),
	('Triplex', ''),
	('Quadruplex', ''),
	('Quintuplex', ''),
	('Sixplex', ''),
	('Bloc d???appartements', ''),
	('Condos', 'Co-propri??t?? divise');

-- *** END PROJECTS DESCRIPTORS ***