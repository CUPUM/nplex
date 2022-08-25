select json_build_object(
  'categories', (
    select json_agg(row_to_json(t))
    from public.project_category t
  ),
  'types', (
    select json_agg(row_to_json(t))
    from public.project_type t
  ),
  'site_usages_categories', (
    select json_agg(row_to_json(suc))
    from public.project_site_usage_category suc
  ),
  'site_usages', (
    select json_agg(row_to_json(su))
    FROM public.project_site_usage su
  ),
  'site_ownerships', (
    select json_agg(row_to_json(so))
    from public.project_site_ownership so
  )
)