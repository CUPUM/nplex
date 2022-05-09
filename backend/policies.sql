-- CUSTOMIZE COLUMN PERMISSIONS (to limit which fields should be updatable, regardless of user's public.user_role)
-- While the RLS policies enable control over row-level permissions,
-- revoking default update privileges allows control over field/column-level permissions.
alter default privileges in schema public revoke update on tables from anon, authenticated;
revoke update on all tables in schema public from anon, authenticated;
alter default privileges in schema public revoke all on functions from anon, authenticated;
revoke execute on all functions in schema public from anon, authenticated;


-- ESTABLISH UPDATE ACCESSES
-- Only fields specified below should be updatable by authed clients.
grant update (show_email, firstname, middlename, lastname, about)
on public.users to authenticated;

grant update (role)
on public.users_roles to authenticated;

grant update (title, description)
on public.projects to authenticated;

grant update (status)
on public.projects_publication_status to authenticated;

grant update (status)
on public.projects_publication_status to authenticated;


-- USERS RLS
alter table public.users enable row level security;
create policy "Anyone can select user profiles."
	on public.users for select
	using (true);
create policy "Users can only update their own profile."
	on public.users for update
	using (auth.uid() = user_id)
	with check (auth.uid() = user_id);


-- USERS ROLES RLS
alter table public.users_roles enable row level security;
create policy "Anyone can select users roles."
	on public.users_roles for select
	using (true);
create policy "Only admins can update users roles."
	on public.users_roles for update
	using (public.user_has_role('admin'))
	with check (public.user_has_role('admin'));


-- PROJECTS RLS
alter table public.projects enable row level security;
create policy "Anyone can select published projects, projects they own, or projects they are editors of."
	on public.projects for select
	using (
		is_published
		or auth.uid() = created_by_id
		or exists (
			select 1 from public.projects_editors
			where public.projects_editors.project_id = public.projects.id
			and public.projects_editors.user_id = auth.uid()
		)
	);
create policy "Only authed users can insert projects."
	on public.projects for insert
	with check (
		auth.role() = 'authenticated'
		and auth.uid() = created_by_id
	);
create policy "Only admins, projects creators and assigned editors can update projects."
	on public.projects for update
	using (
		public.user_has_role('admin')
		or auth.uid() = created_by_id
		or exists (
			select 1 from public.projects_editors
			where public.projects_editors.project_id = public.projects.id
			and public.projects_editors.user_id = auth.uid()
		)
	)
	with check (
		public.user_has_role('admin')
		or auth.uid() = created_by_id
		or exists (
			select 1 from public.projects_editors
			where public.projects_editors.project_id = public.projects.id
			and public.projects_editors.user_id = auth.uid()
		)
	);
create policy "Only admins and project creators can delete a project."
	on public.projects for delete
	using (
		auth.uid() = created_by_id
		or public.user_has_role('admin')
	);


-- PROJECTS EDITORS RLS
alter table public.projects_editors enable row level security;
create policy "Anyone can select project editors for projects they can normally select."
	on public.projects_editors for select
	using (
		exists (
			select 1 from public.projects
			where public.projects.id = public.projects_editors.project_id
		)
	);
create policy "Only project creators and admins can insert, update, and delete project editors."
	on public.projects_editors for all
	using (
		public.user_has_role('admin')
		or exists (
			select 1 from public.projects
			where public.projects.id = public.projects_editors.project_id
			and public.projects.created_by_id = auth.uid()
		)
	);


-- PROJECTS STATUS RLS
alter table public.projects_publication_status enable row level security;
create policy "Anyone can select publication status for projects they can normally select."
	on public.projects_publication_status for select
	using (
		exists (
			select 1 from public.projects
			where public.projects.id = public.projects_publication_status.project_id
		)
	);
create policy "Only editors and admin can update publication status for projects they created or are editors of."
	on public.projects_publication_status for update
	using (
		public.user_has_role('admin')
		or (
			public.user_has_role('editor')
			and (
				exists (
					select 1 from public.projects
					where public.projects.id = public.projects_publication_status.project_id
					and public.projects.created_by_id = auth.uid()
				)
				or exists (
					select 1 from public.projects_editors
					where public.projects_editors.project_id = public.projects_publication_status.project_id
					and public.projects_editors.user_id = auth.uid()
				)
			)
		)
	);


-- PROJECTS RATINGS RLS
alter table public.projects_ratings enable row level security;
create policy "Anyone can see projects ratings for projects they can normally select."
	on public.projects_ratings for select
	using (
		exists (
			select 1 from public.projects
			where public.projects.id = public.projects_ratings.project_id
		)
	);
create policy "Authenticated users can only manage their own ratings for projects they can normally select."
	on public.projects_ratings for all
	using (
		auth.uid() = user_id
		and exists (
			select 1 from public.projects
			where public.projects.id = public.projects_ratings.project_id
		)
	)
	with check (
		auth.uid() = user_id
		and exists (
			select 1 from public.projects
			where public.projects.id = public.projects_ratings.project_id
		)
	);


-- USERS PROJECTS COLLECTIONS RLS
alter table public.users_projects_collections enable row level security;
create policy "Anyone can select published collections or collections they own."
	on public.users_projects_collections for select
	using (
		is_published
		or auth.uid() = user_id
	);
create policy "Authed users can only create collections under their uid."
	on public.users_projects_collections for insert
	with check (auth.uid() = user_id);
create policy "Authed users can only update collections they own."
	on public.users_projects_collections for update
	using (auth.uid() = user_id)
	with check (auth.uid() = user_id);
create policy "Authed users can only delete collections they own."
	on public.users_projects_collections for delete
	using (auth.uid() = user_id);


-- USERS PROJECTS COLLECTIONS ITEMS RLS
alter table public.users_projects_collections_items enable row level security;
create policy "Anyone can select items for collections and projects they can select."
	on public.users_projects_collections_items for select
	using (
		exists (
			select 1 from public.users_projects_collections
			where public.users_projects_collections.id = public.users_projects_collections_items.collection_id
		)
		and exists (
			select 1 from public.projects
			where public.projects.id = public.users_projects_collections_items.project_id
		)
	);
create policy "Authed users can only insert items to existing collections they can select."
	on public.users_projects_collections_items for insert
	with check (
		auth.uid() = user_id
		and exists (
			select 1 from public.users_projects_collections
			where public.users_projects_collections.id = public.users_projects_collections_items.collection_id
			and public.users_projects_collections.user_id = auth.uid()
		)
	);
create policy "Users can only update items they own."
	on public.users_projects_collections_items for update
	using (auth.uid() = user_id)
	with check (auth.uid() = user_id);
create policy "Authed users can only delete items they own."
	on public.users_projects_collections_items for delete
	using (auth.uid() = user_id);