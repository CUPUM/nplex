-- 
-- Setup auth trigger manually (not saved by migrations).
-- 

drop trigger if exists on_new_user on auth.users;

create trigger on_new_user
after insert on auth.users
for each row execute procedure public.handle_new_user();


drop trigger if exists on_delete_user on auth.users;

create trigger on_delete_user
before delete on auth.users
for each row execute procedure public.handle_delete_user();