create policy "Only creators or collaborators can delete projects"
on "public"."projects"
as permissive
for delete
to public
using (user_can_edit_project(projects.*));


create policy "Anyone can select status"
on "public"."projects_publication_status"
as permissive
for select
to public
using (true);



