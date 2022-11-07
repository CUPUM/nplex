set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.user_can_edit_project(p_row projects)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
	begin

		if public.user_has_role('admin') then return true;
		elseif p_row.created_by_id = auth.uid() then return true;
		else return exists (select 1 from public.projects_users as pu where pu.project_id = p_row.id and pu.user_id = auth.uid());
		end if;
		
	end;
$function$
;


