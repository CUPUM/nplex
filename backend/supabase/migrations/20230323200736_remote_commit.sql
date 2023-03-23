CREATE INDEX projects_ts ON public.projects USING gin (to_tsvector('french'::regconfig, projects_ts(projects.*)));


