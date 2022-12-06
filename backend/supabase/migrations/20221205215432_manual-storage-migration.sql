create policy "Creators and collaborators can manage storage for projects they can edit"
on "storage"."objects"
as permissive for all to public
using (public.user_can_edit_project(((storage.foldername(name))[1])::uuid))
with check (public.user_can_edit_project(((storage.foldername(name))[1])::uuid))