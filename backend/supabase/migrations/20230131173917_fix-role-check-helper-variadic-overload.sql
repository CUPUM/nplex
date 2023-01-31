alter table "public"."project_type_work" drop constraint "project_type_work_created_by_id_fkey";

alter table "public"."project_type_work" drop constraint "project_type_work_type_id_fkey";

alter table "public"."project_type_work" drop constraint "project_type_work_updated_by_id_fkey";

alter table "public"."project_type_work" drop constraint "project_type_work_work_id_fkey";

alter table "public"."project_type_work" add constraint "project_type_work_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."project_type_work" validate constraint "project_type_work_created_by_id_fkey";

alter table "public"."project_type_work" add constraint "project_type_work_type_id_fkey" FOREIGN KEY (type_id) REFERENCES project_type(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."project_type_work" validate constraint "project_type_work_type_id_fkey";

alter table "public"."project_type_work" add constraint "project_type_work_updated_by_id_fkey" FOREIGN KEY (updated_by_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."project_type_work" validate constraint "project_type_work_updated_by_id_fkey";

alter table "public"."project_type_work" add constraint "project_type_work_work_id_fkey" FOREIGN KEY (work_id) REFERENCES project_work(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."project_type_work" validate constraint "project_type_work_work_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.user_has_role(VARIADIC roles user_role[])
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin

    if auth.uid() = null then return false;

    else return exists (
        select 1
        from public.users_roles as pur
        where pur.user_id = auth.uid()
            and pur.role = any (roles)
    );

    end if;

end;
$function$
;

create policy "Editors and admins can do anything"
on "public"."project_type_work"
as permissive
for all
to public
using (user_has_role(VARIADIC ARRAY['editor'::user_role, 'admin'::user_role]))
with check (user_has_role(VARIADIC ARRAY['editor'::user_role, 'admin'::user_role]));


create policy "Editors and admin can manage global project works"
on "public"."project_work"
as permissive
for all
to public
using (user_has_role(VARIADIC ARRAY['editor'::user_role, 'admin'::user_role]))
with check (user_has_role(VARIADIC ARRAY['editor'::user_role, 'admin'::user_role]));



