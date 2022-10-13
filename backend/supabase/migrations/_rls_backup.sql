
-- alter table "public"."project_category" enable row level security;

-- alter table "public"."project_event_type_subevent_type" enable row level security;

-- alter table "public"."project_event_type" enable row level security;

-- alter table "public"."project_exemplarity_indicator" enable row level security;

-- alter table "public"."project_exemplarity_indicator_category" enable row level security;

-- alter table "public"."project_implantation_mode" enable row level security;

-- alter table "public"."project_material_origin" enable row level security;

-- alter table "public"."project_material_type" enable row level security;

-- alter table "public"."project_material_use" enable row level security;

-- alter table "public"."project_site_ownership" enable row level security;

-- alter table "public"."project_site_usage" enable row level security;

-- alter table "public"."project_site_usage_category" enable row level security;

-- alter table "public"."project_site_usage_site_usage_category" enable row level security;

-- alter table "public"."project_type" enable row level security;

-- alter table "public"."project_type_category" enable row level security;

-- alter table "public"."projects" enable row level security;

-- alter table "public"."projects_events" enable row level security;

-- alter table "public"."projects_events_ressources" enable row level security;

-- alter table "public"."projects_exemplarity_indicators" enable row level security;

-- alter table "public"."projects_likes_sums" enable row level security;

-- alter table "public"."projects_materials" enable row level security;

-- alter table "public"."projects_materials_uses" enable row level security;

-- alter table "public"."projects_programs" enable row level security;

-- alter table "public"."projects_publication_status" enable row level security;

-- alter table "public"."projects_users" enable row level security;

-- alter table "public"."users_profiles" enable row level security;

-- alter table "public"."users_projects_collections" enable row level security;

-- alter table "public"."users_projects_collections_items" enable row level security;

-- alter table "public"."users_projects_likes" enable row level security;

-- alter table "public"."users_roles" enable row level security;


-- create policy "Anyone can select project type"
-- on "public"."project_category"
-- as permissive
-- for select
-- to public
-- using (true);


-- create policy "Enable read access for all users"
-- on "public"."project_event_type_subevent_type"
-- as permissive
-- for select
-- to public
-- using (true);


-- create policy "Enable read access for all users"
-- on "public"."project_event_type"
-- as permissive
-- for select
-- to public
-- using (true);


-- create policy "Enable read access for all users"
-- on "public"."project_exemplarity_indicator"
-- as permissive
-- for select
-- to public
-- using (true);


-- create policy "Enable read access for all users"
-- on "public"."project_exemplarity_indicator_category"
-- as permissive
-- for select
-- to public
-- using (true);


-- create policy "Enable read access for all users"
-- on "public"."project_implantation_mode"
-- as permissive
-- for select
-- to public
-- using (true);


-- create policy "Enable read access for all users"
-- on "public"."project_material_origin"
-- as permissive
-- for select
-- to public
-- using (true);


-- create policy "Enable read access for all users"
-- on "public"."project_material_type"
-- as permissive
-- for select
-- to public
-- using (true);


-- create policy "Enable read access for all users"
-- on "public"."project_material_use"
-- as permissive
-- for select
-- to public
-- using (true);


-- create policy "Anyone can select project site ownership"
-- on "public"."project_site_ownership"
-- as permissive
-- for select
-- to public
-- using (true);


-- create policy "Anyone can select project site usage"
-- on "public"."project_site_usage"
-- as permissive
-- for select
-- to public
-- using (true);


-- create policy "Anyone can select project site usage category"
-- on "public"."project_site_usage_category"
-- as permissive
-- for select
-- to public
-- using (true);


-- create policy "Anyone can select links between usages and categories"
-- on "public"."project_site_usage_site_usage_category"
-- as permissive
-- for select
-- to public
-- using (true);


-- create policy "Enable read access for all users"
-- on "public"."project_type"
-- as permissive
-- for select
-- to public
-- using (true);


-- create policy "Enable read access for all users"
-- on "public"."project_type_category"
-- as permissive
-- for select
-- to public
-- using (true);


-- create policy "Only admins and project creators can delete a project."
-- on "public"."projects"
-- as permissive
-- for delete
-- to public
-- using (((auth.uid() = created_by_id) OR user_has_role(VARIADIC ARRAY['admin'::user_role])));


-- create policy "Only admins, projects creators and adequately granted users can"
-- on "public"."projects"
-- as permissive
-- for update
-- to public
-- using ((user_has_role(VARIADIC ARRAY['admin'::user_role]) OR (auth.uid() = created_by_id) OR (EXISTS ( SELECT 1
--    FROM projects_users
--   WHERE ((projects_users.project_id = projects.id) AND (projects_users.user_id = auth.uid()) AND (projects_users.granted_role = ANY (ARRAY['admin'::user_role, 'editor'::user_role])))))))
-- with check ((user_has_role(VARIADIC ARRAY['admin'::user_role]) OR (auth.uid() = created_by_id) OR (EXISTS ( SELECT 1
--    FROM projects_users
--   WHERE ((projects_users.project_id = projects.id) AND (projects_users.user_id = auth.uid()) AND (projects_users.granted_role = ANY (ARRAY['admin'::user_role, 'editor'::user_role])))))));


-- create policy "Only authed users can insert projects."
-- on "public"."projects"
-- as permissive
-- for insert
-- to authenticated
-- with check (true);


-- create policy "Select published projects, owned projects, or granted projects."
-- on "public"."projects"
-- as permissive
-- for select
-- to public
-- using (((EXISTS ( SELECT 1
--    FROM projects_publication_status
--   WHERE (projects_publication_status.project_id = projects.id))) OR (auth.uid() = created_by_id) OR (EXISTS ( SELECT 1
--    FROM projects_users
--   WHERE ((projects_users.project_id = projects.id) AND (projects_users.user_id = auth.uid()))))));


-- create policy "Can only be read by thos who can read the host project"
-- on "public"."projects_events"
-- as permissive
-- for select
-- to public
-- using ((EXISTS ( SELECT 1
--    FROM projects
--   WHERE (projects.id = projects_events.project_id))));


-- create policy "Can only be read by thos who can read the host project"
-- on "public"."projects_events_ressources"
-- as permissive
-- for select
-- to public
-- using ((EXISTS ( SELECT 1
--    FROM projects
--   WHERE (projects.id = projects_events_ressources.id))));


-- create policy "Can only be read by those who can read the host project"
-- on "public"."projects_exemplarity_indicators"
-- as permissive
-- for select
-- to public
-- using ((EXISTS ( SELECT 1
--    FROM projects
--   WHERE (projects.id = projects_exemplarity_indicators.project_id))));


-- create policy "Enable read access for all users"
-- on "public"."projects_likes_sums"
-- as permissive
-- for select
-- to public
-- using (true);


-- create policy "Can only be read by those who can read the host project"
-- on "public"."projects_materials"
-- as permissive
-- for select
-- to public
-- using ((EXISTS ( SELECT 1
--    FROM projects
--   WHERE (projects.id = projects_materials.project_id))));


-- create policy "Can only be read by those who can read the host project"
-- on "public"."projects_materials_uses"
-- as permissive
-- for select
-- to public
-- using ((EXISTS ( SELECT 1
--    FROM projects
--   WHERE (projects.id = projects_materials_uses.project_id))));


-- create policy "Can only be read by those who can read the host project"
-- on "public"."projects_programs"
-- as permissive
-- for select
-- to public
-- using ((EXISTS ( SELECT 1
--    FROM projects
--   WHERE (projects.id = projects_programs.project_id))));


-- create policy "Anyone can select publication status."
-- on "public"."projects_publication_status"
-- as permissive
-- for select
-- to public
-- using (true);


-- create policy "Only valid users can update status and publish minimally comple"
-- on "public"."projects_publication_status"
-- as permissive
-- for update
-- to public
-- using ((user_has_role(VARIADIC ARRAY['admin'::user_role]) OR (user_has_role(VARIADIC ARRAY['editor'::user_role]) AND ((EXISTS ( SELECT 1
--    FROM projects
--   WHERE ((projects.id = projects_publication_status.project_id) AND (projects.created_by_id = auth.uid())))) OR (EXISTS ( SELECT 1
--    FROM projects_users
--   WHERE ((projects_users.project_id = projects_users.project_id) AND (projects_users.user_id = auth.uid()) AND (projects_users.granted_role = ANY (ARRAY['admin'::user_role, 'editor'::user_role])))))))));


-- create policy "Anyone can select project users."
-- on "public"."projects_users"
-- as permissive
-- for select
-- to public
-- using (true);


-- create policy "Only project creators, admins can insert, update, and delete pr"
-- on "public"."projects_users"
-- as permissive
-- for all
-- to public
-- using ((user_has_role(VARIADIC ARRAY['admin'::user_role]) OR (EXISTS ( SELECT 1
--    FROM projects
--   WHERE ((projects.id = projects_users.project_id) AND (projects.created_by_id = auth.uid()))))));


-- create policy "Anyone can select user profiles."
-- on "public"."users_profiles"
-- as permissive
-- for select
-- to public
-- using (true);


-- create policy "Users can only update their own profile."
-- on "public"."users_profiles"
-- as permissive
-- for update
-- to public
-- using ((auth.uid() = user_id))
-- with check ((auth.uid() = user_id));


-- create policy "Anyone can select published collections or collections they own"
-- on "public"."users_projects_collections"
-- as permissive
-- for select
-- to public
-- using ((is_public OR (auth.uid() = created_by_id)));


-- create policy "Authed users can only manage collections under their uid"
-- on "public"."users_projects_collections"
-- as permissive
-- for all
-- to authenticated
-- using ((auth.uid() = created_by_id))
-- with check ((auth.uid() = created_by_id));


-- create policy "Anyone can select items for collections and projects they can s"
-- on "public"."users_projects_collections_items"
-- as permissive
-- for select
-- to public
-- using (((EXISTS ( SELECT 1
--    FROM users_projects_collections
--   WHERE (users_projects_collections.id = users_projects_collections_items.collection_id))) AND (EXISTS ( SELECT 1
--    FROM projects
--   WHERE (projects.id = users_projects_collections_items.project_id)))));


-- create policy "Authed users can only manage items of existing collections they"
-- on "public"."users_projects_collections_items"
-- as permissive
-- for all
-- to public
-- using (((auth.uid() = created_by_id) AND (EXISTS ( SELECT 1
--    FROM users_projects_collections
--   WHERE ((users_projects_collections.id = users_projects_collections_items.collection_id) AND (users_projects_collections.created_by_id = auth.uid()))))))
-- with check (((auth.uid() = created_by_id) AND (EXISTS ( SELECT 1
--    FROM users_projects_collections
--   WHERE ((users_projects_collections.id = users_projects_collections_items.collection_id) AND (users_projects_collections.created_by_id = auth.uid()))))));


-- create policy "Anyone can see projects likes for projects they can select"
-- on "public"."users_projects_likes"
-- as permissive
-- for select
-- to public
-- using ((EXISTS ( SELECT 1
--    FROM projects
--   WHERE (projects.id = users_projects_likes.project_id))));


-- create policy "Authenticated users can only manage their own likes"
-- on "public"."users_projects_likes"
-- as permissive
-- for all
-- to public
-- using (((auth.uid() = user_id) AND (EXISTS ( SELECT 1
--    FROM projects
--   WHERE (projects.id = users_projects_likes.project_id)))))
-- with check (((auth.uid() = user_id) AND (EXISTS ( SELECT 1
--    FROM projects
--   WHERE (projects.id = users_projects_likes.project_id)))));


-- create policy "Anyone can select users roles."
-- on "public"."users_roles"
-- as permissive
-- for select
-- to public
-- using (true);


-- create policy "Only admins can update users roles."
-- on "public"."users_roles"
-- as permissive
-- for update
-- to public
-- using (user_has_role(VARIADIC ARRAY['admin'::user_role]))
-- with check (user_has_role(VARIADIC ARRAY['admin'::user_role]));