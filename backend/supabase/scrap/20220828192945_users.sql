-- 
-- USERS
-- 

CREATE TABLE IF NOT EXISTS public.users_profiles (
    user_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    avatar_url text COLLATE pg_catalog."default",
    firstname text COLLATE pg_catalog."default" NOT NULL DEFAULT 'Anonyme'::text,
    middlename text COLLATE pg_catalog."default",
    lastname text COLLATE pg_catalog."default",
    about text COLLATE pg_catalog."default",
    public_email text COLLATE pg_catalog."default",
    updated_by_id uuid NOT NULL DEFAULT default_uid(),
    CONSTRAINT users_profiles_pkey PRIMARY KEY (user_id),
    CONSTRAINT users_profiles_user_id_key UNIQUE (user_id),
    CONSTRAINT users_profiles_updated_by_id_fkey FOREIGN KEY (updated_by_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE SET DEFAULT,
    CONSTRAINT users_profiles_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.users_profiles
    OWNER to postgres;
ALTER TABLE IF EXISTS public.users_profiles
    ENABLE ROW LEVEL SECURITY;
GRANT ALL ON TABLE public.users_profiles TO authenticated;
GRANT ALL ON TABLE public.users_profiles TO anon;
GRANT ALL ON TABLE public.users_profiles TO service_role;
GRANT ALL ON TABLE public.users_profiles TO postgres;
CREATE POLICY "Anyone can select user profiles."
    ON public.users_profiles
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (true);
CREATE POLICY "Users can only update their own profile."
    ON public.users_profiles
    AS PERMISSIVE
    FOR UPDATE
    TO public
    USING ((auth.uid() = user_id))
    WITH CHECK ((auth.uid() = user_id));
CREATE TRIGGER on_user_update
    BEFORE UPDATE 
    ON public.users_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.track_update();


CREATE TABLE IF NOT EXISTS public.users_roles (
    user_id uuid NOT NULL,
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    role user_role NOT NULL DEFAULT 'visitor'::user_role,
    updated_by_id uuid NOT NULL DEFAULT default_uid(),
    CONSTRAINT users_roles_pkey PRIMARY KEY (user_id),
    CONSTRAINT users_roles_user_id_key UNIQUE (user_id),
    CONSTRAINT users_roles_updated_by_id_fkey FOREIGN KEY (updated_by_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE SET DEFAULT,
    CONSTRAINT users_roles_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users_profiles (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.users_roles
    OWNER to postgres;
ALTER TABLE IF EXISTS public.users_roles
    ENABLE ROW LEVEL SECURITY;
GRANT ALL ON TABLE public.users_roles TO authenticated;
GRANT ALL ON TABLE public.users_roles TO anon;
GRANT ALL ON TABLE public.users_roles TO service_role;
GRANT ALL ON TABLE public.users_roles TO postgres;
CREATE POLICY "Anyone can select users roles."
    ON public.users_roles
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (true);
CREATE POLICY "Only admins can update users roles."
    ON public.users_roles
    AS PERMISSIVE
    FOR UPDATE
    TO public
    USING (user_has_role(VARIADIC ARRAY['admin'::user_role]))
    WITH CHECK (user_has_role(VARIADIC ARRAY['admin'::user_role]));
CREATE TRIGGER on_user_role_delete
    AFTER DELETE
    ON public.users_roles
    FOR EACH ROW
    EXECUTE FUNCTION public.check_enforce_nplex_user();
CREATE TRIGGER on_user_role_update
    AFTER UPDATE 
    ON public.users_roles
    FOR EACH ROW
    EXECUTE FUNCTION public.check_enforce_nplex_user();


