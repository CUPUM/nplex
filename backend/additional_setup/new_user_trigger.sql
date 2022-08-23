-- 
-- Create new user row in public.users_profiles on auth.users signup
-- 

create or replace function public.handle_new_user() returns trigger as $$ begin
insert into public.users_profiles (user_id)
values (new.id);

insert into public.users_roles (user_id)
values (new.id);

return new;

end;

$$ language plpgsql security definer;

create trigger on_new_user
after
insert on auth.users for each row execute procedure public.handle_new_user();