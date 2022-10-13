-- 
-- Setup auth trigger manually (not saved by migrations).
-- 

drop trigger if exists on_new_user on auth.users;

create trigger on_new_user after insert on auth.users for each row execute procedure public.handle_new_user();


-- 
-- Update-tracking.
-- 


-- 
-- Misc triggers.
-- 

CREATE TRIGGER on_new_project AFTER INSERT ON public.projects FOR EACH ROW EXECUTE FUNCTION public.handle_new_project();

CREATE TRIGGER on_project_like AFTER INSERT ON public.users_projects_likes FOR EACH ROW EXECUTE FUNCTION public.handle_project_like();

CREATE TRIGGER on_project_unlike AFTER DELETE ON public.users_projects_likes FOR EACH ROW EXECUTE FUNCTION public.handle_project_unlike();

CREATE TRIGGER on_user_role_delete AFTER DELETE ON public.users_roles FOR EACH ROW EXECUTE FUNCTION public.check_enforce_nplex_user();

CREATE TRIGGER on_user_role_update AFTER UPDATE ON public.users_roles FOR EACH ROW EXECUTE FUNCTION public.check_enforce_nplex_user();