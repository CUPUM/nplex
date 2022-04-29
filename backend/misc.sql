-- COMMUNITY EXTENSIONS
create extension if not exists moddatetime schema extensions;


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
			and role in (roles)
		);
	end if;
end;
$$ language plpgsql security definer;


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
create trigger on_new_user
after insert on auth.users for each row execute procedure public.handle_new_user();


-- MIRROR PUBLICATION STATUS UPDATE IN PROJECTS TABLE
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
create trigger on_project_publication_status_update
before update on public.projects_publication_status for each row execute procedure public.handle_project_publication_status_update();


-- AUTOMATE UPDATED_AT
create trigger on_user_update
before update on public.users for each row execute procedure moddatetime (updated_at);

create trigger on_user_role_update
before update on public.users_roles for each row execute procedure moddatetime (updated_at);

create trigger on_project_update
before update on public.projects for each row execute procedure moddatetime (updated_at);