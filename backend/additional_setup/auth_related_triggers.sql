-- 
-- Create new user row in public.users_profiles on auth.users signup.
-- 

create or replace function public.handle_new_user() returns trigger as $$
begin

	if not exists (
		select 1 from public.users_roles
		where role = 'nplex'
	) then
		-- Percolate auth signup to users_profiles and users_roles, while making sure the first user registered is 'Nplex'
		-- with role 'nplex' to handle author right relegation on further user profile deletions.
		insert into public.users_profiles (user_id, firstname)
		values (new.id, 'Nplex');
		insert into public.users_roles (user_id, role)
		values (new.id, 'nplex');

		raise warning 'The created user with id % was attributed the "nplex" lead role to fullfill required profile', new.id;
	else
		insert into public.users_profiles (user_id)
		values (new.id);
		insert into public.users_roles (user_id)
		values (new.id);
	end if;

	return new;

end;
$$ language plpgsql security definer;


drop trigger if exists on_new_user on auth.users;

create trigger on_new_user
after insert on auth.users
for each row execute procedure public.handle_new_user();


-- 
-- Prevent suppresion of relegate profile on auth.users / public.users_profiles / public.users_roles updates and deletes.
-- 

create or replace function public.check_enforce_nplex_user() returns trigger as $$
declare
	prevent boolean default false;
begin

	if exists (
		select 1 from public.users_roles
		where user_id = new.user_id
		and role = 'nplex'
	) then
	-- Fn is triggered by event on user 'nplex'.
		if exists (select 1 from inserted) and exists (select 1 from deleted) and (new.role != 'nplex') then
		-- Updated data unsets role 'nplex'.
			prevent = true;
		elseif exists (select 1 from deleted) and not exists (select 1 from inserted) then
		-- Update is deletion of user 'nplex'.
			prevent = true;
		end if;
	elseif (new.role = 'nplex') and exists (
		select 1 from public.users_roles
		where role = 'nplex'
		and user_id != new.user_id
	) then
	-- There is already another 'nplex' user.
		prevent = true;
	end if;

	if prevent then
		raise exception 'There must be one and only one user with the lead role "nplex" for adequate uid delegation on other users delete cascades. This role is already taken by %.', new.id;
		return null;
	else
		return new;
	end if;

end;

$$ language plpgsql security definer;


drop trigger if exists on_user_role_delete on public.users_roles;

create trigger on_user_role_delete
after delete on public.users_roles
for each row execute procedure public.check_enforce_nplex_user();


drop trigger if exists on_user_role_update on public.users_roles;

create trigger on_user_role_update
after update on public.users_roles
for each row execute procedure public.check_enforce_nplex_user();