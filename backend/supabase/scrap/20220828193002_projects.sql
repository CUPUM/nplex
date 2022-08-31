-- 
-- PROJECTS
-- 


CREATE TABLE IF NOT EXISTS public.projects (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    created_by_id uuid NOT NULL DEFAULT default_uid(),
    updated_by_id uuid NOT NULL DEFAULT default_uid(),
    title text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    site_ownership_id smallint,
    site_usage_category_id smallint,
    site_usage_id smallint,
    site_area numeric,
    category_id smallint NOT NULL,
    area numeric,
    adjacent_streets smallint,
    location_geometry postgis.geometry NOT NULL,
    building_area numeric,
    implantation_mode_id smallint,
    building_construction_year smallint,
    cost_min integer NOT NULL,
    cost_max integer NOT NULL,
    type_id smallint NOT NULL,
    combustible boolean NOT NULL,
    banner_url text COLLATE pg_catalog."default",
    CONSTRAINT projects_pkey PRIMARY KEY (id),
    CONSTRAINT projects_title_key UNIQUE (title),
    CONSTRAINT projects_category_id_fkey FOREIGN KEY (category_id)
        REFERENCES public.project_category (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT projects_created_by_id_fkey FOREIGN KEY (created_by_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT projects_implantation_mode_id_fkey FOREIGN KEY (implantation_mode_id)
        REFERENCES public.project_implantation_mode (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT projects_site_ownership_id_fkey FOREIGN KEY (site_ownership_id)
        REFERENCES public.project_site_ownership (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT projects_site_usage_category_id_fkey FOREIGN KEY (site_usage_category_id)
        REFERENCES public.project_site_usage_category (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT projects_site_usage_id_fkey FOREIGN KEY (site_usage_id)
        REFERENCES public.project_site_usage (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT projects_type_id_fkey FOREIGN KEY (type_id)
        REFERENCES public.project_type (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT projects_updated_by_id_fkey FOREIGN KEY (updated_by_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.projects
    OWNER to postgres;
ALTER TABLE IF EXISTS public.projects
    ENABLE ROW LEVEL SECURITY;
GRANT ALL ON TABLE public.projects TO service_role;
GRANT ALL ON TABLE public.projects TO authenticated;
GRANT ALL ON TABLE public.projects TO anon;
GRANT ALL ON TABLE public.projects TO postgres;
CREATE POLICY "Only admins and project creators can delete a project."
    ON public.projects
    AS PERMISSIVE
    FOR DELETE
    TO public
    USING (((auth.uid() = created_by_id) OR user_has_role(VARIADIC ARRAY['admin'::user_role])));
CREATE POLICY "Only admins, projects creators and adequately granted users can"
    ON public.projects
    AS PERMISSIVE
    FOR UPDATE
    TO public
    USING ((user_has_role(VARIADIC ARRAY['admin'::user_role]) OR (auth.uid() = created_by_id) OR (EXISTS ( SELECT 1
   FROM projects_users
  WHERE ((projects_users.project_id = projects.id) AND (projects_users.user_id = auth.uid()) AND (projects_users.granted_role = ANY (ARRAY['admin'::user_role, 'editor'::user_role])))))))
    WITH CHECK ((user_has_role(VARIADIC ARRAY['admin'::user_role]) OR (auth.uid() = created_by_id) OR (EXISTS ( SELECT 1
   FROM projects_users
  WHERE ((projects_users.project_id = projects.id) AND (projects_users.user_id = auth.uid()) AND (projects_users.granted_role = ANY (ARRAY['admin'::user_role, 'editor'::user_role])))))));
CREATE POLICY "Only authed users can insert projects."
    ON public.projects
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (true);
CREATE POLICY "Select published projects, owned projects, or granted projects."
    ON public.projects
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (((EXISTS ( SELECT 1
   FROM projects_publication_status
  WHERE (projects_publication_status.project_id = projects.id))) OR (auth.uid() = created_by_id) OR (EXISTS ( SELECT 1
   FROM projects_users
  WHERE ((projects_users.project_id = projects.id) AND (projects_users.user_id = auth.uid()))))));
CREATE TRIGGER on_new_project
    AFTER INSERT
    ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_project();
CREATE TRIGGER on_project_update
    BEFORE UPDATE 
    ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION public.track_update();


CREATE TABLE IF NOT EXISTS public.projects_publication_status (
    project_id uuid NOT NULL,
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_by_id uuid NOT NULL DEFAULT default_uid(),
    status publication_status NOT NULL DEFAULT 'unpublished'::publication_status,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    created_by_id uuid NOT NULL DEFAULT default_uid(),
    CONSTRAINT projects_publication_status_pkey PRIMARY KEY (project_id),
    CONSTRAINT projects_publication_status_project_id_key UNIQUE (project_id),
    CONSTRAINT projects_publication_status_created_by_id_fkey FOREIGN KEY (created_by_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT projects_publication_status_project_id_fkey FOREIGN KEY (project_id)
        REFERENCES public.projects (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT projects_publication_status_updated_by_id_fkey FOREIGN KEY (updated_by_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.projects_publication_status
    OWNER to postgres;
ALTER TABLE IF EXISTS public.projects_publication_status
    ENABLE ROW LEVEL SECURITY;
GRANT ALL ON TABLE public.projects_publication_status TO authenticated;
GRANT ALL ON TABLE public.projects_publication_status TO anon;
GRANT ALL ON TABLE public.projects_publication_status TO service_role;
GRANT ALL ON TABLE public.projects_publication_status TO postgres;
CREATE POLICY "Anyone can select publication status."
    ON public.projects_publication_status
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (true);
CREATE POLICY "Only admins, creating editors or granted editors can update pub"
    ON public.projects_publication_status
    AS PERMISSIVE
    FOR UPDATE
    TO public
    USING ((user_has_role(VARIADIC ARRAY['admin'::user_role]) OR (user_has_role(VARIADIC ARRAY['editor'::user_role]) AND ((EXISTS ( SELECT 1
   FROM projects
  WHERE ((projects.id = projects_publication_status.project_id) AND (projects.created_by_id = auth.uid())))) OR (EXISTS ( SELECT 1
   FROM projects_users
  WHERE ((projects_users.project_id = projects_users.project_id) AND (projects_users.user_id = auth.uid()) AND (projects_users.granted_role = ANY (ARRAY['admin'::user_role, 'editor'::user_role])))))))));


CREATE TABLE IF NOT EXISTS public.users_projects_likes (
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    user_id uuid NOT NULL DEFAULT auth.uid(),
    project_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT users_projects_likes_pkey PRIMARY KEY (id, project_id, user_id),
    CONSTRAINT users_projects_likes_project_id_user_id_key UNIQUE (project_id, user_id),
    CONSTRAINT users_projects_likes_user_id_project_id_key UNIQUE (user_id, project_id),
    CONSTRAINT users_projects_likes_project_id_fkey FOREIGN KEY (project_id)
        REFERENCES public.projects (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT users_projects_likes_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.users_projects_likes
    OWNER to postgres;
ALTER TABLE IF EXISTS public.users_projects_likes
    ENABLE ROW LEVEL SECURITY;
GRANT ALL ON TABLE public.users_projects_likes TO authenticated;
GRANT ALL ON TABLE public.users_projects_likes TO anon;
GRANT ALL ON TABLE public.users_projects_likes TO service_role;
GRANT ALL ON TABLE public.users_projects_likes TO postgres;
CREATE POLICY "Anyone can see projects likes for projects they can select"
    ON public.users_projects_likes
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING ((EXISTS ( SELECT 1
   FROM projects
  WHERE (projects.id = users_projects_likes.project_id))));
CREATE POLICY "Authenticated users can only manage their own likes"
    ON public.users_projects_likes
    AS PERMISSIVE
    FOR ALL
    TO public
    USING (((auth.uid() = user_id) AND (EXISTS ( SELECT 1
   FROM projects
  WHERE (projects.id = users_projects_likes.project_id)))))
    WITH CHECK (((auth.uid() = user_id) AND (EXISTS ( SELECT 1
   FROM projects
  WHERE (projects.id = users_projects_likes.project_id)))));


CREATE TABLE IF NOT EXISTS public.projects_likes_sums (
    project_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    sum integer NOT NULL DEFAULT 0,
    CONSTRAINT projects_likes_sums_pkey PRIMARY KEY (project_id)
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.projects_likes_sums
    OWNER to postgres;
ALTER TABLE IF EXISTS public.projects_likes_sums
    ENABLE ROW LEVEL SECURITY;
GRANT ALL ON TABLE public.projects_likes_sums TO anon;
GRANT ALL ON TABLE public.projects_likes_sums TO authenticated;
GRANT ALL ON TABLE public.projects_likes_sums TO postgres;
GRANT ALL ON TABLE public.projects_likes_sums TO service_role;
CREATE POLICY "Enable read access for all users"
    ON public.projects_likes_sums
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (true);


CREATE TABLE IF NOT EXISTS public.projects_users (
    project_id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    granted_role user_role NOT NULL DEFAULT 'editor'::user_role,
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    created_by_id uuid NOT NULL DEFAULT default_uid(),
    updated_by_id uuid NOT NULL DEFAULT default_uid(),
    CONSTRAINT projects_users_pkey PRIMARY KEY (project_id, user_id),
    CONSTRAINT projects_editors_project_id_editor_id_key UNIQUE (project_id, user_id),
    CONSTRAINT projects_users_user_id_project_id_key UNIQUE (user_id, project_id),
    CONSTRAINT projects_users_created_by_id_fkey FOREIGN KEY (created_by_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT projects_users_project_id_fkey FOREIGN KEY (project_id)
        REFERENCES public.projects (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT projects_users_updated_by_id_fkey FOREIGN KEY (updated_by_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT projects_users_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.projects_users
    OWNER to postgres;
ALTER TABLE IF EXISTS public.projects_users
    ENABLE ROW LEVEL SECURITY;
GRANT ALL ON TABLE public.projects_users TO authenticated;
GRANT ALL ON TABLE public.projects_users TO anon;
GRANT ALL ON TABLE public.projects_users TO service_role;
GRANT ALL ON TABLE public.projects_users TO postgres;
CREATE POLICY "Anyone can select project users."
    ON public.projects_users
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (true);
CREATE POLICY "Only project creators, admins can insert, update, and delete pr"
    ON public.projects_users
    AS PERMISSIVE
    FOR ALL
    TO public
    USING ((user_has_role(VARIADIC ARRAY['admin'::user_role]) OR (EXISTS ( SELECT 1
   FROM projects
  WHERE ((projects.id = projects_users.project_id) AND (projects.created_by_id = auth.uid()))))));
CREATE TRIGGER on_project_user_update
    BEFORE UPDATE 
    ON public.projects_users
    FOR EACH ROW
    EXECUTE FUNCTION public.track_update();


CREATE TABLE IF NOT EXISTS public.users_projects_collections (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    created_by_id uuid NOT NULL DEFAULT auth.uid(),
    is_published boolean NOT NULL DEFAULT true,
    title text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    updated_by_id uuid NOT NULL DEFAULT auth.uid(),
    CONSTRAINT users_projects_collections_pkey PRIMARY KEY (id),
    CONSTRAINT users_projects_collections_created_by_id_fkey FOREIGN KEY (created_by_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT users_projects_collections_updated_by_id_fkey FOREIGN KEY (updated_by_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.users_projects_collections
    OWNER to postgres;
ALTER TABLE IF EXISTS public.users_projects_collections
    ENABLE ROW LEVEL SECURITY;
GRANT ALL ON TABLE public.users_projects_collections TO anon;
GRANT ALL ON TABLE public.users_projects_collections TO authenticated;
GRANT ALL ON TABLE public.users_projects_collections TO postgres;
GRANT ALL ON TABLE public.users_projects_collections TO service_role;
CREATE POLICY "Anyone can select published collections or collections they own"
    ON public.users_projects_collections
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING ((is_published OR (auth.uid() = created_by_id)));
CREATE POLICY "Authed users can only manage collections under their uid"
    ON public.users_projects_collections
    AS PERMISSIVE
    FOR ALL
    TO authenticated
    USING ((auth.uid() = created_by_id))
    WITH CHECK ((auth.uid() = created_by_id));
CREATE TRIGGER on_user_project_collection_update
    BEFORE UPDATE 
    ON public.users_projects_collections
    FOR EACH ROW
    EXECUTE FUNCTION public.track_update();


CREATE TABLE IF NOT EXISTS public.users_projects_collections_items (
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    created_by_id uuid NOT NULL DEFAULT auth.uid(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    collection_id uuid NOT NULL,
    project_id uuid NOT NULL,
    description text COLLATE pg_catalog."default",
    updated_by_id uuid NOT NULL DEFAULT auth.uid(),
    CONSTRAINT users_projects_collections_items_pkey PRIMARY KEY (id),
    CONSTRAINT users_projects_collections_items_collection_id_project_id_key UNIQUE (collection_id, project_id),
    CONSTRAINT users_projects_collections_items_collection_id_fkey FOREIGN KEY (collection_id)
        REFERENCES public.users_projects_collections (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT users_projects_collections_items_created_by_id_fkey FOREIGN KEY (created_by_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT users_projects_collections_items_project_id_fkey FOREIGN KEY (project_id)
        REFERENCES public.projects (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT users_projects_collections_items_updated_by_id_fkey FOREIGN KEY (updated_by_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.users_projects_collections_items
    OWNER to postgres;
ALTER TABLE IF EXISTS public.users_projects_collections_items
    ENABLE ROW LEVEL SECURITY;
GRANT ALL ON TABLE public.users_projects_collections_items TO authenticated;
GRANT ALL ON TABLE public.users_projects_collections_items TO anon;
GRANT ALL ON TABLE public.users_projects_collections_items TO service_role;
GRANT ALL ON TABLE public.users_projects_collections_items TO postgres;
CREATE POLICY "Anyone can select items for collections and projects they can s"
    ON public.users_projects_collections_items
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (((EXISTS ( SELECT 1
   FROM users_projects_collections
  WHERE (users_projects_collections.id = users_projects_collections_items.collection_id))) AND (EXISTS ( SELECT 1
   FROM projects
  WHERE (projects.id = users_projects_collections_items.project_id)))));
CREATE POLICY "Authed users can only manage items of existing collections they"
    ON public.users_projects_collections_items
    AS PERMISSIVE
    FOR ALL
    TO public
    USING (((auth.uid() = created_by_id) AND (EXISTS ( SELECT 1
   FROM users_projects_collections
  WHERE ((users_projects_collections.id = users_projects_collections_items.collection_id) AND (users_projects_collections.created_by_id = auth.uid()))))))
    WITH CHECK (((auth.uid() = created_by_id) AND (EXISTS ( SELECT 1
   FROM users_projects_collections
  WHERE ((users_projects_collections.id = users_projects_collections_items.collection_id) AND (users_projects_collections.created_by_id = auth.uid()))))));
CREATE TRIGGER on_user_project_collection_item_update
    BEFORE UPDATE 
    ON public.users_projects_collections_items
    FOR EACH ROW
    EXECUTE FUNCTION public.track_update();


CREATE TABLE IF NOT EXISTS public.projects_exemplarity_indicators (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    created_by_id uuid NOT NULL DEFAULT default_uid(),
    updated_by_id uuid NOT NULL DEFAULT default_uid(),
    project_id uuid NOT NULL,
    exemplarity_indicator_id smallint NOT NULL,
    description text COLLATE pg_catalog."default",
    CONSTRAINT projects_exemplarity_indicators_pkey PRIMARY KEY (id),
    CONSTRAINT projects_exemplarity_indicato_exemplarity_indicator_id_proj_key UNIQUE (exemplarity_indicator_id, project_id),
    CONSTRAINT projects_exemplarity_indicators_created_by_id_fkey FOREIGN KEY (created_by_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT projects_exemplarity_indicators_exemplarity_indicator_id_fkey FOREIGN KEY (exemplarity_indicator_id)
        REFERENCES public.project_exemplarity_indicator (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT projects_exemplarity_indicators_project_id_fkey FOREIGN KEY (project_id)
        REFERENCES public.projects (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT projects_exemplarity_indicators_updated_by_id_fkey FOREIGN KEY (updated_by_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.projects_exemplarity_indicators
    OWNER to postgres;
ALTER TABLE IF EXISTS public.projects_exemplarity_indicators
    ENABLE ROW LEVEL SECURITY;
GRANT ALL ON TABLE public.projects_exemplarity_indicators TO authenticated;
GRANT ALL ON TABLE public.projects_exemplarity_indicators TO anon;
GRANT ALL ON TABLE public.projects_exemplarity_indicators TO service_role;
GRANT ALL ON TABLE public.projects_exemplarity_indicators TO postgres;
CREATE POLICY "Can only be read by those who can read the host project"
    ON public.projects_exemplarity_indicators
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING ((EXISTS ( SELECT 1
   FROM projects
  WHERE (projects.id = projects_exemplarity_indicators.project_id))));


CREATE TABLE IF NOT EXISTS public.projects_programs (
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    created_by_id uuid NOT NULL DEFAULT default_uid(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_by_id uuid NOT NULL DEFAULT default_uid(),
    project_id uuid NOT NULL,
    title text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    CONSTRAINT projects_programs_pkey PRIMARY KEY (id),
    CONSTRAINT projects_programs_created_by_id_fkey FOREIGN KEY (created_by_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT projects_programs_project_id_fkey FOREIGN KEY (project_id)
        REFERENCES public.projects (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT projects_programs_updated_by_id_fkey FOREIGN KEY (updated_by_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.projects_programs
    OWNER to postgres;
ALTER TABLE IF EXISTS public.projects_programs
    ENABLE ROW LEVEL SECURITY;
GRANT ALL ON TABLE public.projects_programs TO authenticated;
GRANT ALL ON TABLE public.projects_programs TO anon;
GRANT ALL ON TABLE public.projects_programs TO service_role;
GRANT ALL ON TABLE public.projects_programs TO postgres;
CREATE POLICY "Can only be read by those who can read the host project"
    ON public.projects_programs
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING ((EXISTS ( SELECT 1
   FROM projects
  WHERE (projects.id = projects_programs.project_id))));


CREATE TABLE IF NOT EXISTS public.projects_materials (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    created_by_id uuid NOT NULL DEFAULT default_uid(),
    updated_by_id uuid NOT NULL DEFAULT default_uid(),
    project_id uuid NOT NULL,
    material_type_id integer NOT NULL,
    origin_id smallint,
    sustainability numeric(1,1),
    description text COLLATE pg_catalog."default",
    CONSTRAINT projects_materials_pkey PRIMARY KEY (id),
    CONSTRAINT projects_materials_created_by_id_fkey FOREIGN KEY (created_by_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT projects_materials_material_type_id_fkey FOREIGN KEY (material_type_id)
        REFERENCES public.project_material_type (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT projects_materials_origin_id_fkey FOREIGN KEY (origin_id)
        REFERENCES public.project_material_origin (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT projects_materials_project_id_fkey FOREIGN KEY (project_id)
        REFERENCES public.projects (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT projects_materials_updated_by_id_fkey FOREIGN KEY (updated_by_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.projects_materials
    OWNER to postgres;
ALTER TABLE IF EXISTS public.projects_materials
    ENABLE ROW LEVEL SECURITY;
GRANT ALL ON TABLE public.projects_materials TO authenticated;
GRANT ALL ON TABLE public.projects_materials TO anon;
GRANT ALL ON TABLE public.projects_materials TO service_role;
GRANT ALL ON TABLE public.projects_materials TO postgres;
CREATE POLICY "Can only be read by those who can read the host project"
    ON public.projects_materials
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING ((EXISTS ( SELECT 1
   FROM projects
  WHERE (projects.id = projects_materials.project_id))));


CREATE TABLE IF NOT EXISTS public.projects_materials_uses (
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    created_by_id uuid NOT NULL DEFAULT default_uid(),
    updated_by_id uuid NOT NULL DEFAULT default_uid(),
    project_id uuid NOT NULL,
    project_material_id uuid NOT NULL,
    material_use_id integer NOT NULL,
    description text COLLATE pg_catalog."default",
    CONSTRAINT projects_materials_uses_pkey PRIMARY KEY (id),
    CONSTRAINT projects_materials_uses_created_by_id_fkey FOREIGN KEY (created_by_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT projects_materials_uses_material_use_id_fkey FOREIGN KEY (material_use_id)
        REFERENCES public.project_material_use (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT projects_materials_uses_project_id_fkey FOREIGN KEY (project_id)
        REFERENCES public.projects (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT projects_materials_uses_project_material_id_fkey FOREIGN KEY (project_material_id)
        REFERENCES public.projects_materials (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT projects_materials_uses_updated_by_id_fkey FOREIGN KEY (updated_by_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.projects_materials_uses
    OWNER to postgres;
ALTER TABLE IF EXISTS public.projects_materials_uses
    ENABLE ROW LEVEL SECURITY;
GRANT ALL ON TABLE public.projects_materials_uses TO authenticated;
GRANT ALL ON TABLE public.projects_materials_uses TO anon;
GRANT ALL ON TABLE public.projects_materials_uses TO service_role;
GRANT ALL ON TABLE public.projects_materials_uses TO postgres;
CREATE POLICY "Can only be read by those who can read the host project"
    ON public.projects_materials_uses
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING ((EXISTS ( SELECT 1
   FROM projects
  WHERE (projects.id = projects_materials_uses.project_id))));


CREATE TABLE IF NOT EXISTS public.projects_events (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    created_by_id uuid NOT NULL DEFAULT default_uid(),
    updated_by_id uuid NOT NULL DEFAULT default_uid(),
    project_id uuid NOT NULL,
    type_id smallint NOT NULL,
    parent_id uuid,
    title text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    start_date timestamp with time zone NOT NULL,
    end_date timestamp with time zone,
    CONSTRAINT projects_events_pkey PRIMARY KEY (id),
    CONSTRAINT projects_events_created_by_id_fkey FOREIGN KEY (created_by_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT projects_events_parent_id_fkey FOREIGN KEY (parent_id)
        REFERENCES public.projects_events (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT projects_events_project_id_fkey FOREIGN KEY (project_id)
        REFERENCES public.projects (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT projects_events_type_id_fkey FOREIGN KEY (type_id)
        REFERENCES public.project_event_type (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT projects_events_updated_by_id_fkey FOREIGN KEY (updated_by_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.projects_events
    OWNER to postgres;
ALTER TABLE IF EXISTS public.projects_events
    ENABLE ROW LEVEL SECURITY;
GRANT ALL ON TABLE public.projects_events TO authenticated;
GRANT ALL ON TABLE public.projects_events TO anon;
GRANT ALL ON TABLE public.projects_events TO service_role;
GRANT ALL ON TABLE public.projects_events TO postgres;
CREATE POLICY "Can only be read by thos who can read the host project"
    ON public.projects_events
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING ((EXISTS ( SELECT 1
   FROM projects
  WHERE (projects.id = projects_events.project_id))));


CREATE TABLE IF NOT EXISTS public.projects_events_ressources (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    event_id uuid NOT NULL,
    project_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    created_by_id uuid NOT NULL DEFAULT default_uid(),
    updated_by_id uuid NOT NULL DEFAULT default_uid(),
    title text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    CONSTRAINT projects_events_ressources_pkey PRIMARY KEY (id),
    CONSTRAINT projects_events_ressources_created_by_id_fkey FOREIGN KEY (created_by_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT projects_events_ressources_event_id_fkey FOREIGN KEY (event_id)
        REFERENCES public.projects_events (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT projects_events_ressources_project_id_fkey FOREIGN KEY (project_id)
        REFERENCES public.projects (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT projects_events_ressources_updated_by_id_fkey FOREIGN KEY (updated_by_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.projects_events_ressources
    OWNER to postgres;
ALTER TABLE IF EXISTS public.projects_events_ressources
    ENABLE ROW LEVEL SECURITY;
GRANT ALL ON TABLE public.projects_events_ressources TO authenticated;
GRANT ALL ON TABLE public.projects_events_ressources TO anon;
GRANT ALL ON TABLE public.projects_events_ressources TO service_role;
GRANT ALL ON TABLE public.projects_events_ressources TO postgres;
CREATE POLICY "Can only be read by thos who can read the host project"
    ON public.projects_events_ressources
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING ((EXISTS ( SELECT 1
   FROM projects
  WHERE (projects.id = projects_events_ressources.id))));