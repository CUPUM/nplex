drop policy "any project manager can manage respective project indicators" on "public"."projects_exemplarity_indicators";

drop function if exists "public"."authorize"(VARIADIC allowed_permissions text[]);

drop function if exists "public"."authorize"(requested_permission text);

create policy "Anyone can see project image credits"
on "public"."projects_images_credits"
as permissive
for select
to public
using (true);


create policy "Authorize project ressource management"
on "public"."projects_images_credits"
as permissive
for all
to public
using (authorize_project_update(( SELECT pi.project
   FROM projects_images pi
  WHERE (pi.id = projects_images_credits.image)
 LIMIT 1)))
with check (authorize_project_update(( SELECT pi.project
   FROM projects_images pi
  WHERE (pi.id = projects_images_credits.image)
 LIMIT 1)));


create policy "any project manager can manage respective project indicators"
on "public"."projects_exemplarity_indicators"
as permissive
for all
to public
using (authorize_project_update(project))
with check (authorize_project_update(project));



