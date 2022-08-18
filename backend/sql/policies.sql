-- CUSTOMIZE COLUMN PERMISSIONS (to limit which fields should be updatable, regardless of user's public.user_role)
-- While the RLS policies enable control over row-level permissions,
-- revoking default update privileges allows control over field/column-level permissions.
alter default privileges in schema public revoke
update on tables
from anon,
	authenticated;

revoke
update on all tables in schema public
from anon,
	authenticated;

alter default privileges in schema public revoke all on functions
from anon,
	authenticated;

revoke execute on all functions in schema public
from anon,
	authenticated;

-- ESTABLISH UPDATE ACCESSES
-- Only fields specified below should be updatable by authed clients.
grant update (
		published_email,
		firstname,
		middlename,
		lastname,
		about,
		avatar_url
	) on public.users_profiles to authenticated;

grant update (role) on public.users_roles to authenticated;

grant update (
		title,
		description,
		site_ownership_id,
		main_site_usage_category_id,
		main_site_usage_id,
		site_area,
		project_area,
		adjacent_streets,
		location_geometry
	) on public.projects to authenticated;

grant update (status) on public.projects_publication_status to authenticated;

grant update (status) on public.projects_publication_status to authenticated;

-- LIST TABLES RLS
alter table public.project_type enable row level security;

create policy "Anyone can select project type" on public.project_type for
select using (true);

alter table public.project_site_ownership enable row level security;

create policy "Anyone can select project site ownership" on public.project_site_ownership for
select using (true);

alter table public.project_site_usage_category enable row level security;

create policy "Anyone can select project site usage category" on public.project_site_usage_category for
select using (true);

alter table public.project_site_usage enable row level security;

create policy "Anyone can select project site usage" on public.project_site_usage for
select using (true);

-- USERS RLS
alter table public.users_profiles enable row level security;

create policy "Anyone can select user profiles." on public.users_profiles for
select using (true);

create policy "Users can only update their own profile." on public.users_profiles for
update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- USERS ROLES RLS
alter table public.users_roles enable row level security;

create policy "Anyone can select users roles." on public.users_roles for
select using (true);

create policy "Only admins can update users roles." on public.users_roles for
update using (public.user_has_role('admin')) with check (public.user_has_role('admin'));

-- PROJECTS RLS
alter table public.projects enable row level security;

create policy "Select published projects, owned projects, or granted projects." on public.projects for
select using (
		exists (
			select 1
			from public.projects_publication_status
			where public.projects_publication_status.project_id = public.projects.id
		)
		or auth.uid() = created_by_id
		or exists (
			select 1
			from public.projects_users
			where public.projects_users.project_id = public.projects.id
				and public.projects_users.user_id = auth.uid()
		)
	);

create policy "Only authed users can insert projects." on public.projects for
insert with check (
		auth.role() = 'authenticated'
		and auth.uid() = created_by_id
	);

create policy "Only admins, projects creators and adequately granted users can update projects." on public.projects for
update using (
		public.user_has_role('admin')
		or auth.uid() = created_by_id
		or exists (
			select 1
			from public.projects_users
			where public.projects_users.project_id = public.projects.id
				and public.projects_users.user_id = auth.uid()
				and public.projects_users.granted_role in ('admin', 'editor')
		)
	) with check (
		public.user_has_role('admin')
		or auth.uid() = created_by_id
		or exists (
			select 1
			from public.projects_users
			where public.projects_users.project_id = public.projects.id
				and public.projects_users.user_id = auth.uid()
				and public.projects_users.granted_role in ('admin', 'editor')
		)
	);

create policy "Only admins and project creators can delete a project." on public.projects for delete using (
	auth.uid() = created_by_id
	or public.user_has_role('admin')
);

-- PROJECTS EDITORS RLS
alter table public.projects_users enable row level security;

create policy "Anyone can select project users." on public.projects_users for
select using (true);

create policy "Only project creators, admins can insert, update, and delete project users." on public.projects_userss for all using (
	public.user_has_role('admin')
	or exists (
		select 1
		from public.projects
		where public.projects.id = public.projects_users.project_id
			and public.projects.created_by_id = auth.uid()
	)
);

-- PROJECTS STATUS RLS
alter table public.projects_publication_status enable row level security;

create policy "Anyone can select publication status." on public.projects_publication_status for
select using (true);

create policy "Only admins, creating editors or granted editors can update publication status." on public.projects_publication_status for
update using (
		public.user_has_role('admin')
		or (
			public.user_has_role('editor')
			and (
				exists (
					select 1
					from public.projects
					where public.projects.id = project_id
						and public.projects.created_by_id = auth.uid()
				)
				or exists (
					select 1
					from public.projects_users
					where public.projects_users.project_id = project_id
						and public.projects_users.user_id = auth.uid()
						and public.projects_users.granted_role in ('admin', 'editor')
				)
			)
		)
	);

-- PROJECTS RATINGS RLS
alter table public.projects_ratings enable row level security;

create policy "Anyone can see projects ratings for projects they can normally select." on public.projects_ratings for
select using (
		exists (
			select 1
			from public.projects
			where public.projects.id = public.projects_ratings.project_id
		)
	);

create policy "Authenticated users can only manage their own ratings for projects they can normally select." on public.projects_ratings for all using (
	auth.uid() = user_id
	and exists (
		select 1
		from public.projects
		where public.projects.id = public.projects_ratings.project_id
	)
) with check (
	auth.uid() = user_id
	and exists (
		select 1
		from public.projects
		where public.projects.id = public.projects_ratings.project_id
	)
);

-- USERS PROJECTS COLLECTIONS RLS
alter table public.users_projects_collections enable row level security;

create policy "Anyone can select published collections or collections they own." on public.users_projects_collections for
select using (
		is_published
		or auth.uid() = user_id
	);

create policy "Authed users can only manage collections under their uid" on public.users_projects_collections for
all using (
	auth.role() = 'authenticated'
	and auth.uid() = user_id
) with check (
	auth.role() = 'authenticated'
	and auth.uid() = user_id
);

-- USERS PROJECTS COLLECTIONS ITEMS RLS
alter table public.users_projects_collections_items enable row level security;

create policy "Anyone can select items for collections and projects they can select." on public.users_projects_collections_items for
select using (
		exists (
			select 1
			from public.users_projects_collections
			where public.users_projects_collections.id = public.users_projects_collections_items.collection_id
		)
		and exists (
			select 1
			from public.projects
			where public.projects.id = public.users_projects_collections_items.project_id
		)
	);

create policy "Authed users can only manage items of collections they own." on public.users_projects_collections_items for
all using (
auth.uid() = user_id
		and exists (
			select 1
			from public.users_projects_collections
			where public.users_projects_collections.id = public.users_projects_collections_items.collection_id
				and public.users_projects_collections.user_id = auth.uid()
		)
) with check (
		auth.uid() = user_id
		and exists (
			select 1
			from public.users_projects_collections
			where public.users_projects_collections.id = public.users_projects_collections_items.collection_id
				and public.users_projects_collections.user_id = auth.uid()
		)
	);