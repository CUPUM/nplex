CREATE TRIGGER restrict_project_publishing BEFORE UPDATE ON public.projects_publication_status FOR EACH ROW EXECUTE FUNCTION restrict_publishing();


